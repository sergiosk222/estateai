"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  propertyType: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

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
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send request.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-neutral-700">Name</label>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-neutral-700">Email</label>
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
            <label className="text-sm font-bold text-neutral-700">Phone</label>
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
            <label className="text-sm font-bold text-neutral-700">City</label>
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
          <label className="text-sm font-bold text-neutral-700">Message</label>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="I want a 3D page for a property listing..."
            rows={6}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-4 outline-none transition focus:border-black"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "Sending..." : "Send request"}
          </button>
        </div>

        {status === "success" && (
          <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm font-semibold text-green-800">
            Request sent successfully. We will contact you soon.
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 rounded-2xl bg-red-50 p-5 text-sm font-semibold text-red-800">
            {errorMessage}
          </div>
        )}
      </form>

      <div className="space-y-6">
        <div className="rounded-[2rem] bg-black p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
            Early access
          </p>

          <h2 className="mt-5 text-3xl font-black">
            Create a stronger property listing.
          </h2>

          <p className="mt-4 leading-7 text-white/70">
            EstateAI helps present properties with a clear, shareable 3D page
            that buyers can open directly in the browser.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
            What happens next
          </p>

          <div className="mt-6 space-y-4">
            {[
              "We receive your request.",
              "We check the property type and location.",
              "We explain what photos, video or scan are needed.",
              "A 3D property page is prepared.",
              "You receive a shareable link."
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
      </div>
    </div>
  );
}
