"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/examples", label: "Examples" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/request", label: "Request" }
];

export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-sm font-black tracking-[0.25em] sm:tracking-[0.3em]"
        >
          ESTATEAI
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/request"
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Request demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-bold md:hidden"
          aria-label="Open menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 bg-[#f7f5f0] px-4 pb-5 pt-2 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl bg-white px-5 py-4 text-base font-bold shadow-sm"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/request"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-black px-5 py-4 text-center text-base font-bold text-white"
            >
              Request demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
