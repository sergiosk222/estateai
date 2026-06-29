import TrackedLink from "@/components/TrackedLink";

const trustItems = [
  {
    title: "No app for buyers",
    text: "Buyers open the property page directly in the browser. No installation is needed."
  },
  {
    title: "One shareable link",
    text: "The agent can send the page through WhatsApp, email, websites or property portals."
  },
  {
    title: "Clear early-access process",
    text: "We start with one listing, check the property, explain what files are needed and prepare the page."
  },
  {
    title: "Built for real estate",
    text: "The page is designed around property presentation: photos, description, 3D viewer and buyer action."
  }
];

const objections = [
  {
    question: "Will this replace physical property visits?",
    answer:
      "No. It helps buyers understand the property before booking a visit. The goal is to reduce low-quality visits and make serious buyers better prepared."
  },
  {
    question: "Do buyers need special hardware?",
    answer:
      "No. The property page is browser-based. Buyers can open it from a phone, tablet or computer."
  },
  {
    question: "Is this only for luxury villas?",
    answer:
      "No. It can be useful for apartments, villas, offices, stores and rental properties where layout and first impression matter."
  },
  {
    question: "What if the property is not suitable?",
    answer:
      "We check the property first. If the listing is not suitable for a 3D page, we explain it before starting."
  }
];

const faqs = [
  {
    question: "What do I need to send?",
    answer:
      "For the early-access version, you can send property photos, video or an existing scan. We will explain what is usable and what may need to be improved."
  },
  {
    question: "Can I share the page with buyers?",
    answer:
      "Yes. The main output is a public property page link that can be shared with buyers."
  },
  {
    question: "Can I use it on a property portal?",
    answer:
      "You can share the link in messages and add it wherever the portal allows external links. Full portal integration would come later."
  },
  {
    question: "Does it work on iPhone?",
    answer:
      "Yes. The public page is designed to work on modern mobile browsers, including iPhone."
  },
  {
    question: "Is the product finished?",
    answer:
      "No. EstateAI is currently an early-access MVP. The goal is to test real estate use cases with first agents and improve the workflow."
  },
  {
    question: "Can agencies test several listings?",
    answer:
      "Yes. The Agency Test Pack is designed for small agencies that want to test several properties before deciding if this should become part of their normal listing workflow."
  }
];

export default function TrustSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-3xl sm:mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Trust & FAQ
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Clear answers before an agent tries it.
        </h2>

        <p className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
          EstateAI is an early-access product. Instead of fake reviews or fake
          client logos, we explain exactly what the product does, what it does
          not do yet and how agents can test it safely.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm sm:rounded-[2rem]"
          >
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-black text-white">
              ✓
            </div>

            <h3 className="text-xl font-black">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[1.5rem] bg-black p-6 text-white shadow-sm sm:rounded-[2rem] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Common objections
          </p>

          <h3 className="mt-5 text-3xl font-black">
            What real estate agents usually ask first.
          </h3>

          <p className="mt-5 leading-7 text-white/70">
            The product is not positioned as a magic replacement for real
            visits. It is a stronger pre-viewing presentation tool for serious
            buyers.
          </p>

          <TrackedLink
            href="/request"
            eventName="faq_request_click"
            className="mt-8 inline-block rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:bg-neutral-200"
          >
            Ask about one listing
          </TrackedLink>
        </div>

        <div className="grid gap-4">
          {objections.map((item) => (
            <div
              key={item.question}
              className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm"
            >
              <h4 className="text-lg font-black">{item.question}</h4>
              <p className="mt-3 leading-7 text-neutral-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            FAQ
          </p>

          <h3 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Practical questions.
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm open:bg-neutral-50"
            >
              <summary className="cursor-pointer list-none text-lg font-black">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="text-2xl leading-none transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-4 leading-7 text-neutral-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
