"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "hello@estateai.gr";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  propertyType: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  propertyType: "Apartment",
  message: ""
};

export default function ContactRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function buildEmailBody() {
    return `
New EstateAI request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Company: ${form.company}
City: ${form.city}
Property type: ${form.propertyType}

Message:
${form.message}

---
Sent from EstateAI MVP request form.
`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent("New EstateAI 3D model request");
    const body = encodeURIComponent(buildEmailBody());

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function copyRequestText() {
    await navigator.clipboard.writeText(buildEmailBody());
    alert("Request text copied");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-neutral-700">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="John Papadopoulos"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="agent@example.com"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+30 69..."
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">
              Company
            </label>
            <input
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              placeholder="Real estate agency"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">
              City
            </label>
            <input
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Thessaloniki"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">
              Property type
            </label>
            <select
              value={form.propertyType}
              onChange={(event) =>
                updateField("propertyType", event.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Office</option>
              <option>Store</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-bold text-neutral-700">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="I want to create a 3D model for a property listing..."
            rows={6}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="submit"
            className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-neutral-800"
          >
            Send request by email
          </button>

          <button
            type="button"
            onClick={copyRequestText}
            className="rounded-full border border-black/20 bg-white px-8 py-4 text-sm font-bold transition hover:bg-neutral-100"
          >
            Copy request text
          </button>
        </div>

        {submitted && (
          <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm font-semibold text-green-800">
            Request prepared. Your email app should open with the message.
          </div>
        )}
      </form>

      <div className="space-y-6">
        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Early access
          </p>

          <h2 className="mt-5 text-3xl font-black">
            Request a 3D property model
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            This MVP form is designed for first conversations with real estate
            agents and small agencies. The first projects can be processed
            manually while the platform is being developed.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            What happens next
          </p>

          <div className="mt-6 space-y-4">
            {[
              "We receive the property request.",
              "We check if the object is suitable for a 3D demo.",
              "We explain what photos/video are needed.",
              "We create a browser-ready 3D property page.",
              "The agent receives a shareable link."
            ].map((item, index) => (
              <div key={item} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-6 text-neutral-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            Current limitation
          </p>

          <p className="mt-4 leading-7 text-neutral-700">
            This is not connected to a database yet. In the next backend stage,
            requests will be saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
