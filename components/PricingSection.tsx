import Link from "next/link";

const plans = [
  {
    name: "Basic 3D Page",
    price: "49 €",
    description: "For one simple property listing.",
    features: [
      "1 public 3D property page",
      "Photo gallery",
      "Shareable browser link",
      "Basic property description",
      "Mobile-friendly viewing"
    ],
    highlighted: false
  },
  {
    name: "Pro Listing",
    price: "89 €",
    description: "For agents who want a stronger listing.",
    features: [
      "1 public 3D property page",
      "Photo gallery",
      "Improved property description",
      "Buyer-ready share link",
      "Priority preparation",
      "Basic support"
    ],
    highlighted: true
  },
  {
    name: "Agency Pack",
    price: "299 €",
    description: "For small agencies testing multiple properties.",
    features: [
      "Up to 5 property pages",
      "Reusable listing format",
      "Agency-friendly workflow",
      "Shareable links for each object",
      "Best for first market test"
    ],
    highlighted: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Pricing
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          Simple early-access pricing.
        </h2>

        <p className="mt-5 text-lg leading-8 text-neutral-700">
          These are early test packages for real estate agents and small
          agencies. Final pricing may change after the first real property
          tests.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[2rem] border p-8 shadow-sm ${
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
                per package
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

            <Link
              href="/request"
              className={`mt-10 block rounded-full px-7 py-4 text-center text-sm font-bold transition ${
                plan.highlighted
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              Request this package
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 text-sm leading-7 text-neutral-600 shadow-sm">
        <p>
          Early-access prices are designed for market testing. For large
          agencies, custom packages can be discussed after the first demo
          properties.
        </p>
      </div>
    </section>
  );
}
