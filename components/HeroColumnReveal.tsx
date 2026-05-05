"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate } from "@/lib/gsap";

type Props = {
  /** Number of vertical strips. Default 8. */
  columns?: number;
  /** Tailwind bg-* class for the mask. Default `bg-sage`. */
  maskColor?: string;
  /** Stagger between columns in seconds. Default 0.08. */
  stagger?: number;
  /** Duration of each column's slide. Default 1.1. */
  duration?: number;
};

/**
 * Hero column reveal — N vertical strips of a brand color overlay the hero,
 * then slide downward left-to-right with a tight stagger to expose the
 * image progressively. The photo never moves; only the masks retract, so
 * the eye reads it as a single image being unveiled, not as fragments
 * sliding into place.
 *
 * The total runtime with defaults is ~1.66s (1.1s per column + 0.08s × 7
 * stagger). All downstream entrance animations on the host should be
 * delayed by ~1.55s so they begin as the last column finishes.
 *
 * Reduced motion: the overlay is removed immediately, no slide animation.
 */
export function HeroColumnReveal({
  columns = 8,
  maskColor = "bg-sage",
  stagger = 0.08,
  duration = 1.1,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!canAnimate()) {
      // Reduced motion: skip the reveal entirely, hide the overlay.
      root.style.display = "none";
      return;
    }

    const { gsap } = getGsap();
    const strips = root.querySelectorAll<HTMLDivElement>(".hcr-strip");

    gsap.set(strips, { yPercent: 0 });
    gsap.to(strips, {
      yPercent: 100,
      duration,
      stagger,
      ease: "expo.out",
      onComplete: () => {
        // Remove from layout once the reveal is done — saves paint cost
        // and ensures the strips can't catch any pointer events.
        if (root) root.style.display = "none";
      },
    });
  }, [duration, stagger]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="absolute inset-0 z-40 flex pointer-events-none overflow-hidden"
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className={`hcr-strip flex-1 h-full ${maskColor} will-change-transform`}
        />
      ))}
    </div>
  );
}
