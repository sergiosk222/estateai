"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type JobFile = {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  relativePath: string;
};

type JobFrame = {
  fileName: string;
  relativePath: string;
  size: number;
};

type FrameQuality = {
  fileName: string;
  relativePath: string;
  width: number;
  height: number;
  brightness: number;
  contrast: number;
  blur: number;
  darkPixelRatio: number;
  brightPixelRatio: number;
  score: number;
  label: "usable" | "questionable" | "rejected";
  reasons: string[];
};

type FrameQualitySummary = {
  totalFrames: number;
  usableFrames: number;
  questionableFrames: number;
  rejectedFrames: number;
  averageBrightness: number;
  averageContrast: number;
  averageBlur: number;
  averageScore: number;
};

type SelectedFrame = {
  fileName: string;
  sourceRelativePath: string;
  selectedRelativePath: string;
  score: number;
  label: "usable" | "questionable" | "rejected";
  reasons: string[];
  rank: number;
};

type FrameSelectionSummary = {
  totalCandidates: number;
  selectedFrames: number;
  rejectedByQuality: number;
  maxFrames: number;
  minScore: number;
  selectionStrategy: string;
};

type Job = {
  jobId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  inputType: string;
  rawDir: string;
  framesDir: string;
  selectedDir: string;
  reconstructionDir: string;
  outputDir: string;
  files: JobFile[];
  frames: JobFrame[];
  frameCount: number;
  frameQuality: FrameQuality[];
  frameQualitySummary: FrameQualitySummary | null;
  selectedFrames: SelectedFrame[];
  selectedFrameCount: number;
  frameSelectionSummary: FrameSelectionSummary | null;
  notes: string[];
  error?: string;
};

type JobStatusPanelProps = {
  jobId: string;
};

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value = value / 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function labelClass(label: FrameQuality["label"]) {
  if (label === "usable") {
    return "bg-green-50 text-green-800";
  }

  if (label === "questionable") {
    return "bg-yellow-50 text-yellow-800";
  }

  return "bg-red-50 text-red-800";
}

function currentStageText(status: string) {
  if (status === "frames_selected") {
    return "Best frames selected.";
  }

  if (status === "selecting_frames") {
    return "Selecting best frames...";
  }

  if (status === "frames_analyzed") {
    return "Frame quality analyzed.";
  }

  if (status === "analyzing_frames") {
    return "Analyzing frame quality...";
  }

  if (status === "frames_extracted") {
    return "Frames extracted successfully.";
  }

  if (status === "failed") {
    return "Processing failed.";
  }

  return "Processing upload.";
}

