import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/lib/contact";

export default function PublicFooter() {
  return (
    <footer className="border-t border-black/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-neutral-500 md:flex-row">
        <div>
          <p>© 2026 EstateAI. Early access product.</p>
          <p className="mt-1">Interactive 3D property pages for real estate.</p>
        </div>

        <div className="md:text-right">
          <p>{CONTACT_LOCATION}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 inline-block font-semibold text-neutral-700 hover:text-black"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
