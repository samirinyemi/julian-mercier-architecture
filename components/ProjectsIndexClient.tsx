"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { REGIONS, type Project, type Region } from "@/lib/projects";
import { navigateWithMorph } from "@/lib/projectMorph";
import { getGsap, canAnimate } from "@/lib/gsap";

type FilterValue = "All" | Region;
type Mode = "flow" | "shown" | "hidden";

type Props = { projects: Project[] };

export function ProjectsIndexClient({ projects }: Props) {
  const [active, setActive] = useState<FilterValue>("All");
  const router = useRouter();
  const filterWrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("flow");
  const [filterHeight, setFilterHeight] = useState(0);

  const filtered = useMemo(
    () =>
      active === "All" ? projects : projects.filter((p) => p.region === active),
    [projects, active]
  );

  const counts = useMemo(() => {
    const acc: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      acc[p.region] = (acc[p.region] || 0) + 1;
    });
    return acc;
  }, [projects]);

  // Measure filter height on mount and on resize so the spacer matches.
  useEffect(() => {
    const el = filterWrapRef.current;
    if (!el) return;
    const measure = () => setFilterHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mode logic: track filter natural position and scroll direction.
  useEffect(() => {
    const el = filterWrapRef.current;
    if (!el) return;

    let lastY = window.scrollY;
    // Capture filter's flow-position once. When mode flips, the element is
    // fixed-positioned (not in flow) — so use a stored reference.
    let flowEnd = el.offsetTop + el.offsetHeight;

    const refresh = () => {
      // When in flow mode, recapture the position (e.g., on resize)
      if (mode === "flow") flowEnd = el.offsetTop + el.offsetHeight;
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 4) return;

      if (y < flowEnd) {
        setMode("flow");
      } else if (delta > 0) {
        setMode("hidden");
      } else {
        setMode("shown");
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [mode]);

  // Card → detail morph (see lib/projectMorph.ts for full explanation)
  const handleCardClick = (
    e: React.MouseEvent,
    href: string,
    slug: string
  ) => {
    navigateWithMorph(router, href, slug, e);
  };

  // Scroll parallax — each project card translates Y at its own speed as the
  // user scrolls. Left-column cards drift gently; right-column cards drift
  // more, creating the staggered "different-speed" feel the design calls for.
  // Disabled on touch / coarse pointer devices and when reduced-motion is set.
  useEffect(() => {
    if (!canAnimate()) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const { gsap, ScrollTrigger } = getGsap();
    const cards = document.querySelectorAll<HTMLElement>(".project-parallax");
    if (!cards.length) return;

    const tweens: gsap.core.Tween[] = [];
    cards.forEach((card) => {
      const side = card.dataset.parallaxSide; // "left" | "right"
      // Range of total y-translation across the trigger window.
      // Right cards move ~1.6× more than left → parallax differential.
      const range = side === "right" ? 90 : 55;
      const tw = gsap.fromTo(
        card,
        { y: range / 2 },
        {
          y: -range / 2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      tweens.push(tw);
    });

    // After the filter changes the grid, ScrollTrigger needs to refresh
    // so new card positions register correctly.
    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill();
        tw.kill();
      });
    };
  }, [filtered.length]); // re-bind after filter changes the rendered set

  // Filter row content (single source of truth)
  const filterContent = (
    <div className="border-y border-olive/30 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
      {REGIONS.map((r) => {
        const isActive = active === r;
        const count = counts[r] || 0;
        return (
          <button
            key={r}
            type="button"
            onClick={() => setActive(r as FilterValue)}
            className={`font-mono text-[11px] tracking-[0.18em] uppercase relative group transition-colors inline-flex items-baseline gap-1.5 ${
              isActive ? "text-ink" : "text-olive hover:text-ink"
            }`}
          >
            {r}
            <span className="text-[9px] text-olive/70">
              {String(count).padStart(2, "0")}
            </span>
            <span
              className={`absolute -bottom-2 left-0 h-[1px] bg-ink transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        );
      })}
      <span className="ml-auto font-mono text-[11px] tracking-[0.18em] uppercase text-olive">
        {String(filtered.length).padStart(2, "0")} results
      </span>
    </div>
  );

  return (
    <>
      {/* HEADER BAND */}
      <section className="px-4 md:px-8 pt-40 pb-24">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
          <Reveal className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-6">Index · 2022 — 2025</p>
            <h1 className="text-display-xl leading-[0.85] tracking-[-0.05em] font-medium text-ink">
              projects
            </h1>
          </Reveal>
          <Reveal
            className="col-span-12 md:col-span-4 md:col-start-9 md:pb-6"
            stagger={1}
          >
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] text-graphite max-w-[40ch]">
              Built and unbuilt. {projects.length} projects across five
              geographies.
              <br />
              The full archive is available on request.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTER — single element, conditionally floats. A height-matched
          spacer fills the document gap when the filter is detached from flow. */}
      {mode !== "flow" && (
        <div
          aria-hidden
          style={{ height: filterHeight }}
          className="pb-16 px-4 md:px-8 invisible"
        />
      )}
      <div
        ref={filterWrapRef}
        className={
          mode === "flow"
            ? "px-4 md:px-8 pb-16"
            : `fixed top-[72px] left-0 right-0 z-30 bg-linen px-4 md:px-8 transition-transform duration-300 ease-out ${
                mode === "shown" ? "translate-y-0" : "-translate-y-[110%]"
              }`
        }
      >
        {filterContent}
      </div>

      {/* PROJECT GRID */}
      <section className="px-4 md:px-8 pb-32">
        <div className="grid grid-cols-12 gap-y-32 md:gap-x-8">
          {filtered.map((p, i) => {
            const isLeft = i % 2 === 0;
            const slugTag = `project-hero-${p.slug}`;
            return (
              <Reveal
                key={p.slug}
                className={`col-span-12 md:col-span-6 ${
                  isLeft ? "md:pr-8" : "md:pl-8 md:pt-32"
                } group`}
                stagger={((i % 3) + 1) as 1 | 2 | 3}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  prefetch
                  onClick={(e) => handleCardClick(e, `/projects/${p.slug}`, p.slug)}
                  onMouseEnter={() => router.prefetch(`/projects/${p.slug}`)}
                  className="block project-parallax will-change-transform"
                  data-parallax-side={isLeft ? "left" : "right"}
                >
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden bg-sage"
                    style={{ viewTransitionName: slugTag }}
                  >
                    <Image
                      src={p.thumb}
                      alt={`${p.name} — ${p.location}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/80 mix-blend-difference">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(filtered.length).padStart(2, "0")}
                    </span>
                    <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/80 mix-blend-difference">
                      {p.year}
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-4 items-start">
                    <h2 className="col-span-7 text-headline font-medium leading-[1.05] tracking-[-0.02em]">
                      {p.name}
                    </h2>
                    <p className="col-span-5 font-mono text-[11px] tracking-[0.14em] uppercase text-olive text-right pt-3">
                      {p.location}
                      <br />
                      {p.typology}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-olive">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase">
              No projects in {active}
            </p>
            <button
              onClick={() => setActive("All")}
              className="mt-4 underline-offset-4 hover:underline text-ink"
            >
              View all projects
            </button>
          </div>
        )}
      </section>

      {/* CLOSING */}
      <section className="px-4 md:px-8 pb-32">
        <div className="border-t border-olive/30 pt-12">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-olive">
            End of index · For unpublished work, write to{" "}
            <a
              href="mailto:projects@mercier.studio"
              className="text-ink hover:text-graphite transition-colors"
            >
              projects@mercier.studio
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
