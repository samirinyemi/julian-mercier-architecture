"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { scrollToHero } from "@/lib/scrollToHero";

export function Footer() {
  const pathname = usePathname();

  // Same behavior as the header logo: clicking the lockup returns to home
  // and lands on the hero, regardless of which page we started on.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToHero();
    }
  };

  return (
    <footer className="bg-ink text-linen">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 pt-24 pb-12">
        <div className="col-span-12 md:col-span-3">
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="Julian Mercier — home"
            className="inline-block group"
          >
            <Image
              src="/logos/lockup-cream.png"
              alt="Julian Mercier — Architectural Practice"
              width={420}
              height={120}
              className="h-12 w-auto transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-linen/60 mt-6 leading-loose">
            Founded MMXXII
            <br />
            Lisbon · Bali
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow text-linen/60 mb-4">Index</p>
          <ul className="space-y-2 font-mono text-[12px] tracking-[0.14em] uppercase">
            <li>
              <Link href="/projects" className="hover:text-sage transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/studio" className="hover:text-sage transition-colors">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-sage transition-colors">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sage transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3">
          <p className="eyebrow text-linen/60 mb-4">Locations</p>
          <ul className="space-y-2 font-mono text-[12px] tracking-[0.14em] uppercase">
            <li>Lisbon</li>
            <li>Bali</li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-linen/60 mb-4">Reach</p>
          <ul className="space-y-2 font-mono text-[12px] tracking-[0.14em] uppercase">
            <li>
              <a
                href="https://instagram.com/julian.mercier"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sage transition-colors"
              >
                @julian.mercier
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@mercier.studio"
                className="hover:text-sage transition-colors"
              >
                hello@mercier.studio
              </a>
            </li>
          </ul>
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-linen/40 mt-8">
            © 2025 Julian Mercier
          </p>
        </div>
      </div>

      <div className="border-t border-linen/10 px-4 md:px-8 py-6 flex justify-end">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-linen/40 text-right">
          Built with care · Photography by Jonas Bjerre-Poulsen, Joachim Wichmann, and others
        </p>
      </div>
    </footer>
  );
}
