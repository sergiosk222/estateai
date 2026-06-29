import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

export default function ExamplesPage() {
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
              href="/request"
              className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request demo
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              Demo catalog
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
              Example 3D property pages.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              These are template objects used to demonstrate the EstateAI
              product flow. In the real product, each property will receive its
              own browser-ready 3D model, photo gallery and shareable page.
            </p>
          </div>

          <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Current MVP
            </p>

            <h2 className="mt-5 text-3xl font-black">
              Demo objects only
            </h2>

            <p className="mt-4 leading-7 text-white/70">
              These examples are not real client properties. They are safe
              template pages for testing layout, navigation and the 3D viewer.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-sm md:p-12">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Want a 3D page for a real property?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            EstateAI is currently being prepared for early tests with real
            estate agents and small agencies.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/request"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request early access
            </Link>

            <Link
              href="/upload"
              className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              Try upload mockup
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
