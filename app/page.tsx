import Link from "next/link";
import { properties } from "@/data/properties";

export default function HomePage() {
  const demoProperty = properties[0];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-sm font-black tracking-[0.3em]">
            ESTATEAI
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
            <a href="#demo" className="hover:text-black">
              Demo
            </a>
            <Link href="/examples" className="hover:text-black">
              Examples
            </Link>
            <Link href="/upload" className="hover:text-black">
              Upload
            </Link>
            <Link href="/processing/demo-job" className="hover:text-black">
              Processing
            </Link>
            <Link href="/pipeline" className="hover:text-black">
              Pipeline
            </Link>
            <Link href="/request" className="hover:text-black">
              Request
            </Link>
            <a href="#how-it-works" className="hover:text-black">
              How it works
            </a>
            <a href="#benefits" className="hover:text-black">
              Benefits
            </a>
          </nav>

          <a
            href="/request"
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Request demo
          </a>
        </div>
      </header>

      <section className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
            3D digital twins for real estate
          </p>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-7xl">
            Turn property scans into browser-ready 3D models.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
            EstateAI helps real estate agents and property platforms publish
            interactive 3D property models that open directly in the browser —
            no app installation required.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/examples"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              View examples
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              See how it works
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-black">3D</p>
              <p className="mt-1 text-sm text-neutral-600">browser viewer</p>
            </div>
            <div>
              <p className="text-3xl font-black">1 link</p>
              <p className="mt-1 text-sm text-neutral-600">easy sharing</p>
            </div>
            <div>
              <p className="text-3xl font-black">0 apps</p>
              <p className="mt-1 text-sm text-neutral-600">for buyers</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-2xl shadow-black/10">
          <div className="overflow-hidden rounded-[1.5rem] bg-neutral-100">
            <img
              src={`${demoProperty.images[0]}?auto=format&fit=crop&w=1400&q=85`}
              alt={demoProperty.title}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  {demoProperty.city}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {demoProperty.title}
                </h2>
              </div>

              <span className="rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                3D Ready
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Interactive property page with photos, description and a 3D model
              that opens directly in the browser.
            </p>

            <Link
              href={`/p/${demoProperty.slug}`}
              className="mt-6 block rounded-full bg-black px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Open demo object
            </Link>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              Demo object
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              First public 3D property page
            </h2>
          </div>

          <Link
            href={`/p/${demoProperty.slug}`}
            className="rounded-full bg-black px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
          >
            View demo page
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <img
              src={`${demoProperty.images[1]}?auto=format&fit=crop&w=1600&q=85`}
              alt="Demo property interior"
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">
              {demoProperty.city}
            </p>

            <h3 className="mt-3 text-3xl font-black">
              {demoProperty.title}
            </h3>

            <p className="mt-5 leading-7 text-neutral-700">
              {demoProperty.description}
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Browser-based 3D viewer",
                "Shareable public link",
                "Photo gallery included",
                "Ready for real estate listings"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    ✓
                  </div>
                  <p className="font-medium text-neutral-800">{item}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/p/${demoProperty.slug}`}
              className="mt-10 block rounded-full bg-black px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Open 3D model
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Process
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            From property scan to 3D link
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Capture",
              text: "Scan or record the property using a phone or 3D capture app."
            },
            {
              number: "02",
              title: "Process",
              text: "Convert the scan into a browser-ready 3D model."
            },
            {
              number: "03",
              title: "Share",
              text: "Publish the model as a simple link for listings and clients."
            }
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm"
            >
              <p className="text-sm font-black text-neutral-400">
                {step.number}
              </p>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                Why it matters
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Better listings. Better understanding. Faster decisions.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                "Buyers understand the layout before visiting.",
                "Agents can send one strong 3D link instead of many photos.",
                "Listings become more premium and easier to remember.",
                "The same model can later be used for websites, CRM and APIs."
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="leading-7 text-white/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm md:p-14">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Want a 3D model for your property?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            We are testing EstateAI with early real estate agents and agencies.
            The first demo properties can be created manually.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/request"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request early access
            </a>

            <Link
              href={`/p/${demoProperty.slug}`}
              className="rounded-full border border-black/20 px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              View demo object
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-neutral-500 md:flex-row">
          <p>© 2026 EstateAI. Early MVP.</p>
          <p>Digital twins for real estate.</p>
        </div>
      </footer>
    </main>
  );
}
