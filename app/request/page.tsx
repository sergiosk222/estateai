import Link from "next/link";
import ContactRequestForm from "@/components/ContactRequestForm";

export default function RequestPage() {
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
              href="/p/demo-apartment"
              className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              View demo
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Request form
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            Request a 3D model for a property.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Send a request for an early EstateAI test. The first version can be
            processed manually while the AI pipeline is being developed.
          </p>
        </div>

        <ContactRequestForm />
      </section>
    </main>
  );
}
