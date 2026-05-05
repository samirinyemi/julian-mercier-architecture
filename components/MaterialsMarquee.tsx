"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate } from "@/lib/gsap";

const MATERIALS = [
  "Lime Plaster",
  "Pale Oak",
  "Bronze",
  "Travertine",
  "Board-Formed Concrete",
  "Rammed Earth",
  "Volcanic Stone",
  "Cedar",
  "Standing-Seam Zinc",
  "Tadelakt",
  "Linen",
  "Andesite",
];

/**
 * Continuous horizontal marquee. Drifts on idle; speeds up subtly with scroll velocity.
 */
export function MaterialsMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const tracks = root.current?.querySelectorAll<HTMLElement>(
        "[data-marquee-track]"
      );
      if (!tracks?.length) return;

      tracks.forEach((track) => {
        // Track is duplicated content; loop -50% so the first copy slides in seamlessly.
        // Base duration 120s (half the prior 60s — slower idle).
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 120,
          ease: "none",
          repeat: -1,
        });

        // Velocity + direction coupling:
        //   scrolling down  → marquee runs forward (left), faster
        //   idle            → marquee runs forward at base speed
        //   scrolling up    → marquee reverses (right), faster
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const raw = self.getVelocity() / 1500;
            const v = Math.max(-4, Math.min(4, raw));
            const sign = v >= 0 ? 1 : -1;
            const speed = 1 + Math.abs(v); // 1× when idle, up to 5× at peak
            gsap.to(tween, {
              timeScale: sign * speed,
              duration: 0.4,
              overwrite: true,
            });
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const items = (
    <>
      {MATERIALS.map((m, i) => (
        <span
          key={i}
          className="inline-flex items-baseline gap-12 mr-12 whitespace-nowrap"
        >
          <span>{m}</span>
          <span className="text-olive/60 text-2xl translate-y-[-0.05em]">
            ✕
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-olive/30 bg-linen py-8 md:py-10"
    >
      <div
        data-marquee-track
        className="inline-flex whitespace-nowrap text-[clamp(2.25rem,5.2vw,5rem)] font-medium tracking-[-0.02em] leading-none text-ink will-change-transform"
        style={{ minWidth: "200%" }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}
