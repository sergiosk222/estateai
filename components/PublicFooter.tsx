import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "@/lib/contact";

export default function PublicFooter() {
  return (
    <footer className="border-t border-black/10 px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm text-neutral-500 md:grid-cols-[1fr_auto]">
        <div>
          <p>© 2026 EstateAI. Early access product.</p>
          <p className="mt-1">Interactive 3D property pages for real estate.</p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/privacy" className="font-semibold hover:text-black">
              Privacy Policy
            </Link>

            <Link href="/terms" className="font-semibold hover:text-black">
              Terms of Use
            </Link>
          </div>
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
