import path from "path";
import sharp from "sharp";
import {
  listFrames,
  writeJob,
  type FrameQualityAnalysis,
  type FrameQualityLabel,
  type FrameQualitySummary,
  type ProcessingJob
} from "@/lib/jobs";

type QualityTarget = {
  fileName: string;
  relativePath: string;
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getPixel(data: Buffer, index: number) {
  return data[index] ?? 0;
}

function calculateLaplacianVariance(data: Buffer, width: number, height: number) {
  if (width < 3 || height < 3) {
    return 0;
  }

  const values: number[] = [];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const center = getPixel(data, y * width + x);
      const left = getPixel(data, y * width + x - 1);
      const right = getPixel(data, y * width + x + 1);
      const top = getPixel(data, (y - 1) * width + x);
      const bottom = getPixel(data, (y + 1) * width + x);

      const laplacian = left + right + top + bottom - 4 * center;
      values.push(laplacian);
    }
  }

  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));

  return variance;
}

function classifyFrame(params: {
  brightness: number;
  contrast: number;
  blur: number;
  darkPixelRatio: number;
  brightPixelRatio: number;
}) {
  const reasons: string[] = [];
  let score = 100;

  if (params.brightness < 45) {
    score -= 35;
    reasons.push("too_dark");
  }

  if (params.brightness > 220) {
    score -= 25;
    reasons.push("too_bright");
  }

  if (params.darkPixelRatio > 0.45) {
    score -= 25;
    reasons.push("many_dark_pixels");
  }

  if (params.brightPixelRatio > 0.35) {
    score -= 20;
    reasons.push("many_overexposed_pixels");
  }

  if (params.contrast < 18) {
    score -= 20;
    reasons.push("low_contrast");
  }

  if (params.blur < 70) {
    score -= 35;
    reasons.push("blurry");
  } else if (params.blur < 120) {
    score -= 15;
    reasons.push("slightly_blurry");
  }

  score = Math.max(0, Math.min(100, score));

  let label: FrameQualityLabel = "usable";

  if (score < 45) {
    label = "rejected";
  } else if (score < 70 || reasons.length > 0) {
    label = "questionable";
  }

  return {
    score,
    label,
    reasons
  };
}

async function analyzeSingleImage(target: QualityTarget): Promise<FrameQualityAnalysis> {
  const absolutePath = path.join(process.cwd(), target.relativePath);

  const { data, info } = await sharp(absolutePath)
    .rotate()
    .resize({
      width: 320,
      withoutEnlargement: true
    })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const pixels = Array.from(data);

  const brightness = average(pixels);
  const contrast = Math.sqrt(
    average(pixels.map((pixel) => (pixel - brightness) ** 2))
  );

  const darkPixelRatio =
    pixels.filter((pixel) => pixel < 35).length / Math.max(1, pixels.length);

  const brightPixelRatio =
    pixels.filter((pixel) => pixel > 225).length / Math.max(1, pixels.length);

  const blur = calculateLaplacianVariance(data, width, height);

  const classification = classifyFrame({
    brightness,
    contrast,
    blur,
    darkPixelRatio,
    brightPixelRatio
  });

  return {
    fileName: target.fileName,
    relativePath: target.relativePath,
    width,
    height,
    brightness: round(brightness),
    contrast: round(contrast),
    blur: round(blur),
    darkPixelRatio: round(darkPixelRatio),
    brightPixelRatio: round(brightPixelRatio),
    score: round(classification.score),
    label: classification.label,
    reasons: classification.reasons
  };
}

function createSummary(results: FrameQualityAnalysis[]): FrameQualitySummary {
  return {
    totalFrames: results.length,
    usableFrames: results.filter((result) => result.label === "usable").length,
    questionableFrames: results.filter((result) => result.label === "questionable").length,
    rejectedFrames: results.filter((result) => result.label === "rejected").length,
    averageBrightness: round(average(results.map((result) => result.brightness))),
    averageContrast: round(average(results.map((result) => result.contrast))),
    averageBlur: round(average(results.map((result) => result.blur))),
    averageScore: round(average(results.map((result) => result.score)))
  };
}

export async function analyzeFrameQualityForJob(
  job: ProcessingJob
): Promise<ProcessingJob> {
  job.status = "analyzing_frames";
  job.notes.push("Frame quality analysis started.");
  await writeJob(job);

  const extractedFrames = job.frames.length > 0 ? job.frames : await listFrames(job.jobId);

  const uploadedImages: QualityTarget[] = job.files
    .filter((file) => file.mimeType.startsWith("image/"))
    .map((file) => ({
      fileName: file.storedName,
      relativePath: file.relativePath
    }));

  const frameTargets: QualityTarget[] = extractedFrames.map((frame) => ({
    fileName: frame.fileName,
    relativePath: frame.relativePath
  }));

  const targets = [...frameTargets, ...uploadedImages];

  if (targets.length === 0) {
    job.frameQuality = [];
    job.frameQualitySummary = createSummary([]);
    job.status = "frames_analyzed";
    job.notes.push("No frames or images found for quality analysis.");
    await writeJob(job);
    return job;
  }

  const results: FrameQualityAnalysis[] = [];

  for (const target of targets) {
    try {
      const result = await analyzeSingleImage(target);
      results.push(result);
    } catch (error) {
      results.push({
        fileName: target.fileName,
        relativePath: target.relativePath,
        width: 0,
        height: 0,
        brightness: 0,
        contrast: 0,
        blur: 0,
        darkPixelRatio: 0,
        brightPixelRatio: 0,
        score: 0,
        label: "rejected",
        reasons: ["analysis_failed"]
      });
    }
  }

  job.frameQuality = results;
  job.frameQualitySummary = createSummary(results);
  job.status = "frames_analyzed";

  job.notes.push(
    `Frame quality analysis completed. Usable: ${job.frameQualitySummary.usableFrames}, questionable: ${job.frameQualitySummary.questionableFrames}, rejected: ${job.frameQualitySummary.rejectedFrames}.`
  );

  await writeJob(job);

  return job;
}
