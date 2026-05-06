"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";
import { CTA } from "@/components/CTA";
import { HeroColumnReveal } from "@/components/HeroColumnReveal";

/**
 * Static hero image with editorial overlay.
 *
 * Both mobile and desktop expose a bone-framed thumbnail that loops the
 * first ~3 seconds of the video. Tapping it opens a full-screen overlay
 * where the same MP4 plays end-to-end with native controls. Closes on X,
 * backdrop tap, or Escape.
 */
export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);

  const LOOP_END_SEC = 3.0;

  // Constrain every mini-video (mobile + desktop variants) to the first
  // LOOP_END_SEC seconds. We can't share a single ref across two elements,
  // so we collect them via the data attribute.
  useEffect(() => {
    const sec = root.current;
    if (!sec) return;
    const minis = sec.querySelectorAll<HTMLVideoElement>("[data-mini-video]");
    const handlers = new Map<HTMLVideoElement, () => void>();
    minis.forEach((v) => {
      const onTime = () => {
        if (v.currentTime >= LOOP_END_SEC) v.currentTime = 0;
      };
      v.addEventListener("timeupdate", onTime);
      handlers.set(v, onTime);
    });
    return () => {
      handlers.forEach((h, v) => v.removeEventListener("timeupdate", h));
    };
  }, []);

  // Custom "Play" cursor when hovering the desktop mini-video.
  // Uses GSAP's quickTo for low-latency, smooth interpolation.
  // Skipped on touch / coarse pointer devices.
  useEffect(() => {
    const cursor = cursorRef.current;
    const trigger = desktopVideoRef.current;
    if (!cursor || !trigger) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const { gsap } = getGsap();

    // Center the cursor on its own midpoint and start hidden.
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });

    // quickTo gives us snappy, premium follow with no manual ticker bookkeeping.
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "expo.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "expo.out" });

    let active = false;

    const onEnter = (e: PointerEvent) => {
      active = true;
      // Snap to current pointer (no animation) so the cursor appears exactly
      // where the mouse is, then run the regular animated follow.
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      active = false;
      gsap.to(cursor, {
        scale: 0.7,
        opacity: 0,
        duration: 0.25,
        ease: "expo.in",
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      if (!active) return;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    trigger.addEventListener("pointerenter", onEnter);
    trigger.addEventListener("pointerleave", onLeave);
    // Listen on the trigger itself so we always get pointermove events even
    // when something else covers the cursor element.
    trigger.addEventListener("pointermove", onMove, { passive: true });
    // Also listen on window so the cursor keeps tracking if the pointer moves
    // out of the trigger but onLeave hasn't fired yet (edge case on fast moves).
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      trigger.removeEventListener("pointerenter", onEnter);
      trigger.removeEventListener("pointerleave", onLeave);
      trigger.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // When the overlay opens, hide the custom cursor immediately so it
  // doesn't linger on top of the fullscreen video.
  useEffect(() => {
    if (!expanded) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const { gsap } = getGsap();
    gsap.to(cursor, {
      scale: 0.6,
      opacity: 0,
      duration: 0.2,
      ease: "expo.in",
      overwrite: true,
    });
  }, [expanded]);

  // Body scroll lock + ESC while expanded
  useEffect(() => {
    if (!expanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  // Animate the overlay open/close + reset full video to start on each open.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const { gsap } = getGsap();
    const reduced = !canAnimate();
    const fullV = fullVideoRef.current;

    if (expanded) {
      if (fullV) {
        try {
          fullV.currentTime = 0;
          fullV.play().catch(() => {});
        } catch {
          /* ignore */
        }
      }
      if (reduced) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(overlay.querySelector(".hero-fullvideo-wrap"), {
          scale: 1,
          y: 0,
        });
        return;
      }
      gsap.killTweensOf([overlay, overlay.querySelector(".hero-fullvideo-wrap")]);
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: EASE.out }
      );
      gsap.fromTo(
        overlay.querySelector(".hero-fullvideo-wrap"),
        { scale: 0.92, y: 16 },
        { scale: 1, y: 0, duration: 0.7, ease: EASE.expo }
      );
    } else {
      gsap.killTweensOf([overlay, overlay.querySelector(".hero-fullvideo-wrap")]);
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.3,
        ease: EASE.out,
        onComplete: () => {
          if (fullV) fullV.pause();
        },
      });
    }
  }, [expanded]);

  // Entrance animations — delayed so they begin as the column reveal finishes
  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      // Delay matches the column reveal duration (~1.66s).
      const tl = gsap.timeline({ defaults: { ease: EASE.out }, delay: 1.55 });

      tl.from(".hero-image-wrap", {
        scale: 1.04,
        duration: 1.4,
        ease: EASE.expo,
      });

      tl.from(
        ".hero-marquee-card",
        { yPercent: 100, opacity: 0, duration: 1.1, ease: EASE.expo },
        0.25
      );

      tl.from(
        ".hero-tag-line",
        { y: 18, opacity: 0, duration: 0.9, stagger: 0.12, ease: EASE.out },
        0.7
      );

      tl.from(
        ".hero-meta-item",
        { y: 14, opacity: 0, duration: 0.9, stagger: 0.14, ease: EASE.out },
        0.95
      );

      tl.from(
        ".hero-inset-video",
        {
          y: 24,
          opacity: 0,
          scale: 0.96,
          duration: 1.0,
          ease: EASE.expo,
        },
        0.85
      );

      tl.from(
        ".hero-cta",
        { y: 18, opacity: 0, duration: 0.9, stagger: 0.12, ease: EASE.out },
        1.15
      );

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={root}
        className="relative w-full overflow-hidden bg-sage h-[100vh] min-h-[640px] md:min-h-[820px]"
      >
        {/* Column reveal — overlays everything until the strips slide down */}
        <HeroColumnReveal />
        <div className="hero-image-wrap absolute inset-0 will-change-transform">
          <Image
            src="/hero/hero.png"
            alt="Amara Villa, Ubud — exterior at first light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Mobile: stronger gradient at the top so meta tags + 2025 row read
              cleanly against any hero image. Fades to transparent past mid. */}
          <div
            aria-hidden
            className="absolute inset-0 md:hidden bg-gradient-to-b from-ink/70 via-ink/40 via-30% to-transparent to-65% pointer-events-none"
          />

          {/* Desktop: gentler full-height gradient */}
          <div
            aria-hidden
            className="absolute inset-0 hidden md:block bg-gradient-to-b from-ink/20 via-transparent to-ink/40 pointer-events-none"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between text-linen px-4 sm:px-6 md:px-[clamp(2rem,3.2vw,3.5rem)] pb-[clamp(7rem,11vw,11rem)] pt-[clamp(5rem,8vw,9rem)]">
          <div aria-hidden className="flex-shrink-0" />

          <div className="flex flex-col gap-[clamp(20px,4vw,56px)] mt-[clamp(16px,4vw,72px)] hero-fade">
            {/* TAGS + DESKTOP-ONLY VIDEO */}
            <div className="flex items-end justify-between gap-6 text-[clamp(0.8125rem,1.1vw,1.0625rem)] leading-[1.5]">
              <div className="flex flex-col">
                <span className="hero-tag-line will-change-transform">Hospitality</span>
                <span className="hero-tag-line will-change-transform">Branding</span>
                <span className="hero-tag-line will-change-transform">Website</span>
              </div>

              {/* Desktop mini-video — custom Play cursor on hover, no chip */}
              <button
                ref={desktopVideoRef}
                type="button"
                onClick={() => setExpanded(true)}
                aria-label="Watch full video"
                className="hero-inset-video hidden md:block bg-bone p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] hover:shadow-[0_32px_90px_-22px_rgba(0,0,0,0.7)] transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.02] will-change-transform shrink-0 group/desk md:cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
              >
                <div className="relative aspect-[3/2] w-[clamp(220px,26vw,420px)] overflow-hidden bg-ink/40">
                  <video
                    data-mini-video
                    src="/hero/hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/desk:scale-[1.04]"
                  />
                  {/* Subtle ink veil on hover — pulls focus to the cursor */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-ink/0 group-hover/desk:bg-ink/20 transition-colors duration-500 pointer-events-none"
                  />
                </div>
              </button>
            </div>

            {/* META row */}
            <div className="flex items-center justify-between gap-6 text-[clamp(0.8125rem,1.1vw,1.0625rem)]">
              <span className="hero-meta-item will-change-transform">
                Creative Direction &amp; Visual Identity
              </span>
              <span className="hero-meta-item will-change-transform">2025</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 hero-fade">
            {/* Mobile mini-video — small thumbnail, loops first 3s, tap to expand */}
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Watch full video"
              className="hero-inset-video md:hidden bg-bone p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] will-change-transform self-start group/mini focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
            >
              <div className="relative aspect-[3/2] w-[clamp(200px,52vw,280px)] overflow-hidden bg-ink/40">
                <video
                  data-mini-video
                  src="/hero/hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Play/expand cue — fades in lightly so it doesn't hide the video */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-end justify-end p-2 pointer-events-none"
                >
                  <span className="inline-flex items-center gap-1.5 bg-ink/55 text-linen font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-1 rounded-full backdrop-blur-sm transition-transform duration-500 ease-out group-hover/mini:translate-y-[-2px]">
                    Watch ↗
                  </span>
                </span>
              </div>
            </button>

            {/* CTA row — sits above the marquee card with breathing room */}
            <div className="flex flex-row items-center gap-3 self-end md:self-end">
              <CTA href="/projects" variant="linen" className="hero-cta">
                View projects
              </CTA>
              <CTA href="/contact" variant="outline-linen" className="hero-cta">
                Let&apos;s chat
              </CTA>
            </div>
          </div>
        </div>

        {/* MARQUEE CARD — single-line, right-to-left, pinned to the very bottom
            of the hero. Bone card with 16px (p-4) internal padding. The H1
            "Amara Villa." now lives here, repeated as a continuous editorial
            ticker. Decoupled from the padded overlay above so it's full-bleed. */}
        <div className="hero-marquee-card absolute inset-x-0 bottom-0 z-10 will-change-transform">
          <div className="bg-bone text-ink p-4 overflow-hidden">
            <div
              aria-hidden
              className="flex items-center whitespace-nowrap font-bold tracking-[-0.04em] leading-none text-[clamp(2.5rem,8vw,7rem)] hero-marquee-track"
            >
              {/* Two passes side-by-side; the keyframe translates -50% so the
                  loop is seamless (the second copy lands where the first started). */}
              {[0, 1].map((pass) => (
                <span key={pass} className="flex items-center shrink-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="flex items-center shrink-0">
                      <span className="px-6 md:px-10">Amara Villa.</span>
                      <span aria-hidden className="text-olive text-[0.5em] translate-y-[-0.05em]">●</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
            {/* Screen-reader-only project name (the marquee above is aria-hidden) */}
            <h1 className="sr-only">Amara Villa.</h1>
          </div>
        </div>
      </section>

      {/* Custom "Play" cursor — desktop only.
          Solid brand-color pill (linen → ink text). Follows the mouse via a
          per-frame lerp on the GSAP ticker for snappy, premium feel. */}
      <div
        ref={cursorRef}
        aria-hidden
        className="hidden md:flex fixed top-0 left-0 z-[75] pointer-events-none w-[84px] h-[84px] rounded-full bg-linen text-ink items-center justify-center font-mono text-[11px] tracking-[0.22em] uppercase shadow-[0_16px_36px_-10px_rgba(0,0,0,0.45)] will-change-transform"
      >
        <span className="inline-flex items-center gap-1">
          Play
          <span aria-hidden className="translate-y-[-1px]">▸</span>
        </span>
      </div>

      {/* Expanded full-screen video overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-sm flex items-center justify-center px-4 py-10"
        style={{ visibility: "hidden", opacity: 0 }}
        onClick={(e) => {
          // Backdrop tap closes (but not clicks on the video itself)
          if (e.target === e.currentTarget) setExpanded(false);
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Hero video, fullscreen"
        aria-hidden={!expanded}
      >
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label="Close video"
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-linen/10 hover:bg-linen/20 transition-colors text-linen flex items-center justify-center backdrop-blur-md border border-linen/15"
        >
          <span aria-hidden className="text-2xl leading-none">×</span>
        </button>

        <div className="hero-fullvideo-wrap relative w-full max-w-[1200px] aspect-[3/2] bg-ink overflow-hidden rounded-[12px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
          <video
            ref={fullVideoRef}
            src="/hero/hero.mp4"
            playsInline
            controls
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
