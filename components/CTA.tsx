"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "linen" | "ink" | "outline-linen" | "outline-ink";

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

/**
 * Pill CTA with a filled dot on the left.
 * Hover: dot becomes hollow, text slides up with a clone replacing it,
 * arrow translates right.
 */
export function CTA({
  href,
  children,
  variant = "linen",
  external = false,
  className = "",
}: CTAProps) {
  const palette = {
    linen: {
      bg: "bg-linen text-ink",
      hover: "hover:bg-sage",
      dot: "border-ink bg-ink group-hover:bg-transparent",
    },
    ink: {
      bg: "bg-ink text-linen",
      hover: "hover:bg-graphite",
      dot: "border-linen bg-linen group-hover:bg-transparent",
    },
    "outline-linen": {
      bg: "border border-linen/40 text-linen",
      hover: "hover:bg-linen/10 hover:border-linen",
      dot: "border-linen bg-linen group-hover:bg-transparent",
    },
    "outline-ink": {
      bg: "border border-ink/40 text-ink",
      hover: "hover:bg-ink/5 hover:border-ink",
      dot: "border-ink bg-ink group-hover:bg-transparent",
    },
  }[variant];

  const inner = (
    <>
      <span
        aria-hidden
        className={`
          relative w-[7px] h-[7px] rounded-full border-[1.5px]
          ${palette.dot}
          transition-[background-color,border-color] duration-400 ease-out
        `}
      />
      <span className="relative inline-block overflow-hidden h-[1em] leading-none">
        <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span className="block absolute top-full left-0 transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );

  const classes = `cta group inline-flex items-center gap-3 rounded-full px-4 py-[12px] font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ${palette.bg} ${palette.hover} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
