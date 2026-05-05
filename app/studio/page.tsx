import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Studio — Julian Mercier",
  description:
    "An architect-developer practice. Founder-led. Lisbon and Bali.",
};

export default function StudioPage() {
  return (
    <>
      {/* DARK COLOR-BLOCK HERO */}
      <section className="bg-ink text-linen pt-40 pb-32 px-4 md:px-8">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow text-linen/60">Studio</p>
          </Reveal>
          <Reveal
            className="col-span-12 md:col-span-9 md:col-start-4"
            stagger={1}
          >
            <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[1.05] tracking-[-0.025em] font-medium max-w-[18ch]">
              Julian Mercier grew up in real estate.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* BODY ESSAY */}
      <section className="px-4 md:px-8 py-32 md:py-48">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow">Origin</p>
          </Reveal>
          <div className="col-span-12 md:col-span-7 md:col-start-5 space-y-8">
            {[
              "His family — French in origin, settled across two continents — built developments. He saw, from the inside, how the industry actually works. The speed, the compromises, the materials that lie about what they are. The veneer pretending to be hardwood. The cement render pretending to be stone.",
              "The surname carries its own quiet declaration. Mercier — French for merchant — was the trade name his ancestors took when they built the first warehouses for shipping families along the Atlantic. The family has been in the business of building, and selling what is built, for a long time.",
              "After architecture school and years inside major firms, Julian started his own practice — not as an outsider to development, but as an insider who knew exactly what he was rebelling against.",
              "The studio is founder-led by design. Every project gets Julian's eye. Materials are sourced honestly, used honestly, and allowed to age honestly. There is no signature style. There is only a signature method: listen to the place, respect the material, take the time it takes.",
              "Some buildings are commissioned by clients. Others are conceived, developed, and sold by the studio itself. The architect-developer model lets the practice take risks others can't, with a finished building as the proof.",
            ].map((p, i) => (
              <Reveal key={i} stagger={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <p className="text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-[1.7] text-graphite max-w-[58ch]">
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal stagger={2}>
              <p className="text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.4] tracking-[-0.015em] text-ink font-medium max-w-[22ch] mt-8">
                The work is quiet. It is meant to be.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PORTRAIT-IMAGE BAND */}
      <section className="bg-bone px-4 md:px-8 py-24">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end">
          <Reveal className="col-span-12 md:col-span-7 md:col-start-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sage">
              <Image
                src="/images/image-04-interior-double-height.jpg"
                alt="Studio interior — workplace"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-linen/85 mix-blend-difference">
                Image 11
              </span>
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-olive">
              The Lisbon studio · 2024
            </p>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-3 md:pb-12" stagger={2}>
            <p className="eyebrow mb-4">Locations</p>
            <p className="text-headline leading-[1.1] tracking-[-0.02em] font-medium text-ink">
              Lisbon
              <br />
              Bali
            </p>
          </Reveal>
        </div>
      </section>

      {/* METHOD */}
      <section className="px-4 md:px-8 py-32 md:py-48">
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          <Reveal className="col-span-12 md:col-span-12">
            <div className="border-t border-olive/30 mb-8" />
            <p className="eyebrow">Section II</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9" stagger={1}>
            <h2 className="text-display-lg leading-[0.9] tracking-[-0.04em] font-medium text-ink mt-4">
              Method.
            </h2>
          </Reveal>

          <div className="col-span-12 md:col-span-7 md:col-start-5 space-y-6 mt-12">
            {[
              "The studio takes on a small number of projects each year. Each begins with the site, not the brief — three days walking the land before the first sketch.",
              "Materials are specified by source, not by category. The studio knows the quarry, the mill, the maker. When a substitute is offered to save cost or time, the answer is usually no.",
              "The studio holds an equity position in approximately half of its projects. The architect-developer model is what makes this practice viable, and what makes the work honest.",
            ].map((p, i) => (
              <Reveal key={i} stagger={((i % 3) + 1) as 1 | 2 | 3}>
                <p className="text-[clamp(1.0625rem,1.25vw,1.25rem)] leading-[1.7] text-graphite max-w-[58ch]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
