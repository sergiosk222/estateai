import path from "path";
import { promises as fs } from "fs";

export type UploadedJobFile = {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  relativePath: string;
};

export type ExtractedFrame = {
  fileName: string;
  relativePath: string;
  size: number;
};

export type ProcessingJobStatus =
  | "uploaded"
  | "extracting_frames"
  | "frames_extracted"
  | "reconstructing"
  | "optimizing"
  | "completed"
  | "failed";

export type ProcessingJob = {
  jobId: string;
  status: ProcessingJobStatus;
  createdAt: string;
  updatedAt: string;
  inputType: "photos" | "video" | "mixed" | "unknown";
  rawDir: string;
  framesDir: string;
  reconstructionDir: string;
  outputDir: string;
  files: UploadedJobFile[];
  frames: ExtractedFrame[];
  frameCount: number;
  notes: string[];
  error?: string;
};

export function getCapturesRoot() {
  return path.join(process.cwd(), "captures");
}

export function getJobDir(jobId: string) {
  return path.join(getCapturesRoot(), jobId);
}

export function getJobJsonPath(jobId: string) {
  return path.join(getJobDir(jobId), "job.json");
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .replace(/[^\w.\-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

export function detectInputType(files: UploadedJobFile[]): ProcessingJob["inputType"] {
  const hasImages = files.some((file) => file.mimeType.startsWith("image/"));
  const hasVideos = files.some((file) => file.mimeType.startsWith("video/"));

  if (hasImages && hasVideos) {
    return "mixed";
  }

  if (hasImages) {
    return "photos";
  }

  if (hasVideos) {
    return "video";
  }

  return "unknown";
}

export async function ensureJobFolders(jobId: string) {
  const jobDir = getJobDir(jobId);

  const folders = {
    jobDir,
    rawDir: path.join(jobDir, "raw"),
    framesDir: path.join(jobDir, "frames"),
    reconstructionDir: path.join(jobDir, "reconstruction"),
    outputDir: path.join(jobDir, "output")
  };

  await fs.mkdir(folders.rawDir, { recursive: true });
  await fs.mkdir(folders.framesDir, { recursive: true });
  await fs.mkdir(folders.reconstructionDir, { recursive: true });
  await fs.mkdir(folders.outputDir, { recursive: true });

  return folders;
}

export async function writeJob(job: ProcessingJob) {
  job.updatedAt = new Date().toISOString();
  await fs.writeFile(getJobJsonPath(job.jobId), JSON.stringify(job, null, 2));
}

export async function readJob(jobId: string): Promise<ProcessingJob | null> {
  try {
    const raw = await fs.readFile(getJobJsonPath(jobId), "utf-8");
    const parsed = JSON.parse(raw) as Partial<ProcessingJob>;

    return {
      jobId: parsed.jobId || jobId,
      status: parsed.status || "uploaded",
      createdAt: parsed.createdAt || new Date().toISOString(),
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      inputType: parsed.inputType || "unknown",
      rawDir: parsed.rawDir || `captures/${jobId}/raw`,
      framesDir: parsed.framesDir || `captures/${jobId}/frames`,
      reconstructionDir: parsed.reconstructionDir || `captures/${jobId}/reconstruction`,
      outputDir: parsed.outputDir || `captures/${jobId}/output`,
      files: parsed.files || [],
      frames: parsed.frames || [],
      frameCount: parsed.frameCount || 0,
      notes: parsed.notes || [],
      error: parsed.error
    };
  } catch {
    return null;
  }
}

export async function listFrames(jobId: string): Promise<ExtractedFrame[]> {
  const framesDir = path.join(getJobDir(jobId), "frames");

  try {
    const files = await fs.readdir(framesDir);
    const jpgFiles = files
      .filter((file) => file.toLowerCase().endsWith(".jpg"))
      .sort();

    const frames: ExtractedFrame[] = [];

    for (const fileName of jpgFiles) {
      const absolutePath = path.join(framesDir, fileName);
      const stat = await fs.stat(absolutePath);

      frames.push({
        fileName,
        relativePath: `captures/${jobId}/frames/${fileName}`,
        size: stat.size
      });
    }

    return frames;
  } catch {
    return [];
  }
}
