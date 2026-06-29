import { randomUUID } from "crypto";
import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import {
  detectInputType,
  ensureJobFolders,
  sanitizeFileName,
  writeJob,
  type ProcessingJob,
  type UploadedJobFile
} from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES = 80;
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;

function isAllowedFile(file: File) {
  return file.type.startsWith("image/") || file.type.startsWith("video/");
}

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const entries = formData.getAll("files");

    const files = entries.filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded." },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { message: `Too many files. Maximum is ${MAX_FILES}.` },
        { status: 400 }
      );
    }

    const invalidFile = files.find((file) => !isAllowedFile(file));

    if (invalidFile) {
      return NextResponse.json(
        {
          message: `Unsupported file type: ${invalidFile.name}. Upload images or videos only.`
        },
        { status: 400 }
      );
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          message: `Upload is too large: ${formatBytes(totalSize)}. Maximum is ${formatBytes(MAX_TOTAL_SIZE)}.`
        },
        { status: 400 }
      );
    }

    const jobId = randomUUID();
    const folders = await ensureJobFolders(jobId);

    const savedFiles: UploadedJobFile[] = [];

    for (const [index, file] of files.entries()) {
      const safeName = sanitizeFileName(file.name || `file_${index}`);
      const storedName = `${String(index + 1).padStart(3, "0")}_${safeName}`;
      const filePath = path.join(folders.rawDir, storedName);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.writeFile(filePath, buffer);

      savedFiles.push({
        originalName: file.name,
        storedName,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        relativePath: `captures/${jobId}/raw/${storedName}`
      });
    }

    const now = new Date().toISOString();

    const job: ProcessingJob = {
      jobId,
      status: "uploaded",
      createdAt: now,
      updatedAt: now,
      inputType: detectInputType(savedFiles),
      rawDir: `captures/${jobId}/raw`,
      framesDir: `captures/${jobId}/frames`,
      reconstructionDir: `captures/${jobId}/reconstruction`,
      outputDir: `captures/${jobId}/output`,
      files: savedFiles,
      notes: [
        "Files uploaded successfully.",
        "Next step: extract frames from video or prepare image set for reconstruction."
      ]
    };

    await writeJob(job);

    return NextResponse.json(
      {
        message: "Upload completed.",
        job
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { message: "Unexpected upload error." },
      { status: 500 }
    );
  }
}
