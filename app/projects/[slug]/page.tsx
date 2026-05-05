import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProjectDetailIntro } from "@/components/ProjectDetailIntro";
import { HeroColumnReveal } from "@/components/HeroColumnReveal";
import { projects, getProject, getAdjacentProjects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project — Julian Mercier" };
  return {
    title: `${p.name} — Julian Mercier`,
    description: p.lead,
  };
}

export default async function ProjectDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <ProjectDetailIntro />

      {/* HERO */}
      <section
        className="relative h-[100vh] min-h-[560px] md:min-h-[700px] w-full overflow-hidden bg-sage"
        style={{ viewTransitionName: `project-hero-${project.slug}` }}
      >
        <HeroColumnReveal />
        <div className="pd-hero-image absolute inset-0 will-change-transform">
          <Image
            src={project.hero}
            alt={`${project.name} — hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent pointer-events-none" />

        <div className="pd-hero-meta absolute top-20 md:top-28 left-5 md:left-8 z-10 text-linen/80 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
          {project.internalCode}
        </div>
        <div className="pd-hero-meta absolute top-20 md:top-28 right-5 md:right-8 z-10 text-right text-linen/80 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
          {project.location}
          <br />
          {project.typology} · {project.year}
        </div>

        <h1 className="absolute left-5 right-5 md:left-8 md:right-8 bottom-10 md:bottom-12 z-10 text-linen leading-[0.85] tracking-[-0.05em] font-medium text-[clamp(3rem,12vw,12rem)]">
          <span className="overflow-hidden block pb-[0.04em] will-change-transform">
            <span className="pd-hero-title-line block">{project.name}.</span>
          </span>
        </h1>
      </section>

      {/* METADATA STRIP */}
      <section className="px-4 md:px-8 py-12 border-b border-olive/30">
        <div className="pd-meta-row grid grid-cols-12 gap-x-3 gap-y-8 md:gap-8 items-baseline">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Location</p>
            <p className="mt-2 text-ink">{project.location}</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow">Typology</p>
            <p className="mt-2 text-ink">{project.typology}</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow">Year</p>
            <p className="mt-2 text-ink">{project.year}</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow">Size</p>
            <p className="mt-2 text-ink">{project.size}</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow">Code</p>
            <p className="mt-2 text-ink font-mono">{project.internalCode}</p>
          </div>
        </div>
      </section>

      {/* LEAD */}
      <section className="px-4 md:px-8 py-32 md:py-48">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow">Lead</p>
          </Reveal>
          <Reveal
            className="col-span-12 md:col-span-8 md:col-start-5"
            stagger={1}
          >
            <p className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.35] tracking-[-0.015em] text-ink max-w-[28ch]">
              {project.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* BODY ESSAY */}
      <section className="px-4 md:px-8 pb-32 md:pb-48">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow">Essay</p>
          </Reveal>
          <div className="col-span-12 md:col-span-7 md:col-start-5 space-y-6">
            {project.body.map((p, i) => (
              <Reveal key={i} stagger={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <p className="text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-[1.7] text-graphite max-w-[58ch]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO ESSAY */}
      {project.photoEssay.length > 0 && (
        <section className="bg-bone py-32 md:py-48">
          <div className="px-4 md:px-8 grid grid-cols-12 gap-y-8 md:gap-8 mb-16">
            <Reveal className="col-span-12 md:col-span-4">
              <p className="eyebrow">Photo Essay</p>
              <h2 className="mt-4 text-display-md leading-[0.95] tracking-[-0.04em] text-ink font-medium">
                The
                <br />
                building
                <br />
                in pieces.
              </h2>
            </Reveal>
          </div>

          {/* Mixed-aspect grid */}
          <div className="px-4 md:px-8 grid grid-cols-12 gap-y-12 md:gap-x-8">
            {project.photoEssay.map((img, i) => {
              // Editorial offset rhythm: 0=full, 1=col6, 2=col6, 3=full, 4=col5offset, 5=col6
              const span =
                i === 0 || i === 3
                  ? "col-span-12"
                  : i === 4
                  ? "col-span-12 md:col-span-7 md:col-start-2"
                  : i === 5
                  ? "col-span-12 md:col-span-5 md:col-start-8"
                  : "col-span-12 md:col-span-6";
              return (
                <Reveal
                  key={i}
                  className={span}
                  stagger={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <figure>
                    <div
                      className={`relative w-full bg-sage overflow-hidden ${
                        img.aspect === "16:9"
                          ? "aspect-[16/9]"
                          : img.aspect === "4:5"
                          ? "aspect-[4/5]"
                          : img.aspect === "3:2"
                          ? "aspect-[3/2]"
                          : "aspect-square"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/85 mix-blend-difference">
                        Image 0{i + 1}
                      </span>
                    </div>
                    <figcaption className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-olive max-w-[60ch]">
                      {img.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* MATERIALS */}
      <section className="px-4 md:px-8 py-32 md:py-48">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow">Materials</p>
            <p className="mt-4 text-graphite max-w-[28ch] leading-[1.6]">
              Specified by source, not by category.
            </p>
          </Reveal>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <ul className="divide-y divide-olive/25">
              {project.materials.map((m, i) => (
                <Reveal
                  key={m.label}
                  as="li"
                  className="grid grid-cols-12 gap-4 py-6 items-baseline"
                  stagger={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <span className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.16em] uppercase text-olive">
                    {m.label}
                  </span>
                  <span className="col-span-12 md:col-span-9 text-ink leading-[1.5]">
                    {m.value}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CREDITS */}
      <section className="px-4 md:px-8 pb-32">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow">Credits</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-8 md:col-start-5" stagger={1}>
            <p className="text-graphite leading-[1.7] max-w-[60ch]">
              {project.credits}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PAGINATION */}
      <section className="border-t border-olive/30 px-4 md:px-8 py-12 grid grid-cols-12 gap-4">
        <Link
          href={`/projects/${prev.slug}`}
          className="col-span-6 group flex flex-col"
        >
          <span className="eyebrow">← Previous</span>
          <span className="mt-2 text-headline font-medium leading-[1.1] group-hover:text-graphite transition-colors">
            {prev.name}
          </span>
          <span className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
            {prev.location}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="col-span-6 group flex flex-col items-end text-right"
        >
          <span className="eyebrow">Next →</span>
          <span className="mt-2 text-headline font-medium leading-[1.1] group-hover:text-graphite transition-colors">
            {next.name}
          </span>
          <span className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
            {next.location}
          </span>
        </Link>
      </section>
    </>
  );
}
