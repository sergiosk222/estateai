import type { Metadata } from "next";
import JobStatusPanel from "@/components/JobStatusPanel";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Processing Job",
  description: "EstateAI processing job status."
};

type ProcessingPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function ProcessingPage({ params }: ProcessingPageProps) {
  const { jobId } = await params;

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Processing
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
            Your upload job was created.
          </h1>

          <p className="mt-6 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            Uploaded files are saved and ready for the next AI 3D generation
            stage.
          </p>
        </div>

        <JobStatusPanel jobId={jobId} />
      </section>

      <PublicFooter />
    </main>
  );
}
