"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";
import { journalEntries } from "@/lib/journal";

export function JournalTeaser() {
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

      const rows = root.current?.querySelectorAll<HTMLElement>(".journal-row");
      if (!rows?.length) return;
      gsap.from(rows, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: EASE.out,
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
    <section ref={root} className="px-4 md:px-8 py-32 md:py-48">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8 mb-12 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow mb-4">Journal · Field notes</p>
          <h2 className="text-display-md leading-[1.05] tracking-[-0.04em] font-medium text-ink">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="heading-line block">Notes on materials,</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="heading-line block">methods, and decisions</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="heading-line block">made along the way.</span>
            </span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 md:pb-2 md:text-right">
          <Link
            href="/journal"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink inline-flex items-center gap-2 group"
          >
            All entries
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="border-t border-olive/30">
        {journalEntries.map((e, i) => (
          <Link
            key={e.slug}
            href={`/journal/${e.slug}`}
            className="journal-row block group border-b border-olive/30 py-10 md:py-14 transition-colors hover:bg-bone/40"
          >
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
              <span className="col-span-8 md:col-span-2 eyebrow">
                {e.date.toUpperCase()}
              </span>
              <span className="col-span-4 md:col-span-1 font-mono text-[11px] tracking-[0.18em] uppercase text-olive md:text-left text-right">
                0{i + 1}
              </span>
              <h3 className="col-span-12 md:col-span-5 text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink group-hover:translate-x-2 transition-transform duration-500 ease-out">
                {e.title}
              </h3>
              <p className="col-span-12 md:col-span-3 text-graphite leading-[1.6] max-w-[34ch]">
                {e.teaser}
              </p>
              <span className="hidden md:inline-block col-span-1 text-2xl text-olive group-hover:text-ink group-hover:translate-x-2 transition-all duration-500 ease-out text-right">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
