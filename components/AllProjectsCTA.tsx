"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

/**
 * Full-width sage band — the entire section is the click target,
 * leading to /projects.
 */
export function AllProjectsCTA() {
  const root = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const lines = root.current?.querySelectorAll<HTMLElement>(".apc-line");
      if (lines?.length) {
        gsap.from(lines, {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.1,
          ease: EASE.expo,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      }

      const eyebrow = root.current?.querySelector(".apc-eyebrow");
      if (eyebrow) {
        gsap.from(eyebrow, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          delay: 0.2,
          ease: EASE.out,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      }

      // Magnetic arrow — pointer movement tracked across the whole section
      const sec = root.current;
      const arrow = arrowRef.current;
      if (sec && arrow) {
        const onMove = (e: PointerEvent) => {
          const rect = sec.getBoundingClientRect();
          // Translate scaled by pointer position (relative to section center)
          const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
          const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(arrow, {
            x: xRatio * 36,
            y: yRatio * 24,
            duration: 0.6,
            ease: EASE.out,
          });
        };
        const onLeave = () => {
          gsap.to(arrow, { x: 0, y: 0, duration: 0.5, ease: EASE.out });
        };
        sec.addEventListener("pointermove", onMove);
        sec.addEventListener("pointerleave", onLeave);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-sage text-ink py-32 md:py-48 px-4 md:px-8 overflow-hidden group transition-colors duration-500 ease-out hover:bg-[#bfc4af]"
    >
      {/* Whole-section click target */}
      <Link
        href="/projects"
        aria-label="All projects"
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
      />

      <div className="relative grid grid-cols-12 gap-y-8 md:gap-8 items-end pointer-events-none">
        <div className="col-span-12 md:col-span-3">
          <p className="apc-eyebrow eyebrow text-graphite/80">Index</p>
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-graphite mt-3">
            06 / 06
            <br />
            Built &amp; unbuilt
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <span className="inline-flex items-end gap-6 text-ink transition-transform duration-500 ease-out group-hover:translate-x-2">
            <span className="text-[clamp(3rem,9vw,9rem)] leading-[1.05] tracking-[-0.04em] font-medium">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="apc-line block">All projects</span>
              </span>
            </span>
            <span
              ref={arrowRef}
              className="apc-arrow text-[clamp(2.5rem,6vw,6rem)] tracking-tight will-change-transform pb-[0.18em]"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
