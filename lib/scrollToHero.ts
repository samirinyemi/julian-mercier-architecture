/**
 * Buttery smooth scroll back to the top of the page (hero section).
 *
 * Uses the global Lenis instance when present (see SmoothScroll.tsx) so the
 * scroll matches the rest of the site's wheel feel. Falls back to native
 * smooth scroll for reduced-motion users (where Lenis isn't initialised).
 */
type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    opts?: {
      duration?: number;
      easing?: (t: number) => number;
      offset?: number;
    }
  ) => void;
};

export function scrollToHero(duration = 1.2) {
  if (typeof window === "undefined") return;
  const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
