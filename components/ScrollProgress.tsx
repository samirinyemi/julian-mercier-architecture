"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate } from "@/lib/gsap";

/** Thin sage progress bar across the top of the page. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-linen/0 pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full bg-sage origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
