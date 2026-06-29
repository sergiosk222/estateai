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
            Request a 3D page for a property.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Send a short request. We will contact you and explain what files or
            property capture are needed.
          </p>
        </div>

        <ContactRequestForm />
      </section>

      <PublicFooter />
    </main>
  );
}
