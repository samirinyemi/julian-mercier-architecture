"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getGsap, canAnimate } from "@/lib/gsap";
import { projects } from "@/lib/projects";

/**
 * Pinned section. As the user scrolls vertically, the project film-strip pans horizontally.
 */
export function HorizontalProjects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const trackEl = track.current;
      const rootEl = root.current;
      if (!trackEl || !rootEl) return;

      const update = () => {
        if (!trackEl || !rootEl) return;
        const distance = trackEl.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        gsap.to(trackEl, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${distance + 200}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      };

      // Wait for images to size correctly
      requestAnimationFrame(update);
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden bg-bone py-24 md:py-32"
    >
      {/* Section header */}
      <div className="px-4 md:px-8 mb-12 grid grid-cols-12 gap-y-8 md:gap-8">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow">Studio Reel · 06 buildings</p>
          <h2 className="mt-4 text-display-md leading-[0.95] tracking-[-0.04em] font-medium text-ink">
            Six projects.
            <br />
            Four geographies.
            <br />
            One conviction.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 md:pt-12">
          <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] text-graphite max-w-[58ch]">
            Pan through the studio&apos;s built and unbuilt work. Each is a particular
            response to a particular place — not a style applied to a site, but a
            building drawn from the ground it sits on.
          </p>
        </div>
      </div>

      {/* Pinned horizontal strip */}
      <div className="relative">
        <div
          ref={track}
          className="flex items-end gap-6 md:gap-10 will-change-transform pl-8 pr-32"
        >
          {projects.map((p, i) => {
            // Alternate sizes for editorial rhythm
            const size =
              i % 3 === 0
                ? "w-[70vw] md:w-[44vw] aspect-[3/4]"
                : i % 3 === 1
                ? "w-[80vw] md:w-[52vw] aspect-[4/3]"
                : "w-[65vw] md:w-[38vw] aspect-[3/4]";
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="shrink-0 group block"
              >
                <div className={`relative ${size} bg-sage overflow-hidden`}>
                  <Image
                    src={p.thumb}
                    alt={`${p.name} — ${p.location}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 80vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/85 mix-blend-difference">
                    0{i + 1} / 06
                  </span>
                  <span className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/85 mix-blend-difference">
                    {p.year}
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 max-w-[36rem]">
                  <h3 className="text-[clamp(1.25rem,1.8vw,1.75rem)] font-medium tracking-[-0.02em] leading-tight">
                    {p.name}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-olive shrink-0">
                    {p.location}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Closing slide — All projects link */}
          <Link
            href="/projects"
            className="shrink-0 group flex flex-col items-start gap-6 w-[60vw] md:w-[40vw] aspect-[4/5] bg-sage p-10 justify-between"
          >
            <span className="eyebrow text-graphite">End of reel</span>
            <span className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
              All
              <br />
              projects
              <span className="inline-block ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2">
                →
              </span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite">
              06 / 06
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
