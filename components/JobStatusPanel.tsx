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

type Job = {
  jobId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  inputType: string;
  rawDir: string;
  framesDir: string;
  reconstructionDir: string;
  outputDir: string;
  files: JobFile[];
  frames: JobFrame[];
  frameCount: number;
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
  const firstFrames = job.frames.slice(0, 10);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Processing job
        </p>

        <h2 className="mt-4 break-all text-3xl font-black">{job.jobId}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
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
        </div>

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

        {job.frameCount > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-black">Extracted frames</h3>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Showing first {firstFrames.length} frames from {job.frameCount}.
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-black/10">
              {firstFrames.map((frame) => (
                <div
                  key={frame.relativePath}
                  className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {frame.fileName}
                    </p>
                    <p className="mt-1 break-all text-xs text-neutral-400">
                      {frame.relativePath}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-600">
                    {formatBytes(frame.size)}
                  </p>
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
            {job.status === "frames_extracted"
              ? "Frames extracted successfully."
              : job.status === "extracting_frames"
                ? "Extracting frames..."
                : job.status === "failed"
                  ? "Processing failed."
                  : "Waiting for frame extraction."}
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            The next technical milestone is sending these frames to a 3D
            reconstruction engine.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Frame folder
          </p>

          <p className="mt-4 break-all text-sm leading-6 text-neutral-600">
            {job.framesDir}
          </p>
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
