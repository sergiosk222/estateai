import ContactRequestForm from "@/components/ContactRequestForm";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export default function RequestPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Request
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            Test a 3D page on one property listing.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Send a short request. We will check the property type, explain what
            files are needed and suggest the best early-access package.
            Packages start from 49 €.
          </p>
        </div>

        <ContactRequestForm />
      </section>

      <PublicFooter />
    </main>
  );
}
