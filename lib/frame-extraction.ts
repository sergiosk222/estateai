import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import {
  getJobDir,
  listFrames,
  writeJob,
  type ProcessingJob
} from "@/lib/jobs";

const execFileAsync = promisify(execFile);

type ExtractFramesOptions = {
  fps?: number;
  width?: number;
};

function isVideoFile(mimeType: string) {
  return mimeType.startsWith("video/");
}

export async function extractFramesForJob(
  job: ProcessingJob,
  options: ExtractFramesOptions = {}
): Promise<ProcessingJob> {
  const fps = options.fps ?? 2;
  const width = options.width ?? 1600;

  const videoFiles = job.files.filter((file) => isVideoFile(file.mimeType));

  if (videoFiles.length === 0) {
    job.notes.push("No video files found. Frame extraction skipped.");
    job.frames = [];
    job.frameCount = 0;
    return job;
  }

  job.status = "extracting_frames";
  job.notes.push(`Frame extraction started. FPS: ${fps}. Width: ${width}px.`);
  await writeJob(job);

  const jobDir = getJobDir(job.jobId);
  const framesDir = path.join(jobDir, "frames");

  for (const [videoIndex, videoFile] of videoFiles.entries()) {
    const inputPath = path.join(process.cwd(), videoFile.relativePath);
    const outputPattern = path.join(
      framesDir,
      `video_${String(videoIndex + 1).padStart(2, "0")}_frame_%05d.jpg`
    );

    await execFileAsync("ffmpeg", [
      "-y",
      "-i",
      inputPath,
      "-vf",
      `fps=${fps},scale=${width}:-1`,
      "-q:v",
      "2",
      outputPattern
    ]);

    job.notes.push(`Frames extracted from ${videoFile.storedName}.`);
    await writeJob(job);
  }

  const frames = await listFrames(job.jobId);

  job.frames = frames;
  job.frameCount = frames.length;
  job.status = "frames_extracted";
  job.notes.push(`Frame extraction completed. Total frames: ${frames.length}.`);
  await writeJob(job);

  return job;
}
