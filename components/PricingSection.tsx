import TrackedLink from "@/components/TrackedLink";

const plans = [
  {
    name: "Starter Listing",
    price: "49 €",
    description: "For testing one simple property.",
    features: [
      "1 public property page",
      "Photo gallery",
      "Interactive 3D viewer",
      "Shareable buyer link",
      "Mobile-friendly page"
    ],
    highlighted: false
  },
  {
    name: "Premium Listing",
    price: "89 €",
    description: "For agents who want a stronger presentation.",
    features: [
      "1 premium property page",
      "Photo gallery",
      "Interactive 3D viewer",
      "Improved listing text",
      "Buyer-ready share link",
      "Priority preparation"
    ],
    highlighted: true
  },
  {
    name: "Agency Test Pack",
    price: "299 €",
    description: "For agencies testing several listings.",
    features: [
      "Up to 5 property pages",
      "Reusable agency format",
      "Share links for each listing",
      "Best for early market testing",
      "Simple workflow for future listings"
    ],
    highlighted: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-3xl sm:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Pricing
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Early-access packages for real estate agents.
        </h2>

        <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
          Start with one listing, test buyer reaction and decide if 3D pages
          should become part of your regular property marketing.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[1.5rem] border p-6 shadow-sm sm:rounded-[2rem] sm:p-8 ${
              plan.highlighted
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white text-neutral-950"
            }`}
          >
            {plan.highlighted && (
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-black">
                Recommended
              </p>
            )}

            <h3 className="text-2xl font-black">{plan.name}</h3>

            <p
              className={`mt-3 leading-7 ${
                plan.highlighted ? "text-white/70" : "text-neutral-600"
              }`}
            >
              {plan.description}
            </p>

            <div className="mt-8">
              <p className="text-5xl font-black">{plan.price}</p>
              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-white/50" : "text-neutral-500"
                }`}
              >
                early-access package
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      plan.highlighted
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    ✓
                  </div>

                  <p
                    className={`text-sm leading-6 ${
                      plan.highlighted ? "text-white/80" : "text-neutral-700"
                    }`}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <TrackedLink
              href="/request"
              eventName="pricing_package_click"
              eventProperties={{
                package: plan.name,
                price: plan.price
              }}
              className={`mt-10 block rounded-full px-7 py-4 text-center text-sm font-bold transition ${
                plan.highlighted
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              Request this package
            </TrackedLink>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm leading-7 text-neutral-600 shadow-sm sm:rounded-[2rem] sm:p-6">
        <p>
          Prices are early-access test packages. Final pricing may change after
          the first real property projects and agency feedback.
        </p>
      </div>
    </section>
  );
}
