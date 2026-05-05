import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center px-4 md:px-8 pt-40 pb-32">
      <div className="grid grid-cols-12 gap-y-8 md:gap-8 items-end w-full">
        <div className="col-span-12 md:col-span-2">
          <p className="eyebrow">404</p>
        </div>
        <div className="col-span-12 md:col-span-9 md:col-start-3">
          <h1 className="text-display-lg leading-[0.95] tracking-[-0.04em] font-medium text-ink max-w-[20ch]">
            This page does not exist.
          </h1>
          <p className="mt-8 text-[clamp(1.125rem,1.4vw,1.4375rem)] leading-[1.6] text-graphite max-w-[40ch]">
            Try{" "}
            <Link href="/projects" className="underline-offset-4 hover:underline">
              Projects
            </Link>
            ,{" "}
            <Link href="/studio" className="underline-offset-4 hover:underline">
              Studio
            </Link>
            , or{" "}
            <Link href="/journal" className="underline-offset-4 hover:underline">
              Journal
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
