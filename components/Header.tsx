"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "@/components/MobileMenu";
import { scrollToHero } from "@/lib/scrollToHero";

// Nav links shown across the header at the very top of the page (before any
// scroll). Once the user scrolls, these fade out and the hamburger takes
// over.
const NAV_LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [now, setNow] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | undefined>();
  const lastScrollRef = useRef(0);
  const pathname = usePathname();

  // True only at the very top of the page. Drives the cross-fade between
  // the inline nav links and the hamburger.
  const isAtTop = scrollY < 6;
  // On every page except home, jump straight to hamburger mode — the inline
  // nav only makes sense above the home hero.
  const showInlineNav = isAtTop && pathname === "/";

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

          {/* Right cluster — inline nav links (at top of home) cross-fade
              with the hamburger. Hamburger always visible on mobile.
              `relative` so the absolutely-positioned hamburger overlays
              this cluster instead of consuming a flex slot — that lets the
              nav links extend flush to the cluster's right edge (= page's
              right padding line) when the hamburger is hidden. */}
          <div className="col-span-6 md:col-span-4 relative flex items-center justify-end gap-6 md:gap-8">
            {/* Inline nav — fades in only at the very top of the home page,
                fades out (with pointer-events disabled) once the user scrolls. */}
            <nav
              aria-hidden={!showInlineNav}
              className={`hidden lg:flex items-center gap-7 xl:gap-9 font-mono text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 ease-out ${
                showInlineNav
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-linen hover:text-linen/60 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <button
              ref={burgerRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={toggleMenu}
              aria-hidden={showInlineNav && !menuOpen}
              className={`absolute right-[-8px] top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 cursor-pointer group transition-opacity duration-300 ease-out ${
                showInlineNav
                  ? "lg:opacity-0 lg:pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              {/* Subtle hover ring so the affordance is visible even when
                  the bars themselves are static. */}
              <span
                aria-hidden
                className="absolute inset-1 rounded-full bg-linen/0 group-hover:bg-linen/10 transition-colors duration-300"
              />
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-6 md:w-7 bg-linen transition-all duration-500 ease-out ${
                  menuOpen
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-[5px] group-hover:-translate-y-[6px]"
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
                    : "translate-y-[5px] group-hover:translate-y-[6px]"
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
