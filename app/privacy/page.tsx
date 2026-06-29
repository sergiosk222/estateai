import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for EstateAI, including contact form data, analytics and email communication."
};

export default function PrivacyPage() {
  const updatedAt = "June 29, 2026";

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Legal
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Privacy Policy
        </h1>

        <p className="mt-5 text-sm text-neutral-500">
          Last updated: {updatedAt}
        </p>

        <div className="mt-10 space-y-8 rounded-[1.5rem] border border-black/10 bg-white p-6 leading-7 text-neutral-700 shadow-sm sm:rounded-[2rem] sm:p-10">
          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              1. Who we are
            </h2>
            <p className="mt-3">
              EstateAI is an early-access product for creating interactive 3D
              property pages for real estate listings. The project is operated
              from {CONTACT_LOCATION}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              2. What data we collect
            </h2>
            <p className="mt-3">
              When you submit a request through the contact form, we may collect
              your name, email address, phone number, company name, city,
              property type and message content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              3. Why we use this data
            </h2>
            <p className="mt-3">
              We use this information to respond to your request, discuss a
              possible 3D property page and manage early-access communication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              4. Analytics
            </h2>
            <p className="mt-3">
              We may use website analytics to understand page views, traffic
              sources and general usage patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              5. Email delivery
            </h2>
            <p className="mt-3">
              Contact form messages may be processed through an email delivery
              provider so that requests can be sent directly from the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              6. Your rights
            </h2>
            <p className="mt-3">
              You may contact us to request access, correction or deletion of
              your personal information, depending on applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-950">
              7. Contact
            </h2>
            <p className="mt-3">
              For privacy-related questions, contact us at{" "}
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
