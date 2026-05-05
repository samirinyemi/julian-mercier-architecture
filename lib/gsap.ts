"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Idempotently register the ScrollTrigger plugin and return the gsap instance.
 * Call this from any client component before using gsap.context() or scrollTrigger.
 */
export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/**
 * Returns true if the user has not requested reduced motion.
 * Use to gate non-essential animations.
 */
export function canAnimate(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const EASE = {
  /** Smooth, refined deceleration */
  out: "power3.out",
  /** Confident, decisive */
  expo: "expo.out",
  /** Subtle for micro-interactions */
  quart: "power4.out",
  /** For exit / reset */
  inOut: "power2.inOut",
} as const;
