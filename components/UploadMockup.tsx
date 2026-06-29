"use client";

import { ChangeEvent, useMemo, useState } from "react";

type UploadStatus = "idle" | "ready" | "checking" | "queued";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(1)} ${units[index]}`;
}

export default function UploadMockup() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");

  const totalSize = useMemo(() => {
    return files.reduce((sum, file) => sum + file.size, 0);
  }, [files]);

  const photoCount = files.filter((file) => file.type.startsWith("image/")).length;
  const videoCount = files.filter((file) => file.type.startsWith("video/")).length;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles(selectedFiles);
    setStatus(selectedFiles.length > 0 ? "ready" : "idle");
  }

  function handleStartMockProcessing() {
    if (files.length === 0) return;

    setStatus("checking");

    window.setTimeout(() => {
      setStatus("queued");
    }, 1200);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <div className="rounded-[1.5rem] border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl text-white">
            ↑
          </div>

          <h2 className="mt-6 text-2xl font-black">Upload property files</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Add property photos or video. In the future, EstateAI will use these
            files to generate a browser-ready 3D model.
          </p>

          <label className="mt-8 inline-flex cursor-pointer rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-neutral-800">
            Choose photos or videos
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <p className="mt-4 text-xs text-neutral-500">
            Supported in mockup: JPG, PNG, HEIC, MP4, MOV
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-black">Selected files</h3>
            <p className="text-sm text-neutral-500">
              {files.length} files · {formatBytes(totalSize)}
            </p>
          </div>

          {files.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 p-5 text-sm text-neutral-500">
              No files selected yet.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {files.map((file) => (
                <div
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{file.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {file.type || "Unknown type"}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-600">
                    {formatBytes(file.size)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleStartMockProcessing}
            disabled={files.length === 0 || status === "checking"}
            className="mt-8 w-full rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {status === "checking" ? "Checking files..." : "Start AI processing"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Upload summary
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-neutral-100 p-4">
              <p className="text-2xl font-black">{photoCount}</p>
              <p className="mt-1 text-xs text-neutral-500">Photos</p>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-4">
              <p className="text-2xl font-black">{videoCount}</p>
              <p className="mt-1 text-xs text-neutral-500">Videos</p>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-4">
              <p className="text-2xl font-black">{formatBytes(totalSize)}</p>
              <p className="mt-1 text-xs text-neutral-500">Total</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Future AI pipeline
          </p>

          <div className="mt-6 space-y-4">
            {[
              "Check photo and video quality",
              "Extract frames from video",
              "Reconstruct 3D geometry",
              "Generate GLB model",
              "Optimize for mobile browser",
              "Publish shareable 3D link"
            ].map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-black">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-6 text-white/80">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Status
          </p>

          <div className="mt-5 rounded-2xl bg-neutral-100 p-5">
            {status === "idle" && (
              <p className="font-semibold text-neutral-600">
                Waiting for property files.
              </p>
            )}

            {status === "ready" && (
              <p className="font-semibold text-neutral-900">
                Files selected. Ready for mock AI processing.
              </p>
            )}

            {status === "checking" && (
              <p className="font-semibold text-neutral-900">
                Checking file quality...
              </p>
            )}

            {status === "queued" && (
              <div>
                <p className="font-semibold text-green-700">
                  Queued for AI processing. This is a frontend mockup.
                </p>

                <a
                  href="/processing/demo-job"
                  className="mt-4 inline-flex rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
                >
                  Open processing status
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
