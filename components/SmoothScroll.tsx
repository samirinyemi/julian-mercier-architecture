"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";

/**
 * Buttery smooth scrolling, site-wide, with full GSAP ScrollTrigger sync.
 *
 * Without this sync, ScrollTrigger reads the native scrollY (which Lenis is
 * busy interpolating) — that disagreement is what makes scrubbed timelines
 * stutter. Pinning + scrubbing only feel right when ScrollTrigger updates on
 * the same RAF tick that Lenis is driving.
 *
 * Route-change behavior: every forward navigation snaps Lenis (and the
 * native scroll) back to 0. Without this, revisiting a project page leaves
 * the user wherever they were last time on that page, which feels broken.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      // Slightly longer duration + softer easing = effortless wheel feel
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.085,
    });

    // Expose the instance globally so anywhere in the app can request a
    // smooth scroll (e.g. logo-click → hero) without prop-drilling a ref.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    // Make ScrollTrigger fire on every Lenis frame — eliminates scrub lag.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so all motion stays on a single clock.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Some pinned sections need their measurements re-computed once Lenis
    // is wired in (their initial measurement happened before this sync).
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(onTick);
      const w = window as Window & { __lenis?: Lenis };
      if (w.__lenis === lenis) delete w.__lenis;
      lenis.destroy();
    };
  }, []);

  // Reset scroll to the top on every route change. Lenis caches its own
  // animatedScroll independent of the document scroll, so we have to reset
  // both. The morph navigation in lib/projectMorph.ts already does this
  // before triggering router.push, so by the time this effect fires the
  // scroll is usually already at 0 — this is a defensive double-check.
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }, [pathname]);

  return null;
}
