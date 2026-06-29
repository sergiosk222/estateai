import path from "path";
import { promises as fs } from "fs";
import {
  getJobDir,
  sanitizeFileName,
  writeJob,
  type FrameQualityAnalysis,
  type ProcessingJob,
  type SelectedFrame
} from "@/lib/jobs";

type BestFrameSelectionOptions = {
  maxFrames?: number;
  minScore?: number;
  minFrameSpacing?: number;
};

function getFrameNumber(fileName: string) {
  const matches = fileName.match(/(\d+)(?!.*\d)/);

  if (!matches) {
    return null;
  }

  return Number(matches[1]);
}

function isGoodCandidate(frame: FrameQualityAnalysis, minScore: number) {
  if (frame.label === "rejected") {
    return false;
  }

  if (frame.score < minScore) {
    return false;
  }

  return true;
}

function isFarEnoughFromSelected(
  candidate: FrameQualityAnalysis,
  selected: FrameQualityAnalysis[],
  minFrameSpacing: number
) {
  const candidateNumber = getFrameNumber(candidate.fileName);

  if (candidateNumber === null) {
    return true;
  }

  return selected.every((selectedFrame) => {
    const selectedNumber = getFrameNumber(selectedFrame.fileName);

    if (selectedNumber === null) {
      return true;
    }

    return Math.abs(candidateNumber - selectedNumber) >= minFrameSpacing;
  });
}

function sortByTimeline(frames: FrameQualityAnalysis[]) {
  return [...frames].sort((a, b) => {
    const aNumber = getFrameNumber(a.fileName) ?? 0;
    const bNumber = getFrameNumber(b.fileName) ?? 0;

    return aNumber - bNumber;
  });
}

async function copySelectedFrame(params: {
  jobId: string;
  sourceRelativePath: string;
  fileName: string;
  rank: number;
}) {
  const selectedDir = path.join(getJobDir(params.jobId), "selected");
  const sourcePath = path.join(process.cwd(), params.sourceRelativePath);
  const safeName = sanitizeFileName(params.fileName);
  const selectedFileName = `${String(params.rank).padStart(3, "0")}_${safeName}`;
  const selectedPath = path.join(selectedDir, selectedFileName);

  await fs.copyFile(sourcePath, selectedPath);

  return {
    selectedFileName,
    selectedRelativePath: `captures/${params.jobId}/selected/${selectedFileName}`
  };
}

export async function selectBestFramesForJob(
  job: ProcessingJob,
  options: BestFrameSelectionOptions = {}
): Promise<ProcessingJob> {
  const maxFrames = options.maxFrames ?? 120;
  const minScore = options.minScore ?? 55;
  const minFrameSpacing = options.minFrameSpacing ?? 2;

  job.status = "selecting_frames";
  job.notes.push(
    `Best frame selection started. Max frames: ${maxFrames}. Min score: ${minScore}.`
  );
  await writeJob(job);

  const selectedDir = path.join(getJobDir(job.jobId), "selected");

  await fs.rm(selectedDir, { recursive: true, force: true });
  await fs.mkdir(selectedDir, { recursive: true });

  const qualityResults = job.frameQuality || [];

  const candidates = qualityResults
    .filter((frame) => isGoodCandidate(frame, minScore))
    .sort((a, b) => b.score - a.score);

  const rejectedByQuality = qualityResults.length - candidates.length;

  const selectedByScore: FrameQualityAnalysis[] = [];

  for (const candidate of candidates) {
    if (selectedByScore.length >= maxFrames) {
      break;
    }

    if (isFarEnoughFromSelected(candidate, selectedByScore, minFrameSpacing)) {
      selectedByScore.push(candidate);
    }
  }

  if (selectedByScore.length < Math.min(30, candidates.length)) {
    for (const candidate of candidates) {
      if (selectedByScore.length >= Math.min(maxFrames, candidates.length)) {
        break;
      }

      const alreadySelected = selectedByScore.some(
        (frame) => frame.relativePath === candidate.relativePath
      );

      if (!alreadySelected) {
        selectedByScore.push(candidate);
      }
    }
  }

  const timelineSortedSelection = sortByTimeline(selectedByScore);

  const selectedFrames: SelectedFrame[] = [];

  for (const [index, frame] of timelineSortedSelection.entries()) {
    const rank = index + 1;

    const copied = await copySelectedFrame({
      jobId: job.jobId,
      sourceRelativePath: frame.relativePath,
      fileName: frame.fileName,
      rank
    });

    selectedFrames.push({
      fileName: copied.selectedFileName,
      sourceRelativePath: frame.relativePath,
      selectedRelativePath: copied.selectedRelativePath,
      score: frame.score,
      label: frame.label,
      reasons: frame.reasons,
      rank
    });
  }

  job.selectedFrames = selectedFrames;
  job.selectedFrameCount = selectedFrames.length;
  job.frameSelectionSummary = {
    totalCandidates: qualityResults.length,
    selectedFrames: selectedFrames.length,
    rejectedByQuality,
    maxFrames,
    minScore,
    selectionStrategy:
      "Quality score filter + temporal spacing + timeline sorting"
  };

  job.status = "frames_selected";
  job.notes.push(
    `Best frame selection completed. Selected ${selectedFrames.length} of ${qualityResults.length} analyzed frames.`
  );

  if (selectedFrames.length < 20) {
    job.notes.push(
      "Warning: selected frame count is low. Reconstruction may fail or produce poor results."
    );
  }

  await writeJob(job);

  return job;
}
