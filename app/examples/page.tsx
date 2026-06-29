import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { properties } from "@/data/properties";

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              Examples
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
              Example 3D property pages.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              Explore example property pages with photos, descriptions and
              browser-based 3D viewing.
            </p>
          </div>

          <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Early examples
            </p>

            <h2 className="mt-5 text-3xl font-black">
              Safe template objects
            </h2>

            <p className="mt-4 leading-7 text-white/70">
              These pages are examples. Real client properties will receive
              their own photos, model and public link.
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
            Want this for a real property?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Request early access and we will contact you about creating a 3D
            property page.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/request"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request early access
            </Link>

            <Link
              href="/"
              className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
