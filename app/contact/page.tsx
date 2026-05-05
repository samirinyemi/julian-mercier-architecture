import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Julian Mercier",
  description:
    "Project enquiries, press, and general contact for Julian Mercier studio.",
};

const BLOCKS = [
  {
    label: "Project enquiries",
    blurb: "For new commissions and architect-developer collaborations.",
    email: "projects@mercier.studio",
  },
  {
    label: "Press",
    blurb: "For interviews, features, and image requests.",
    email: "press@mercier.studio",
  },
  {
    label: "General",
    blurb: "For everything else.",
    email: "hello@mercier.studio",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* HEADER */}
      <section className="px-4 md:px-8 pt-40 pb-24">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
          <Reveal className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-6">Reach</p>
            <h1 className="text-display-xl leading-[0.85] tracking-[-0.05em] font-medium text-ink">
              contact
            </h1>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 md:pb-6" stagger={1}>
            <p className="text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.6] text-graphite max-w-[40ch]">
              The studio takes on a small number of projects each year. Enquiries
              are read by Julian directly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THREE BLOCKS */}
      <section className="px-4 md:px-8 pb-24">
        <div className="border-t border-olive/30">
          {BLOCKS.map((b, i) => (
            <Reveal
              key={b.label}
              className="border-b border-olive/30 py-12 md:py-16 group"
              stagger={((i % 3) + 1) as 1 | 2 | 3}
            >
              <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-baseline">
                <span className="col-span-12 md:col-span-3 eyebrow">
                  {b.label.toUpperCase()}
                </span>
                <p className="col-span-12 md:col-span-5 text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-[1.6] text-graphite max-w-[40ch]">
                  {b.blurb}
                </p>
                <a
                  href={`mailto:${b.email}`}
                  className="col-span-12 md:col-span-4 group/link inline-flex items-baseline justify-start md:justify-end gap-3 text-[clamp(1.25rem,2vw,1.875rem)] tracking-[-0.015em] font-medium text-ink hover:text-graphite transition-colors"
                >
                  {b.email}
                  <span className="text-base text-olive transition-transform duration-300 group-hover/link:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOCATIONS + SOCIAL */}
      <section className="px-4 md:px-8 pb-32">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
          <Reveal className="col-span-12 md:col-span-6">
            <p className="eyebrow mb-4">Locations</p>
            <p className="text-display-md leading-[0.95] tracking-[-0.04em] font-medium text-ink">
              Lisbon
              <br />
              Bali
            </p>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-6 md:text-right" stagger={1}>
            <p className="eyebrow mb-4">Elsewhere</p>
            <a
              href="https://instagram.com/julian.mercier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-headline font-medium tracking-[-0.02em] text-ink hover:text-graphite transition-colors inline-flex items-baseline gap-3 group"
            >
              @julian.mercier
              <span className="text-sm text-olive transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
