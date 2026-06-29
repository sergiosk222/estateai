"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Step = {
  title: string;
  description: string;
  start: number;
  end: number;
};

const steps: Step[] = [
  {
    title: "Checking uploaded files",
    description: "Validating photos and videos before processing.",
    start: 0,
    end: 15
  },
  {
    title: "Extracting visual frames",
    description: "Preparing image frames from property video.",
    start: 15,
    end: 35
  },
  {
    title: "Estimating camera movement",
    description: "Understanding how the camera moved inside the property.",
    start: 35,
    end: 55
  },
  {
    title: "Reconstructing 3D geometry",
    description: "Creating the first 3D structure of the space.",
    start: 55,
    end: 75
  },
  {
    title: "Generating browser-ready model",
    description: "Preparing GLB model for web and mobile viewing.",
    start: 75,
    end: 92
  },
  {
    title: "Publishing 3D property page",
    description: "Creating the final shareable link.",
    start: 92,
    end: 100
  }
];

function getCurrentStep(progress: number) {
  return (
    steps.find((step) => progress >= step.start && progress < step.end) ??
    steps[steps.length - 1]
  );
}

function getStepStatus(step: Step, progress: number) {
  if (progress >= step.end) return "completed";
  if (progress >= step.start && progress < step.end) return "active";
  return "pending";
}

export default function ProcessingMockup() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const currentStep = useMemo(() => getCurrentStep(progress), [progress]);
  const isCompleted = progress >= 100;

  useEffect(() => {
    if (!isRunning || progress >= 100) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          setIsRunning(false);
          return 100;
        }

        const increment = current < 70 ? 3 : current < 92 ? 2 : 1;
        return Math.min(current + increment, 100);
      });
    }, 650);

    return () => window.clearInterval(timer);
  }, [isRunning, progress]);

  function restartProcessing() {
    setProgress(0);
    setIsRunning(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              Job ID: demo-job
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              {isCompleted ? "3D model is ready" : "AI processing in progress"}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              {isCompleted
                ? "The mock processing pipeline is complete. In the real product, the user would now receive a generated 3D property page."
                : currentStep.description}
            </p>
          </div>

          <div className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white">
            {isCompleted ? "Completed" : "Processing"}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-neutral-700">
              {currentStep.title}
            </p>
            <p className="text-sm font-black text-neutral-900">{progress}%</p>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-black transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step, progress);

            return (
              <div
                key={step.title}
                className={`rounded-2xl border p-5 transition ${
                  status === "completed"
                    ? "border-black bg-black text-white"
                    : status === "active"
                      ? "border-black bg-neutral-50"
                      : "border-black/10 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      status === "completed"
                        ? "bg-white text-black"
                        : status === "active"
                          ? "bg-black text-white"
                          : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {status === "completed" ? "✓" : index + 1}
                  </div>

                  <div>
                    <h3 className="font-black">{step.title}</h3>
                    <p
                      className={`mt-2 text-sm leading-6 ${
                        status === "completed"
                          ? "text-white/75"
                          : "text-neutral-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {isCompleted ? (
            <Link
              href="/p/demo-apartment"
              className="rounded-full bg-black px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              View generated 3D page
            </Link>
          ) : (
            <button
              onClick={() => setIsRunning((value) => !value)}
              className="rounded-full bg-black px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              {isRunning ? "Pause mock processing" : "Resume mock processing"}
            </button>
          )}

          <button
            onClick={restartProcessing}
            className="rounded-full border border-black/20 bg-white px-7 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
          >
            Restart demo
          </button>

          <Link
            href="/upload"
            className="rounded-full border border-black/20 bg-white px-7 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
          >
            Upload another property
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Current stage
          </p>

          <h3 className="mt-5 text-3xl font-black">{currentStep.title}</h3>

          <p className="mt-4 leading-7 text-white/70">
            This page is a frontend simulation. In the real system, this status
            would come from the backend processing queue.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Mock output
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-neutral-100 p-5">
              <p className="text-sm text-neutral-500">Output format</p>
              <p className="mt-1 font-black">GLB / browser-ready 3D model</p>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-5">
              <p className="text-sm text-neutral-500">Viewer URL</p>
              <p className="mt-1 break-all font-black">
                /p/demo-apartment
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-5">
              <p className="text-sm text-neutral-500">Processing mode</p>
              <p className="mt-1 font-black">Frontend mockup</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Future backend logic
          </p>

          <div className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
            <p>1. User uploads photos/videos.</p>
            <p>2. Backend creates a processing job.</p>
            <p>3. AI pipeline generates a 3D model.</p>
            <p>4. Optimization compresses the model for mobile.</p>
            <p>5. System publishes a shareable property page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
