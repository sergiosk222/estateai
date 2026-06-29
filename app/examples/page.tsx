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
              See how a property can look before the visit.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              These example listings show how apartments, villas and commercial
              spaces can be presented with photos, description and interactive
              3D viewing in one browser link.
            </p>
          </div>

          <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
              Buyer-ready presentation
            </p>

            <h2 className="mt-5 text-3xl font-black">
              One link instead of a long explanation.
            </h2>

            <p className="mt-4 leading-7 text-white/70">
              Send buyers a simple page where they can understand the property
              before scheduling a physical viewing.
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
            Want to test a 3D page on your listing?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Start with one property and see how buyers react before using it
            across more listings.
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
