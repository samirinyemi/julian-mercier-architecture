import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { journalEntries, getJournalEntry } from "@/lib/journal";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return journalEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = await params;
  const e = getJournalEntry(slug);
  if (!e) return { title: "Journal — Julian Mercier" };
  return {
    title: `${e.title} — Julian Mercier Journal`,
    description: e.teaser,
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const idx = journalEntries.findIndex((e) => e.slug === slug);
  const prev =
    idx > 0
      ? journalEntries[idx - 1]
      : journalEntries[journalEntries.length - 1];
  const next =
    idx < journalEntries.length - 1
      ? journalEntries[idx + 1]
      : journalEntries[0];

  // Pick a quiet image for mid-essay (rotate based on slug)
  const midImage =
    entry.slug === "on-plaster"
      ? "/images/image-02-concrete-wood.jpg"
      : entry.slug === "a-detail-from-tahir"
      ? "/images/image-06-white-villa-dusk.jpg"
      : "/images/image-03-mediterranean-stone.jpg";

  return (
    <>
      {/* TITLE BAND */}
      <section className="px-4 md:px-8 pt-40 pb-16">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-2">
            <p className="eyebrow">{entry.date}</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9 md:col-start-3" stagger={1}>
            <h1 className="text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.025em] font-medium text-ink max-w-[20ch]">
              {entry.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="px-4 md:px-8">
        <div className="border-t border-olive/30" />
      </div>

      {/* BODY */}
      <article className="px-4 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-2">
            <p className="eyebrow">Reading</p>
          </Reveal>
          <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-6">
            {entry.body.slice(0, Math.ceil(entry.body.length / 2)).map((p, i) => (
              <Reveal key={i} stagger={((i % 3) + 1) as 1 | 2 | 3}>
                <p className="text-[clamp(1.125rem,1.4vw,1.4375rem)] leading-[1.7] text-ink max-w-[60ch]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      {/* MID-ESSAY IMAGE */}
      <section className="bg-bone py-24">
        <div className="px-4 md:px-8 grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="relative w-full aspect-[16/9] bg-sage overflow-hidden">
              <Image
                src={midImage}
                alt={`${entry.title} — illustration`}
                fill
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/85 mix-blend-difference">
                Image · Field
              </span>
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-olive max-w-[60ch]">
              The wall, the hinge, the surface — the small thing that the essay
              actually concerns.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTINUED */}
      <article className="px-4 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-2">
            <p className="eyebrow">Continued</p>
          </Reveal>
          <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-6">
            {entry.body.slice(Math.ceil(entry.body.length / 2)).map((p, i) => (
              <Reveal key={i} stagger={((i % 3) + 1) as 1 | 2 | 3}>
                <p className="text-[clamp(1.125rem,1.4vw,1.4375rem)] leading-[1.7] text-ink max-w-[60ch]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      {/* PAGINATION */}
      <section className="border-t border-olive/30 px-4 md:px-8 py-12 grid grid-cols-12 gap-4">
        <Link
          href={`/journal/${prev.slug}`}
          className="col-span-6 group flex flex-col"
        >
          <span className="eyebrow">← Previous</span>
          <span className="mt-2 text-headline font-medium leading-[1.1] group-hover:text-graphite transition-colors max-w-[18ch]">
            {prev.title}
          </span>
          <span className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
            {prev.date}
          </span>
        </Link>
        <Link
          href={`/journal/${next.slug}`}
          className="col-span-6 group flex flex-col items-end text-right"
        >
          <span className="eyebrow">Next →</span>
          <span className="mt-2 text-headline font-medium leading-[1.1] group-hover:text-graphite transition-colors max-w-[18ch]">
            {next.title}
          </span>
          <span className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
            {next.date}
          </span>
        </Link>
      </section>
    </>
  );
}