export default function JobStatusPanel({ jobId }: JobStatusPanelProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Job not found.");
        }

        setJob(result.job);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Job error.");
      }
    }

    loadJob();

    const interval = window.setInterval(loadJob, 2500);

    return () => window.clearInterval(interval);
  }, [jobId]);

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-800">
        <h2 className="text-2xl font-black">Job error</h2>
        <p className="mt-3">{error}</p>

        <Link href="/upload" className="mt-6 inline-block underline">
          Back to upload
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
        <p className="font-bold">Loading job...</p>
      </div>
    );
  }

  const totalSize = job.files.reduce((sum, file) => sum + file.size, 0);
  const firstQualityResults = job.frameQuality.slice(0, 10);
  const firstSelectedFrames = job.selectedFrames.slice(0, 12);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Processing job
        </p>

        <h2 className="mt-4 break-all text-3xl font-black">{job.jobId}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-5">
          <div className="rounded-2xl bg-neutral-100 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Status
            </p>
            <p className="mt-2 font-black">{job.status}</p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Input
            </p>
            <p className="mt-2 font-black">{job.inputType}</p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Size
            </p>
            <p className="mt-2 font-black">{formatBytes(totalSize)}</p>
          </div>

          <div className="rounded-2xl bg-neutral-100 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
              Frames
            </p>
            <p className="mt-2 font-black">{job.frameCount || 0}</p>
          </div>

          <div className="rounded-2xl bg-black p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Selected
            </p>
            <p className="mt-2 font-black">{job.selectedFrameCount || 0}</p>
          </div>
        </div>

        {job.frameQualitySummary && (
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-green-50 p-4 text-green-800">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Usable
              </p>
              <p className="mt-2 text-2xl font-black">
                {job.frameQualitySummary.usableFrames}
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4 text-yellow-800">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Questionable
              </p>
              <p className="mt-2 text-2xl font-black">
                {job.frameQualitySummary.questionableFrames}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4 text-red-800">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Rejected
              </p>
              <p className="mt-2 text-2xl font-black">
                {job.frameQualitySummary.rejectedFrames}
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                Avg score
              </p>
              <p className="mt-2 text-2xl font-black">
                {job.frameQualitySummary.averageScore}
              </p>
            </div>
          </div>
        )}

        {job.frameSelectionSummary && (
          <div className="mt-6 rounded-[1.5rem] border border-black/10 bg-neutral-50 p-5">
            <h3 className="text-lg font-black">Best frame selection</h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Candidates
                </p>
                <p className="mt-1 text-xl font-black">
                  {job.frameSelectionSummary.totalCandidates}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Selected
                </p>
                <p className="mt-1 text-xl font-black">
                  {job.frameSelectionSummary.selectedFrames}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Min score
                </p>
                <p className="mt-1 text-xl font-black">
                  {job.frameSelectionSummary.minScore}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Strategy: {job.frameSelectionSummary.selectionStrategy}
            </p>
          </div>
        )}

        {job.error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-5 text-sm font-semibold text-red-800">
            {job.error}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-black">Uploaded files</h3>

          <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
            {job.files.map((file) => (
              <div
                key={file.relativePath}
                className="border-b border-black/10 px-4 py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{file.originalName}</p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {file.mimeType}
                    </p>
                    <p className="mt-1 break-all text-xs text-neutral-400">
                      {file.relativePath}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-600">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {job.selectedFrames.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-black">Selected frames for reconstruction</h3>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Showing first {firstSelectedFrames.length} selected frames from{" "}
              {job.selectedFrameCount}.
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
              {firstSelectedFrames.map((frame) => (
                <div
                  key={frame.selectedRelativePath}
                  className="border-b border-black/10 px-4 py-4 last:border-b-0"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-bold">
                        #{frame.rank} {frame.fileName}
                      </p>

                      <p className="mt-1 break-all text-xs text-neutral-400">
                        {frame.selectedRelativePath}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-neutral-500">
                        source: {frame.sourceRelativePath}
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <span
                        className={`inline-block rounded-full px-3 py-2 text-xs font-black uppercase tracking-wide ${labelClass(frame.label)}`}
                      >
                        {frame.label}
                      </span>

                      <p className="mt-2 text-sm font-black">
                        score {frame.score}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {job.frameQuality.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-black">Frame quality analysis</h3>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Showing first {firstQualityResults.length} quality results.
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
              {firstQualityResults.map((result) => (
                <div
                  key={result.relativePath}
                  className="border-b border-black/10 px-4 py-4 last:border-b-0"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-bold">{result.fileName}</p>

                      <p className="mt-2 text-xs leading-5 text-neutral-500">
                        brightness {result.brightness} · contrast{" "}
                        {result.contrast} · blur {result.blur} · score{" "}
                        {result.score}
                      </p>

                      {result.reasons.length > 0 && (
                        <p className="mt-2 text-xs text-neutral-500">
                          reasons: {result.reasons.join(", ")}
                        </p>
                      )}
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-2 text-xs font-black uppercase tracking-wide ${labelClass(result.label)}`}
                    >
                      {result.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/upload"
            className="rounded-full border border-black/20 px-6 py-3 text-center text-sm font-bold transition hover:bg-neutral-100"
          >
            Upload another
          </Link>

          <Link
            href="/pipeline"
            className="rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
          >
            View AI pipeline
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Current stage
          </p>

          <h2 className="mt-5 text-3xl font-black">
            {currentStageText(job.status)}
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            The next technical milestone is sending selected frames to camera
            pose estimation and 3D reconstruction.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Selected folder
          </p>

          <p className="mt-4 break-all text-sm leading-6 text-neutral-600">
            {job.selectedDir}
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Why selection matters
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Bad frames can break camera tracking.</li>
            <li>Too many duplicate frames waste processing time.</li>
            <li>Blurry frames reduce reconstruction quality.</li>
            <li>The selected folder becomes the clean input dataset.</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Notes
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            {job.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
