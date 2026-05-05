"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

const LINES = [
  "Materials should",
  "never lie about",
  "what they are.",
];

export function ManifestoQuote() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const lines = root.current?.querySelectorAll<HTMLElement>(".m-line");
      if (!lines?.length) return;
      gsap.from(lines, {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.12,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });
      gsap.from(root.current?.querySelectorAll(".m-eyebrow")!, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        delay: 0.3,
        ease: EASE.out,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="bg-sage py-40 md:py-56 px-4 md:px-8 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
        <div className="col-span-12 md:col-span-2">
          <p className="m-eyebrow eyebrow text-graphite/80">Conviction</p>
        </div>
        <blockquote className="col-span-12 md:col-span-9">
          <div className="text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] tracking-[-0.035em] font-medium text-ink">
            {LINES.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span className="m-line block will-change-transform">{l}</span>
              </span>
            ))}
          </div>
          <p className="m-eyebrow eyebrow mt-12 text-graphite/80">
            — The studio&apos;s foundational belief
          </p>
        </blockquote>
      </div>
    </section>
  );
}
