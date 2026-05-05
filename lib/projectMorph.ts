/**
 * Page transition: full-viewport ink dissolve.
 *
 * 1. Click → fade an ink panel up over the page (~350 ms)
 * 2. Once the page is fully covered, snap scroll to 0 and `router.push()`
 * 3. Hold for a short beat so the new page can render its first paint
 * 4. Fade the ink panel back out (~500 ms), revealing the new page
 *
 * Total perceived transition: ~1.0 s. Reliable in Next 16 / React 19,
 * works in every browser, doesn't fight RSC navigation timing.
 */

import { getGsap } from "./gsap";

type Router = {
  push: (href: string) => void;
  prefetch: (href: string) => void;
};

type LenisLike = {
  scrollTo: (
    target: number,
    opts?: { immediate?: boolean; force?: boolean }
  ) => void;
};

export function navigateWithMorph(
  router: Router,
  href: string,
  _slug: string,
  e?: React.MouseEvent
): boolean {
  if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) {
    return false;
  }
  if (typeof document === "undefined") return false;

  if (e) e.preventDefault();
  router.prefetch(href);

  // Build the dissolve overlay.
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    backgroundColor: "#1f1d1b", // ink
    zIndex: "90",
    pointerEvents: "none",
    opacity: "0",
    willChange: "opacity",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(overlay);

  const { gsap } = getGsap();

  // Phase 1: fade ink in until the page is fully covered.
  gsap.to(overlay, {
    opacity: 1,
    duration: 0.35,
    ease: "power2.inOut",
    onComplete: () => {
      // Reset scroll while covered so the new page lands on its hero.
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Trigger navigation (RSC commit happens during the hold below).
      router.push(href);

      // Phase 2: brief hold + dissolve out to reveal the new page.
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        delay: 0.15,
        ease: "power2.inOut",
        onComplete: () => overlay.remove(),
      });
    },
  });

  return true;
}
