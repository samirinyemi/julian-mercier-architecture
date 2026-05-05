"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Listen.",
    body:
      "Three days walking the land before the first sketch. The site speaks first; the brief speaks second.",
  },
  {
    n: "02",
    title: "Respect.",
    body:
      "Materials specified by source, not by category. The studio knows the quarry, the mill, the maker — and refuses substitutes.",
  },
  {
    n: "03",
    title: "Take the time.",
    body:
      "Two years is fast. Three years is normal. Four is sometimes right. The studio takes the time the building takes.",
  },
];

export function ProcessSteps() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      // Heading: line-by-line mask reveal
      const headingLines = root.current?.querySelectorAll<HTMLElement>(
        ".heading-line"
      );
      if (headingLines?.length) {
        gsap.from(headingLines, {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.12,
          ease: EASE.expo,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      }

      const rows = root.current?.querySelectorAll<HTMLElement>(".step-row");
      if (!rows?.length) return;

      rows.forEach((row, i) => {
        gsap.from(row.querySelector(".step-num"), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: EASE.expo,
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        gsap.from(row.querySelector(".step-title"), {
          y: 40,
          opacity: 0,
          duration: 1.1,
          delay: 0.05,
          ease: EASE.expo,
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        gsap.from(row.querySelector(".step-body"), {
          y: 24,
          opacity: 0,
          duration: 1,
          delay: 0.12,
          ease: EASE.out,
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
        gsap.from(row.querySelector(".step-rule"), {
          scaleX: 0,
          duration: 1.2,
          delay: 0.15,
          ease: EASE.expo,
          transformOrigin: "left center",
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-4 md:px-8 py-32 md:py-48">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8 mb-16">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow">Method</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-display-md leading-[1.05] tracking-[-0.04em] font-medium text-ink max-w-[18ch]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="heading-line block">Three rules.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="heading-line block">Held quietly.</span>
            </span>
          </h2>
        </div>
      </div>

      <ul>
        {STEPS.map((s) => (
          <li key={s.n} className="step-row py-12 md:py-16 grid grid-cols-12 gap-y-8 md:gap-8 items-baseline relative">
            <span className="step-rule absolute top-0 left-0 right-0 h-px bg-olive/40" />
            <span className="step-num col-span-12 md:col-span-2 font-mono text-[clamp(2rem,4vw,3.25rem)] leading-none text-olive">
              {s.n}
            </span>
            <h3 className="step-title col-span-12 md:col-span-4 text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em] font-medium text-ink">
              {s.title}
            </h3>
            <p className="step-body col-span-12 md:col-span-6 text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-[1.6] text-graphite max-w-[44ch]">
              {s.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
