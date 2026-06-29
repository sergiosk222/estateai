import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for EstateAI early-access 3D property page service."
};

export default function TermsPage() {
  const updatedAt = "June 29, 2026";

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Legal
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Terms of Use
        </h1>

        <p className="mt-5 text-sm text-neutral-500">
          Last updated: {updatedAt}
        </p>

        <div className="mt-10 space-y-8 rounded-[1.5rem] border border-black/10 bg-white p-6 leading-7 text-neutral-700 shadow-sm sm:rounded-[2rem] sm:p-10">
          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              1. About EstateAI
            </h2>
            <p className="mt-3">
              EstateAI is an early-access product for presenting real estate
              properties through interactive 3D property pages. The website is
              currently used for testing, demonstration and early customer
              requests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              2. Early-access status
            </h2>
            <p className="mt-3">
              EstateAI is not a finished commercial platform yet. Features,
              pricing, availability and processing workflow may change as the
              product develops.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              3. Demo content
            </h2>
            <p className="mt-3">
              Demo property pages, example images and 3D models are used to
              show the product concept. They may not represent real client
              properties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              4. User requests
            </h2>
            <p className="mt-3">
              When you submit a request, you confirm that the information you
              provide is accurate and that you have the right to discuss the
              property or listing described in your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              5. Property files and rights
            </h2>
            <p className="mt-3">
              If you provide photos, videos, scans or property information in a
              future workflow, you must have the necessary rights or permission
              to share and use those materials for creating a property page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              6. No guarantee of availability
            </h2>
            <p className="mt-3">
              The website and early-access service are provided on a best-effort
              basis. We do not guarantee uninterrupted availability, permanent
              hosting of demo pages or error-free operation during the MVP
              stage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              7. Pricing
            </h2>
            <p className="mt-3">
              Any prices shown on the website are early-access test prices.
              Final commercial pricing may change. Custom work may require a
              separate written agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              8. Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, EstateAI is not liable for
              indirect losses, missed sales, lost profits or decisions made
              based on demo content or early-access pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              9. Contact
            </h2>
            <p className="mt-3">
              For questions about these terms, contact{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-bold text-neutral-950 underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
