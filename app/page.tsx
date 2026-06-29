import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
            EstateAI
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            3D digital twins for real estate
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Turn property scans into interactive 3D models that open directly
            in the browser.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/p/demo-apartment"
              className="rounded-full bg-black px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              View demo
            </Link>

            <a
              href="mailto:hello@estateai.gr"
              className="rounded-full border border-neutral-300 px-7 py-4 text-center text-sm font-semibold transition hover:bg-neutral-100"
            >
              Request 3D model
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            ["1", "Capture the property", "Scan or record the apartment with a phone."],
            ["2", "Upload the scan", "Send the files for processing."],
            ["3", "Share the 3D model", "Get a browser link for clients and listings."]
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="rounded-3xl border border-neutral-200 p-6 shadow-sm"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                {number}
              </div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
