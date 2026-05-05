"use client";

import { useEffect } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

/**
 * Choreographed entrance for the project detail page.
 *
 * Each animation gets a +1.2s delay on top of its in-sequence offset so the
 * whole sequence begins as the HeroColumnReveal finishes its slide-down.
 *
 * Mounts client-side, runs once on mount. The order:
 *   1. Hero image: subtle scale settle (no opacity fade — column reveal handles that)
 *   2. Top meta strip (internal code + location/typology/year)
 *   3. Title: line-by-line mask reveal
 *   4. Metadata row below the hero
 *
 * Targets selectors rather than refs so the page can stay a server
 * component — we just sprinkle `.pd-*` classes on the markup.
 */
export function ProjectDetailIntro() {
  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();

    // Matches HeroColumnReveal total runtime; entrance begins as last
    // column finishes sliding away.
    const HOLD = 1.55;

    const ctx = gsap.context(() => {
      // 1. Hero image — settle from a slight scale-up. Column reveal handled
      //    the actual unveiling; this is just a quiet zoom-out for polish.
      gsap.from(".pd-hero-image", {
        scale: 1.04,
        duration: 1.4,
        ease: EASE.expo,
        delay: HOLD,
      });

      // 2. Top meta strip (internal code, location, typology, year)
      gsap.from(".pd-hero-meta", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        stagger: 0.12,
        ease: EASE.out,
        delay: HOLD + 0.1,
      });

      // 3. Title — mask reveal per line
      gsap.from(".pd-hero-title-line", {
        yPercent: 105,
        duration: 1.1,
        ease: EASE.expo,
        delay: HOLD + 0.25,
      });

      // 4. Metadata row below the hero
      gsap.from(".pd-meta-row > *", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: EASE.out,
        delay: HOLD + 0.55,
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
