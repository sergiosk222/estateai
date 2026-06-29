import { NextResponse } from "next/server";
import { readJob } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type JobRouteProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export async function GET(_request: Request, { params }: JobRouteProps) {
  const { jobId } = await params;
  const job = await readJob(jobId);

  if (!job) {
    return NextResponse.json(
      { message: "Job not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ job });
}
