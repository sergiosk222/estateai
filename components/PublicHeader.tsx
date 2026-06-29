import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-black tracking-[0.3em]">
          ESTATEAI
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
          <Link href="/examples" className="hover:text-black">
            Examples
          </Link>

          <a href="/#how-it-works" className="hover:text-black">
            How it works
          </a>

          <a href="/#benefits" className="hover:text-black">
            Benefits
          </a>

          <Link href="/request" className="hover:text-black">
            Request
          </Link>
        </nav>

        <Link
          href="/request"
          className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Request demo
        </Link>
      </div>
    </header>
  );
}
