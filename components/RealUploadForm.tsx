"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type UploadStatus = "idle" | "uploading" | "success" | "error";

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

export default function RealUploadForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  const photoCount = files.filter((file) => file.type.startsWith("image/")).length;
  const videoCount = files.filter((file) => file.type.startsWith("video/")).length;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (files.length === 0) {
      setStatus("error");
      setErrorMessage("Select at least one photo or video.");
      return;
    }

    setStatus("uploading");
    setErrorMessage("");

    const formData = new FormData();

    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      setStatus("success");

      router.push(`/processing/${result.job.jobId}`);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Upload failed. Try again."
      );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8"
      >
        <label className="block rounded-[1.5rem] border border-dashed border-black/20 bg-neutral-50 p-8 text-center">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(event) => {
              setFiles(Array.from(event.target.files || []));
              setStatus("idle");
              setErrorMessage("");
            }}
          />

          <span className="block text-2xl font-black">
            Upload property photos or video
          </span>

          <span className="mt-3 block text-sm leading-6 text-neutral-600">
            Select JPG, PNG, HEIC, MP4, MOV or other image/video files.
          </span>

          <span className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white">
            Choose files
          </span>
        </label>

        {files.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-neutral-100 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Files
                </p>
                <p className="mt-2 text-2xl font-black">{files.length}</p>
              </div>

              <div className="rounded-2xl bg-neutral-100 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Photos / Videos
                </p>
                <p className="mt-2 text-2xl font-black">
                  {photoCount}/{videoCount}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-100 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Total size
                </p>
                <p className="mt-2 text-2xl font-black">
                  {formatBytes(totalSize)}
                </p>
              </div>
            </div>

            <div className="max-h-72 overflow-auto rounded-2xl border border-black/10">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                      {file.type || "unknown type"}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-600">
                    {formatBytes(file.size)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={status === "uploading"}
            className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "uploading" ? "Uploading..." : "Create processing job"}
          </button>

          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setStatus("idle");
              setErrorMessage("");
            }}
            className="rounded-full border border-black/20 bg-white px-8 py-4 text-sm font-bold transition hover:bg-neutral-100"
          >
            Clear
          </button>
        </div>

        {status === "error" && (
          <div className="mt-6 rounded-2xl bg-red-50 p-5 text-sm font-semibold text-red-800">
            {errorMessage}
          </div>
        )}

        {status === "success" && (
          <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm font-semibold text-green-800">
            Upload completed. Opening processing job...
          </div>
        )}
      </form>

      <div className="space-y-6">
        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Real upload prototype
          </p>

          <h2 className="mt-5 text-3xl font-black">
            This creates a real processing job.
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            Files are saved locally into the captures folder. The next stage is
            frame extraction and reconstruction.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Pipeline status
          </p>

          <div className="mt-6 space-y-4">
            {[
              "Upload files",
              "Create processing job",
              "Save raw files",
              "Extract frames",
              "Run 3D reconstruction",
              "Generate browser viewer"
            ].map((item, index) => (
              <div key={item} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-6 text-neutral-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
