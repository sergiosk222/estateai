import TrackedLink from "@/components/TrackedLink";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import PricingSection from "@/components/PricingSection";
import { properties } from "@/data/properties";

export default function HomePage() {
  const demoProperty = properties[0];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-neutral-950">
      <PublicHeader />

      <section className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm sm:text-sm">
            For real estate agents and property teams
          </p>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
            Help buyers understand the property before they visit.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 sm:mt-7 sm:text-lg sm:leading-8">
            EstateAI turns a property into a clean, shareable 3D page. Buyers
            can explore the space directly in their browser, understand the
            layout faster and decide if the property is worth a real visit.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <TrackedLink
              href="/examples"
              eventName="hero_examples_click"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              View example listings
            </TrackedLink>

            <TrackedLink
              href="/request"
              eventName="hero_request_click"
              className="rounded-full border border-black/20 bg-white px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              Request a 3D page
            </TrackedLink>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:mt-12 sm:gap-4">
            <div>
              <p className="text-2xl font-black sm:text-3xl">3D</p>
              <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                browser viewing
              </p>
            </div>

            <div>
              <p className="text-2xl font-black sm:text-3xl">1 link</p>
              <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                for every buyer
              </p>
            </div>

            <div>
              <p className="text-2xl font-black sm:text-3xl">0 apps</p>
              <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                no installation
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-black/10 bg-white p-3 shadow-2xl shadow-black/10 sm:rounded-[2rem] sm:p-4">
          <div className="overflow-hidden rounded-[1.2rem] bg-neutral-100 sm:rounded-[1.5rem]">
            <img
              src={`${demoProperty.images[0]}?auto=format&fit=crop&w=1400&q=85`}
              alt={demoProperty.title}
              className="h-72 w-full object-cover sm:h-[420px]"
            />
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  {demoProperty.city}
                </p>
                <h2 className="mt-2 text-xl font-black sm:text-2xl">
                  {demoProperty.title}
                </h2>
              </div>

              <span className="rounded-full bg-black px-3 py-2 text-xs font-bold uppercase tracking-wide text-white sm:px-4">
                3D
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-600">
              A premium property page with photos, description and interactive
              3D viewing for serious buyers.
            </p>

            <TrackedLink
              href={`/p/${demoProperty.slug}`}
              eventName="home_3d_example_click"
              eventProperties={{
                property: demoProperty.slug
              }}
              className="mt-6 block rounded-full bg-black px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Open example listing
            </TrackedLink>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            A better listing in three simple steps.
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            The agent gets a clean 3D property page that can be sent to buyers,
            added to a listing or shared before a physical viewing.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Capture the property",
              text: "Send photos, video or a scan of the property. We explain what is needed before preparing the page."
            },
            {
              number: "02",
              title: "Prepare the 3D page",
              text: "The property is turned into a browser-ready page with visuals, description and interactive 3D viewing."
            },
            {
              number: "03",
              title: "Share with buyers",
              text: "Send one link through WhatsApp, email, your website or property portals."
            }
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8"
            >
              <p className="text-sm font-black text-neutral-400">
                {step.number}
              </p>
              <h3 className="mt-6 text-2xl font-black sm:mt-8">{step.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-[1.5rem] bg-black p-6 text-white sm:rounded-[2rem] sm:p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                Why agents use it
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                Give buyers more clarity before they book a viewing.
              </h2>

              <p className="mt-5 leading-7 text-white/65">
                Photos are useful, but they often fail to explain the flow of a
                property. A 3D page helps buyers understand the space faster.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {[
                "Reduce low-quality visits from buyers who did not understand the layout.",
                "Make listings look more premium and easier to remember.",
                "Send a stronger property presentation with one simple link.",
                "Help remote buyers inspect the space before asking for a physical viewing."
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="leading-7 text-white/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "For apartments",
              text: "Show room flow, balconies, corridors and layout in a way photos alone cannot explain."
            },
            {
              title: "For villas",
              text: "Create a premium presentation for higher-value properties, holiday homes and investment listings."
            },
            {
              title: "For offices",
              text: "Help companies understand commercial spaces before arranging an on-site visit."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8"
            >
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 text-center shadow-sm sm:rounded-[2rem] sm:p-8 md:p-14">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Want to test it on a real listing?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Send a request and we will explain what files are needed, what can
            be prepared and which package fits your property.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <TrackedLink
              href="/request"
              eventName="bottom_request_click"
              className="rounded-full bg-black px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Request early access
            </TrackedLink>

            <TrackedLink
              href="/examples"
              eventName="bottom_examples_click"
              className="rounded-full border border-black/20 px-8 py-4 text-center text-sm font-bold transition hover:bg-neutral-100"
            >
              View examples
            </TrackedLink>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
