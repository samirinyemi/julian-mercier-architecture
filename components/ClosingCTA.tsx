"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

export function ClosingCTA() {
  const root = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const lines = root.current?.querySelectorAll<HTMLElement>(".cta-line");
      if (!lines?.length) return;
      gsap.from(lines, {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.12,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });

      // Magnetic effect on the CTA arrow
      const link = linkRef.current;
      if (link) {
        const arrow = link.querySelector<HTMLElement>(".cta-arrow");
        const onMove = (e: PointerEvent) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(arrow, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: EASE.out });
        };
        const onLeave = () => {
          gsap.to(arrow, { x: 0, y: 0, duration: 0.5, ease: EASE.out });
        };
        link.addEventListener("pointermove", onMove);
        link.addEventListener("pointerleave", onLeave);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-olive text-linen px-4 md:px-8 py-40 md:py-56 overflow-hidden">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="cta-line eyebrow text-linen/60">Begin a project</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-[clamp(3rem,8vw,9rem)] leading-[1.05] tracking-[-0.04em] font-medium">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cta-line block">Let&apos;s build</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="cta-line block">something quiet.</span>
            </span>
          </h2>

          <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <p className="cta-line text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] text-linen/70 max-w-[44ch]">
              The studio takes on a small number of projects each year.
              Enquiries are read by Julian directly.
            </p>
            <Link
              ref={linkRef}
              href="/contact"
              className="cta-line inline-flex items-baseline gap-4 group relative font-mono text-[clamp(1rem,1.2vw,1.25rem)] tracking-[0.02em]"
            >
              <span className="border-b border-linen/40 group-hover:border-linen pb-2 transition-colors duration-300">
                projects@mercier.studio
              </span>
              <span className="cta-arrow inline-block text-2xl will-change-transform">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
