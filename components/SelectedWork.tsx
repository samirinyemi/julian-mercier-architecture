"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";
import { navigateWithMorph } from "@/lib/projectMorph";

/**
 * Four distinct editorial showcases — one per featured project — built
 * to match the inspiration references the user provided. Each card uses
 * its own composition. GSAP animations are scroll-triggered.
 */
export function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();

  // Card → detail morph (see lib/projectMorph.ts for full explanation)
  const handleCardClick = (
    e: React.MouseEvent,
    href: string,
    slug: string
  ) => {
    navigateWithMorph(router, href, slug, e);
  };

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      // Section intro headline — line-by-line mask reveal
      const introLines = root.current?.querySelectorAll<HTMLElement>(
        ".swk-intro-line"
      );
      if (introLines?.length) {
        gsap.from(introLines, {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.12,
          ease: EASE.expo,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      }

      const sections = root.current?.querySelectorAll<HTMLElement>(".swk-section");
      if (!sections) return;

      // === Per-section reveals ===
      sections.forEach((sec) => {
        const reveals = sec.querySelectorAll<HTMLElement>(".swk-reveal");
        if (reveals.length) {
          gsap.from(reveals, {
            y: 32,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: EASE.out,
            scrollTrigger: { trigger: sec, start: "top 75%", once: true },
          });
        }

        const titleLines = sec.querySelectorAll<HTMLElement>(".swk-title-line");
        if (titleLines.length) {
          gsap.from(titleLines, {
            yPercent: 105,
            duration: 1.2,
            stagger: 0.1,
            ease: EASE.expo,
            scrollTrigger: { trigger: sec, start: "top 70%", once: true },
          });
        }

        const imgs = sec.querySelectorAll<HTMLElement>(".swk-img");
        imgs.forEach((wrap) => {
          const inner = wrap.querySelector<HTMLElement>(".swk-img-inner");
          if (!inner) return;
          gsap.from(inner, {
            scale: 1.04,
            opacity: 0.6,
            duration: 1.2,
            ease: EASE.out,
            scrollTrigger: { trigger: wrap, start: "top 90%", once: true },
          });
        });
      });

      // === Stacked-deck depth toggling ===
      // When card N+1 reaches its sticky position, ALL prior cards (0..N)
      // get pushed one level deeper in the stack. data-stack-depth drives
      // a progressive scale + blur in CSS.
      const bumpDepth = (el: HTMLElement, delta: number) => {
        const cur = parseInt(el.dataset.stackDepth || "0", 10);
        el.dataset.stackDepth = String(Math.max(0, cur + delta));
      };
      sections.forEach((sec, i) => {
        if (i === 0) return; // card 1 has no trigger that fires for it
        const computedTop = parseInt(getComputedStyle(sec).top || "0", 10) || 0;
        ScrollTrigger.create({
          trigger: sec,
          start: `top top+=${computedTop + 4}`,
          end: "bottom top",
          onEnter: () => {
            for (let k = 0; k < i; k++) bumpDepth(sections[k], +1);
          },
          onLeaveBack: () => {
            for (let k = 0; k < i; k++) bumpDepth(sections[k], -1);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative">
      {/* SECTION INTRO */}
      <div className="px-4 md:px-8 pt-32 md:pt-48 pb-24">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
          <div className="col-span-12 md:col-span-3 swk-reveal">
            <p className="eyebrow">Selected Work · 2022 — 2025</p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-olive">
              04 of 06
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <h2 className="text-display-md leading-[1.05] tracking-[-0.04em] font-medium text-ink max-w-[18ch]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="swk-intro-line block">Four buildings.</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="swk-intro-line block">Four conversations</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="swk-intro-line block">with their place.</span>
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* ===========================================================
          PROJECT 01 — Amara Villa
          Full-bleed image with content overlay (mirrors Project 2 exactly).
         =========================================================== */}
      <article className="swk-section sticky top-0 bg-ink text-linen min-h-[640px] md:h-[85vh] group overflow-hidden">
        <Link
          href="/projects/amara-villa"
          prefetch
          onClick={(e) => handleCardClick(e, "/projects/amara-villa", "amara-villa")}
          aria-label="Open project — Amara Villa"
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
        />
        <div className="swk-img absolute inset-0 pointer-events-none">
          <div
            className="swk-img-inner absolute inset-0"
            style={{ viewTransitionName: "project-hero-amara-villa" }}
          >
            <Image
              src="/images/image-01-home-hero.jpg"
              alt="Amara Villa — exterior at first light"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        {/* Top header row */}
        <div className="relative grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 py-8 border-b border-linen/15 pointer-events-none">
          <span className="col-span-3 font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            ☰ &nbsp; Project 01
          </span>
          <span className="col-span-6 text-center font-mono text-[11px] tracking-[0.22em] uppercase text-linen swk-reveal">
            Amara Villa
          </span>
          <span className="col-span-3 text-right font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            Ubud, Bali · 2023
          </span>
        </div>

        {/* Centered cinematic title */}
        <div className="relative px-4 md:px-8 pt-32 md:pt-40 pb-16 text-center pointer-events-none">
          <h3 className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[1.1] tracking-[0.12em] font-medium text-linen overflow-hidden">
            <span className="block overflow-hidden">
              <span className="swk-title-line block">AMARA &nbsp; VILLA</span>
            </span>
          </h3>
        </div>

        {/* Booking-form-style details band */}
        <div className="relative px-4 md:px-8 pb-8 flex justify-center pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 items-stretch md:items-center bg-linen/5 backdrop-blur-md border border-linen/15 rounded-[24px] md:rounded-full md:px-2 md:py-3 max-w-3xl w-full swk-reveal">
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Typology</p>
              <p className="mt-1 text-linen text-sm">Residence</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Region</p>
              <p className="mt-1 text-linen text-sm">Ubud, Bali</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Year</p>
              <p className="mt-1 text-linen text-sm">2023</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Size</p>
              <p className="mt-1 text-linen text-sm">740 m²</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full px-5 py-4 md:py-0 md:px-2 flex justify-center md:justify-end">
              <span className="bg-linen text-ink rounded-full px-5 py-3.5 md:px-4 md:py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-2 group-hover:bg-sage">
                View Project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </div>

      </article>

      {/* ===========================================================
          PROJECT 02 — Selva House  (Grand Emily Hotel hero layout)
          Whole card is a single link to the project page.
         =========================================================== */}
      <article className="swk-section sticky top-[80px] bg-ink text-linen min-h-[640px] md:h-[85vh] overflow-hidden group">
        <Link
          href="/projects/selva-house"
          prefetch
          onClick={(e) => handleCardClick(e, "/projects/selva-house", "selva-house")}
          aria-label="Open project — Selva House"
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
        />
        <div className="swk-img absolute inset-0 pointer-events-none">
          <div
            className="swk-img-inner absolute inset-0"
            style={{ viewTransitionName: "project-hero-selva-house" }}
          >
            <Image
              src="/images/image-07-slatted-wood-facade.jpg"
              alt="Selva House — exterior"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        {/* Top header row */}
        <div className="relative grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 py-8 border-b border-linen/15 pointer-events-none">
          <span className="col-span-3 font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            ☰ &nbsp; Project 02
          </span>
          <span className="col-span-6 text-center font-mono text-[11px] tracking-[0.22em] uppercase text-linen swk-reveal">
            Selva House
          </span>
          <span className="col-span-3 text-right font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            Costa Rica · 2024
          </span>
        </div>

        {/* Centered cinematic title */}
        <div className="relative px-4 md:px-8 pt-32 md:pt-40 pb-16 text-center pointer-events-none">
          <h3 className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[1.1] tracking-[0.12em] font-medium text-linen overflow-hidden">
            <span className="block overflow-hidden">
              <span className="swk-title-line block">SELVA &nbsp; HOUSE</span>
            </span>
          </h3>
        </div>

        {/* Booking-form-style details band — visual only, card-level link handles nav */}
        <div className="relative px-4 md:px-8 pb-8 flex justify-center pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 items-stretch md:items-center bg-linen/5 backdrop-blur-md border border-linen/15 rounded-[24px] md:rounded-full md:px-2 md:py-3 max-w-3xl w-full swk-reveal">
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Typology</p>
              <p className="mt-1 text-linen text-sm">Residence</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Region</p>
              <p className="mt-1 text-linen text-sm">Nicoya Peninsula</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Year</p>
              <p className="mt-1 text-linen text-sm">2024</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Size</p>
              <p className="mt-1 text-linen text-sm">510 m²</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full px-5 py-4 md:py-0 md:px-2 flex justify-center md:justify-end">
              <span className="bg-linen text-ink rounded-full px-5 py-3.5 md:px-4 md:py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-2 group-hover:bg-sage">
                View Project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </div>

      </article>

      {/* ===========================================================
          PROJECT 03 — Mei Residence
          Full-bleed image with content overlay (mirrors Project 2 exactly).
         =========================================================== */}
      <article className="swk-section sticky top-[160px] bg-ink text-linen min-h-[640px] md:h-[85vh] group overflow-hidden">
        <Link
          href="/projects/mei-residence"
          prefetch
          onClick={(e) => handleCardClick(e, "/projects/mei-residence", "mei-residence")}
          aria-label="Open project — Mei Residence"
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
        />
        <div className="swk-img absolute inset-0 pointer-events-none">
          <div
            className="swk-img-inner absolute inset-0"
            style={{ viewTransitionName: "project-hero-mei-residence" }}
          >
            <Image
              src="/images/image-02-concrete-wood.jpg"
              alt="Mei Residence — Aoyama facade"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        {/* Top header row */}
        <div className="relative grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 py-8 border-b border-linen/15 pointer-events-none">
          <span className="col-span-3 font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            ☰ &nbsp; Project 03
          </span>
          <span className="col-span-6 text-center font-mono text-[11px] tracking-[0.22em] uppercase text-linen swk-reveal">
            Mei Residence
          </span>
          <span className="col-span-3 text-right font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            Tokyo · 2024
          </span>
        </div>

        {/* Centered cinematic title */}
        <div className="relative px-4 md:px-8 pt-32 md:pt-40 pb-16 text-center pointer-events-none">
          <h3 className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[1.1] tracking-[0.12em] font-medium text-linen overflow-hidden">
            <span className="block overflow-hidden">
              <span className="swk-title-line block">MEI &nbsp; RESIDENCE</span>
            </span>
          </h3>
        </div>

        {/* Booking-form-style details band */}
        <div className="relative px-4 md:px-8 pb-8 flex justify-center pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 items-stretch md:items-center bg-linen/5 backdrop-blur-md border border-linen/15 rounded-[24px] md:rounded-full md:px-2 md:py-3 max-w-3xl w-full swk-reveal">
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Typology</p>
              <p className="mt-1 text-linen text-sm">Townhouse</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Region</p>
              <p className="mt-1 text-linen text-sm">Aoyama, Tokyo</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Year</p>
              <p className="mt-1 text-linen text-sm">2024</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Size</p>
              <p className="mt-1 text-linen text-sm">195 m²</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full px-5 py-4 md:py-0 md:px-2 flex justify-center md:justify-end">
              <span className="bg-linen text-ink rounded-full px-5 py-3.5 md:px-4 md:py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-2 group-hover:bg-sage">
                View Project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </div>

      </article>

      {/* ===========================================================
          PROJECT 04 — Atlas House
          Last card — NOT sticky, scrolls past everything else.
         =========================================================== */}
      <article className="swk-section relative bg-ink text-linen min-h-[640px] md:h-[85vh] group overflow-hidden">
        <Link
          href="/projects/atlas-house"
          prefetch
          onClick={(e) => handleCardClick(e, "/projects/atlas-house", "atlas-house")}
          aria-label="Open project — Atlas House"
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-linen"
        />
        <div className="swk-img absolute inset-0 pointer-events-none">
          <div
            className="swk-img-inner absolute inset-0"
            style={{ viewTransitionName: "project-hero-atlas-house" }}
          >
            <Image
              src="/images/image-03-mediterranean-stone.jpg"
              alt="Atlas House — exterior"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>

        {/* Top header row */}
        <div className="relative grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 py-8 border-b border-linen/15 pointer-events-none">
          <span className="col-span-3 font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            ☰ &nbsp; Project 04
          </span>
          <span className="col-span-6 text-center font-mono text-[11px] tracking-[0.22em] uppercase text-linen swk-reveal">
            Atlas House
          </span>
          <span className="col-span-3 text-right font-mono text-[11px] tracking-[0.18em] uppercase text-linen/85 swk-reveal">
            Marrakech · 2023
          </span>
        </div>

        {/* Centered cinematic title */}
        <div className="relative px-4 md:px-8 pt-32 md:pt-40 pb-16 text-center pointer-events-none">
          <h3 className="text-[clamp(2.5rem,6.4vw,6rem)] leading-[1.1] tracking-[0.12em] font-medium text-linen overflow-hidden">
            <span className="block overflow-hidden">
              <span className="swk-title-line block">ATLAS &nbsp; HOUSE</span>
            </span>
          </h3>
        </div>

        {/* Booking-form-style details band */}
        <div className="relative px-4 md:px-8 pb-8 flex justify-center pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 items-stretch md:items-center bg-linen/5 backdrop-blur-md border border-linen/15 rounded-[24px] md:rounded-full md:px-2 md:py-3 max-w-3xl w-full swk-reveal">
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Typology</p>
              <p className="mt-1 text-linen text-sm">Residence</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Region</p>
              <p className="mt-1 text-linen text-sm">High Atlas, Marrakech</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-r border-b md:border-b-0 border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Year</p>
              <p className="mt-1 text-linen text-sm">2023</p>
            </div>
            <div className="w-full px-5 py-4 md:py-0 md:px-6 border-b md:border-b-0 md:border-r border-linen/15">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-linen/50">Size</p>
              <p className="mt-1 text-linen text-sm">620 m²</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full px-5 py-4 md:py-0 md:px-2 flex justify-center md:justify-end">
              <span className="bg-linen text-ink rounded-full px-5 py-3.5 md:px-4 md:py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-2 group-hover:bg-sage">
                View Project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </div>

      </article>
    </section>
  );
}
