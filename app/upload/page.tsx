import type { Metadata } from "next";
import RealUploadForm from "@/components/RealUploadForm";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Upload Property Photos or Video",
  description:
    "Upload property photos or video and create a real EstateAI processing job."
};

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Upload
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
            Upload photos or video to create a 3D processing job.
          </h1>

          <p className="mt-6 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            This is the first real upload system for EstateAI. The website saves uploaded property files, creates a job, extracts frames from uploaded videos, analyzes frame quality and selects the best frames for the future AI 3D reconstruction stage.
          </p>
        </div>

        <RealUploadForm />
      </section>

      <PublicFooter />
    </main>
  );
}
