"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/MobileMenu";
import { scrollToHero } from "@/lib/scrollToHero";

export function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [now, setNow] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | undefined>();
  const lastScrollRef = useRef(0);
  const pathname = usePathname();

  // Logo click: smooth-scroll to top of home, regardless of current page.
  // If already on /, prevent the no-op nav so the scroll animation runs cleanly.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (menuOpen) setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      scrollToHero();
    }
    // For non-home pages, Link handles the navigation; Next scrolls to top
    // automatically on route change so the user lands on the hero.
  };

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      setNow(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrollY(y);
      // Hide on scroll-down past 200px, reveal on scroll-up.
      // Always visible while menu is open so the close-X stays accessible.
      if (menuOpen) {
        setIsVisible(true);
      } else if (y > 200) {
        setIsVisible(y < lastScrollRef.current);
      } else {
        setIsVisible(true);
      }
      lastScrollRef.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const toggleMenu = () => {
    // Capture burger button position for the clip-path origin.
    const el = burgerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setMenuOpen((v) => !v);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[70] text-linen transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${menuOpen ? "bg-transparent" : "bg-ink"}`}
        style={{
          backdropFilter:
            !menuOpen && scrollY > 8 ? "saturate(140%) blur(8px)" : "none",
        }}
      >
        <div className="grid grid-cols-12 items-center h-[64px] md:h-[72px] px-4 sm:px-6 md:px-8">
          {/* Wordmark — always returns to hero of home page */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="col-span-6 md:col-span-3 flex items-center gap-2 sm:gap-3 group"
            aria-label="Julian Mercier — home"
          >
            <Image
              src="/logos/mark-cream.png"
              alt="Julian Mercier mark"
              width={64}
              height={64}
              priority
              className="h-6 sm:h-7 w-auto"
            />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase whitespace-nowrap">
              Julian Mercier
            </span>
          </Link>

          {/* Clock — desktop centered, hidden on mobile */}
          <div className="hidden md:flex col-span-5 justify-center">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-linen/70">
              {now} · Ubud
            </span>
          </div>

          {/* Hamburger — present on every viewport, every page */}
          <div className="col-span-6 md:col-span-4 flex items-center justify-end">
            <button
              ref={burgerRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 -mr-2 group"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-6 md:w-7 bg-linen transition-all duration-500 ease-out ${
                  menuOpen
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-[5px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-6 md:w-7 bg-linen transition-all duration-300 ease-out ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-6 md:w-7 bg-linen transition-all duration-500 ease-out ${
                  menuOpen
                    ? "-rotate-45 translate-y-0"
                    : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        origin={origin}
      />
    </>
  );
}
