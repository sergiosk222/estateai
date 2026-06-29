import Link from "next/link";

const pipelineSteps = [
  {
    number: "01",
    title: "Upload photos and videos",
    description:
      "The user uploads property photos or video from a phone. In the first real version, this can be handled through a web upload page.",
    input: "JPG, PNG, HEIC, MP4, MOV",
    output: "Raw property files"
  },
  {
    number: "02",
    title: "Quality check",
    description:
      "The system checks whether the files are usable: enough light, enough angles, not too blurry, and enough coverage of the space.",
    input: "Raw property files",
    output: "Quality report"
  },
  {
    number: "03",
    title: "Frame extraction",
    description:
      "If the user uploads video, the system extracts useful frames. These frames become the visual input for 3D reconstruction.",
    input: "Video file",
    output: "Image frames"
  },
  {
    number: "04",
    title: "Camera movement estimation",
    description:
      "The system estimates how the camera moved inside the property. This helps understand the geometry of the space.",
    input: "Image frames",
    output: "Camera positions"
  },
  {
    number: "05",
    title: "3D reconstruction",
    description:
      "AI/computer vision reconstructs the first 3D structure of the property from the visual data.",
    input: "Frames + camera positions",
    output: "Raw 3D model"
  },
  {
    number: "06",
    title: "Model cleanup",
    description:
      "The raw model is cleaned: broken geometry, duplicated surfaces, heavy textures and unnecessary data are reduced.",
    input: "Raw 3D model",
    output: "Cleaned model"
  },
  {
    number: "07",
    title: "Mobile optimization",
    description:
      "The model is compressed and optimized so it can load faster on phones and browsers.",
    input: "Cleaned model",
    output: "Optimized GLB"
  },
  {
    number: "08",
    title: "Publish 3D property page",
    description:
      "The final model is published as a public browser link that can be shared with clients or embedded in a listing.",
    input: "Optimized GLB",
    output: "Shareable 3D page"
  }
];

const futureComponents = [
  {
    title: "Upload service",
    description: "Receives photos and videos from the user."
  },
  {
    title: "Processing queue",
    description: "Creates a job and processes uploads in the background."
  },
  {
    title: "AI reconstruction engine",
    description: "Turns visual files into a raw 3D model."
  },
  {
    title: "Optimization service",
    description: "Compresses the model for web and mobile."
  },
  {
    title: "Object storage",
    description: "Stores photos, videos, GLB files and thumbnails."
  },
  {
    title: "Viewer page",
    description: "Shows the final model in the browser."
  }
];

export default function PipelinePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <header className="border-b border-black/10 bg-[#f7f5f0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-sm font-black tracking-[0.3em]">
            ESTATEAI
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-bold transition hover:bg-neutral-100"
            >
              Upload
            </Link>

            <Link
              href="/processing/demo-job"
              className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Processing demo
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              AI pipeline architecture
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
              From property photos to a browser-ready 3D model.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              This page explains the future EstateAI processing pipeline. The
              current MVP is a frontend simulation, but this is the technical
              direction for turning photos and videos into interactive 3D
              property pages.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/upload"
                className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Try upload mockup
              </Link>

              <Link
                href="/p/demo-apartment"
                className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
              >
                View 3D demo
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-black p-8 text-white shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Current status
            </p>

            <h2 className="mt-5 text-3xl font-black">MVP simulation</h2>

            <p className="mt-4 leading-7 text-white/70">
              EstateAI currently demonstrates the user flow: upload mockup,
              processing mockup and public 3D viewer. Real AI reconstruction
              will be added later as a backend pipeline.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-white/50">Now</p>
                <p className="mt-1 font-black">Frontend mockup</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-white/50">Next</p>
                <p className="mt-1 font-black">Real file upload + storage</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-white/50">Later</p>
                <p className="mt-1 font-black">AI reconstruction pipeline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Step-by-step pipeline
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            How the future system works
          </h2>
        </div>

        <div className="grid gap-5">
          {pipelineSteps.map((step) => (
            <div
              key={step.number}
              className="grid gap-6 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:grid-cols-[0.25fr_1fr_0.8fr] md:p-8"
            >
              <div>
                <p className="text-4xl font-black text-neutral-300">
                  {step.number}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">
                  {step.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                <div className="rounded-2xl bg-neutral-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Input
                  </p>
                  <p className="mt-2 font-bold">{step.input}</p>
                </div>

                <div className="rounded-2xl bg-neutral-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Output
                  </p>
                  <p className="mt-2 font-bold">{step.output}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
                System components
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                What we need to build later
              </h2>

              <p className="mt-5 leading-7 text-neutral-600">
                The MVP does not need all of this immediately. But this is the
                future architecture direction for the real EstateAI platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {futureComponents.map((component) => (
                <div
                  key={component.title}
                  className="rounded-2xl border border-black/10 bg-neutral-50 p-5"
                >
                  <h3 className="font-black">{component.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {component.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                Practical development order
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                We do not build the full AI first.
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "First: public 3D viewer page.",
                "Second: upload and processing mockups.",
                "Third: real file storage.",
                "Fourth: manual processing workflow.",
                "Fifth: semi-automatic AI processing.",
                "Sixth: API for external platforms."
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="leading-7 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
