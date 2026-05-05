"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

const STATS = [
  { num: 12, label: "Years in practice", suffix: "" },
  { num: 6, label: "Buildings completed", suffix: "" },
  { num: 4, label: "Geographies", suffix: "" },
  { num: 48, label: "Collaborators", suffix: "" },
] as const;

export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const numEls = root.current?.querySelectorAll<HTMLElement>(
        "[data-num]"
      );
      if (!numEls?.length) return;

      ScrollTrigger.batch(numEls, {
        once: true,
        start: "top 85%",
        onEnter: (els) => {
          els.forEach((rawEl) => {
            const el = rawEl as HTMLElement;
            const target = parseInt(el.dataset.num || "0", 10);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: EASE.out,
              onUpdate: () => {
                el.textContent = String(Math.floor(obj.v)).padStart(2, "0");
              },
            });
          });
        },
      });

      gsap.from(root.current?.querySelectorAll(".num-row")!, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="bg-ink text-linen py-32 md:py-48 px-4 md:px-8 overflow-hidden"
    >
      <div className="grid grid-cols-12 gap-y-8 md:gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-linen/60">In numbers</p>
          <p className="mt-4 text-graphite-300 text-graphite hidden" />
          <p className="mt-3 text-[clamp(1rem,1.1vw,1.125rem)] leading-[1.6] text-linen/70 max-w-[34ch]">
            A small practice that has stayed small on purpose.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <ul className="divide-y divide-linen/15">
            {STATS.map((s, i) => (
              <li
                key={s.label}
                className="num-row grid grid-cols-12 gap-4 items-baseline py-6 md:py-8"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.18em] uppercase text-linen/40">
                  0{i + 1}
                </span>
                <span
                  data-num={s.num}
                  className="col-span-3 md:col-span-3 font-medium text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.04em]"
                >
                  00
                </span>
                <span className="col-span-7 md:col-span-8 md:pl-6 text-[clamp(1rem,1.2vw,1.25rem)] text-linen/80">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
