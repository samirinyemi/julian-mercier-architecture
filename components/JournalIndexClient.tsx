"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { HeroColumnReveal } from "@/components/HeroColumnReveal";
import type { JournalEntry } from "@/lib/journal";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

type Props = { entries: JournalEntry[] };

export function JournalIndexClient({ entries }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const el = previewRef.current;
    if (!el) return;

    let rafId: number;
    const update = () => {
      gsap.to(el, {
        x: cursorRef.current.x,
        y: cursorRef.current.y,
        duration: 0.6,
        ease: EASE.out,
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Floating preview — follows the cursor; only visible when hovering an entry */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          activeIdx === null ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative w-[clamp(220px,26vw,420px)] aspect-[4/5] overflow-hidden bg-sage">
          {entries.map((e, i) => (
            <div
              key={e.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeIdx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={e.cover}
                alt=""
                fill
                sizes="(min-width: 768px) 26vw, 60vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-ink text-linen">
        <HeroColumnReveal />
        <Image
          src="/images/image-02-concrete-wood.jpg"
          alt="Journal — field notes"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70 pointer-events-none" />
        <div className="relative h-full grid grid-cols-12 gap-y-8 md:gap-8 px-4 md:px-8 pt-40 md:pt-48 pb-12 items-end">
          <Reveal className="col-span-12 md:col-span-6">
            <p className="eyebrow text-linen/70">Field notes</p>
            <h1 className="mt-4 text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] tracking-[-0.04em] font-medium text-linen">
              journal
            </h1>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 md:pb-4" stagger={1}>
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] text-linen/85 max-w-[40ch]">
              Notes on materials, methods, and decisions made along the way.
              Seven entries; more on the way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ENTRY LIST */}
      <section className="px-4 md:px-8 py-24 md:py-32">
        <div className="border-t border-olive/30">
          {entries.map((entry, i) => (
            <Reveal
              key={entry.slug}
              className="block"
              stagger={((i % 3) + 1) as 1 | 2 | 3}
            >
              <Link
                href={`/journal/${entry.slug}`}
                onPointerEnter={() => setActiveIdx(i)}
                onPointerLeave={() => setActiveIdx(null)}
                className="block group relative border-b border-olive/30 py-10 md:py-14 transition-colors hover:bg-bone/30"
              >
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
                  <span className="col-span-8 md:col-span-2 eyebrow">
                    {entry.date.toUpperCase()}
                  </span>
                  <span className="col-span-4 md:col-span-1 font-mono text-[11px] tracking-[0.18em] uppercase text-olive text-right md:text-left">
                    0{i + 1}
                  </span>
                  <h2 className="col-span-12 md:col-span-5 text-[clamp(1.75rem,3vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {entry.title}
                  </h2>
                  <p className="col-span-12 md:col-span-3 text-graphite leading-[1.6] max-w-[34ch]">
                    {entry.teaser}
                  </p>
                  <span className="col-span-12 md:col-span-1 flex md:justify-end mt-2 md:mt-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-olive/40 text-olive transition-all duration-500 ease-out group-hover:border-ink group-hover:bg-ink group-hover:text-linen group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-olive">
            {String(entries.length).padStart(2, "0")} entries · More on the way
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-olive">
            Updated quarterly
          </p>
        </div>
      </section>
    </>
  );
}
