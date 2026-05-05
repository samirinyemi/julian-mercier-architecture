"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

const NAV = [
  { label: "Projects", href: "/projects", num: "01" },
  { label: "Studio", href: "/studio", num: "02" },
  { label: "Journal", href: "/journal", num: "03" },
  { label: "Contact", href: "/contact", num: "04" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  origin?: { x: number; y: number };
};

/**
 * Full-viewport menu overlay.
 *
 * - Solid ink background (no shader)
 * - Content is anchored to the TOP, sitting just below the header
 * - Reveal: clip-path circle expands from the burger button
 * - Foreground: large nav links with a per-line mask reveal
 * - Esc closes; body scroll locks while open
 */
export function MobileMenu({ open, onClose, origin }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Open / close animation
  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;

    const reduced = !canAnimate();
    const { gsap } = getGsap();

    const ox = origin?.x ?? window.innerWidth - 48;
    const oy = origin?.y ?? 36;
    const maxR = Math.hypot(
      Math.max(ox, window.innerWidth - ox),
      Math.max(oy, window.innerHeight - oy)
    );

    const linkInners = ".menu-link-row .menu-link-inner";
    const linkNums = ".menu-link-row .menu-link-num";
    const metaLines = ".menu-meta-line";
    const linkDividers = ".menu-link-divider";

    if (open) {
      root.style.pointerEvents = "auto";
      root.setAttribute("aria-hidden", "false");

      gsap.killTweensOf([panel, linkInners, linkNums, metaLines, linkDividers]);

      // Reset to fully visible — defends against the close animation having
      // left these at opacity 0 / off-screen positions.
      gsap.set([linkInners], { yPercent: 0, opacity: 1, y: 0 });
      gsap.set([linkNums, metaLines], { opacity: 1, x: 0, y: 0 });
      gsap.set(linkDividers, { scaleX: 1, opacity: 1 });

      if (reduced) {
        gsap.set(panel, { clipPath: "circle(150% at 50% 50%)" });
        return;
      }

      gsap.set(panel, {
        clipPath: `circle(0px at ${ox}px ${oy}px)`,
      });

      const tl = gsap.timeline();
      tl.to(panel, {
        clipPath: `circle(${Math.ceil(maxR + 40)}px at ${ox}px ${oy}px)`,
        duration: 0.95,
        ease: "expo.out",
      })
        .from(
          linkInners,
          {
            yPercent: 110,
            duration: 0.95,
            stagger: 0.07,
            ease: EASE.expo,
          },
          0.25
        )
        .from(
          linkNums,
          {
            opacity: 0,
            x: -10,
            duration: 0.6,
            stagger: 0.07,
            ease: EASE.out,
          },
          0.35
        )
        .from(
          metaLines,
          {
            opacity: 0,
            y: 14,
            duration: 0.6,
            stagger: 0.06,
            ease: EASE.out,
          },
          0.5
        )
        .from(
          linkDividers,
          {
            scaleX: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: EASE.expo,
          },
          0.3
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          root.style.pointerEvents = "none";
          root.setAttribute("aria-hidden", "true");
        },
      });
      tl.to([linkInners, linkNums, metaLines, linkDividers], {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: EASE.out,
      }).to(
        panel,
        {
          clipPath: `circle(0px at ${ox}px ${oy}px)`,
          duration: 0.6,
          ease: "expo.in",
        },
        "<0.05"
      );
    }
  }, [open, origin]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60]"
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Site navigation"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-ink overflow-hidden"
        style={{
          clipPath: "circle(0px at 100% 0%)",
        }}
      >
        {/* Content — anchored to the TOP, with the contact block pushed to bottom via mt-auto */}
        <div className="relative h-full w-full text-linen flex flex-col px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 pb-10 md:pb-14">
          {/* Top meta — sits just under the header */}
          <div className="flex justify-between items-start text-linen/70 mb-10 sm:mb-12 md:mb-16">
            <span className="menu-meta-line font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
              Menu — Julian Mercier
            </span>
            <span className="menu-meta-line font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-right">
              MMXXII / Lisbon · Bali
            </span>
          </div>

          {/* Nav — starts right after the top meta */}
          <nav>
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li
                  key={item.href}
                  className="menu-link-row group relative"
                >
                  {/* Animated divider — scales from left edge in unison with the link reveal */}
                  <span
                    aria-hidden
                    className="menu-link-divider absolute bottom-0 left-0 right-0 h-px bg-linen/15 origin-left"
                  />
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 sm:gap-8 py-4 sm:py-5 md:py-6 transition-transform duration-700 ease-out hover:translate-x-2"
                  >
                    <span className="menu-link-num font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-linen/50 w-8 shrink-0">
                      {item.num}
                    </span>
                    <span className="overflow-hidden block flex-1">
                      <span className="menu-link-inner block leading-[0.95] tracking-[-0.03em] font-medium text-[clamp(2.75rem,10vw,7rem)]">
                        {item.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="hidden sm:inline-block text-linen/40 text-2xl transition-all duration-500 ease-out group-hover:text-linen group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — anchored to the bottom of the panel */}
          <div className="mt-auto pt-10 flex flex-col-reverse sm:flex-row gap-5 sm:gap-8 sm:items-end sm:justify-between">
            <span className="menu-meta-line font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-linen/60">
              Begin a project
            </span>
            <a
              href="mailto:projects@mercier.studio"
              className="menu-meta-line text-[clamp(1.125rem,2.4vw,1.875rem)] tracking-[-0.015em] font-medium border-b border-linen/30 pb-1 hover:border-linen transition-colors w-fit"
            >
              projects@mercier.studio
            </a>
            <span className="menu-meta-line font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-linen/50">
              @julian.mercier
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
