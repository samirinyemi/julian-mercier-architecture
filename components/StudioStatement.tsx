"use client";

import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

export function StudioStatement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const items = root.current?.querySelectorAll<HTMLElement>(".s-line");
      if (!items?.length) return;
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: EASE.out,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-4 md:px-8 py-32 md:py-48">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="s-line eyebrow">Studio</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-5 space-y-8">
          <p className="s-line text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.5] tracking-[-0.01em] text-ink">
            Julian Mercier is an architect-developer practice. The studio
            designs and develops residences, hospitality, and retreats in
            select places around the world.
          </p>
          <p className="s-line text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.5] tracking-[-0.01em] text-ink">
            The work is bound by a single conviction —
            <span className="text-olive">
              {" "}
              that materials should never lie about what they are.
            </span>
          </p>
          <p className="s-line text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.7] text-graphite max-w-[58ch]">
            The practice is founder-led. Every project carries Julian&apos;s eye
            from concept through construction. Some buildings are commissioned.
            Others are conceived and developed by the studio itself. Either
            way, the method is the same: listen to the place, respect the
            material, take the time it takes.
          </p>
        </div>
      </div>
    </section>
  );
}
