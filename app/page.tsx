import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import PricingSection from "@/components/PricingSection";
import { properties } from "@/data/properties";

export default function HomePage() {
  const demoProperty = properties[0];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
            3D property pages for real estate
          </p>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-7xl">
            Show properties with interactive 3D models.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
            EstateAI helps real estate agents present properties with
            browser-ready 3D pages that can be shared with buyers by link.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/examples"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              View examples
            </Link>

            <Link
              href="/request"
              className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              Request a 3D model
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-black">3D</p>
              <p className="mt-1 text-sm text-neutral-600">property view</p>
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
                3D
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Example property page with photos, description and an interactive
              3D model in the browser.
            </p>

            <Link
              href={`/p/${demoProperty.slug}`}
              className="mt-6 block rounded-full bg-black px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Open 3D example
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            From property capture to shareable 3D page.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Capture",
              text: "The property is captured with photos, video or a 3D scan."
            },
            {
              number: "02",
              title: "Create",
              text: "A browser-ready 3D model and property page are prepared."
            },
            {
              number: "03",
              title: "Share",
              text: "The agent receives a simple link for clients and listings."
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
                Why agents need it
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Better listings. Better understanding. Fewer wasted visits.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                "Buyers understand the layout before visiting.",
                "Agents send one strong 3D link instead of many photos.",
                "Listings look more premium and easier to remember.",
                "The same page can be shared through websites, WhatsApp or email."
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

      <PricingSection />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm md:p-14">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Want a 3D page for a property?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            EstateAI is preparing early tests with real estate agents and small
            agencies.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/request"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request early access
            </Link>

            <Link
              href="/examples"
              className="rounded-full border border-black/20 px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              View examples
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
