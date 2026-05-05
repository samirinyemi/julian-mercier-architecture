"use client";

import { useEffect, useRef, ReactNode } from "react";
import { getGsap, canAnimate, EASE } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** delay between word reveals in seconds */
  stagger?: number;
  /** scroll trigger start offset */
  start?: string;
  /** by characters or words */
  by?: "word" | "line";
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Split a text string into word/line spans and reveal each via mask-clip-y.
 * Cheap, dependency-free version of GSAP's paid SplitText plugin.
 */
export function SplitReveal({
  children,
  className = "",
  stagger = 0.06,
  start = "top 80%",
  by = "word",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canAnimate()) return;
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-split-item]");
      if (!items.length) return;
      gsap.from(items, {
        yPercent: 105,
        duration: 1,
        stagger,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, start]);

  // Recursively wrap text nodes in word spans
  const splitText = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      const tokens = by === "word" ? node.split(/(\s+)/) : node.split(/(\n)/);
      return tokens.map((token, i) => {
        if (/^\s+$/.test(token) || token === "\n") return token;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
          >
            <span data-split-item className="inline-block will-change-transform">
              {token}
            </span>
          </span>
        );
      });
    }
    return node;
  };

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {Array.isArray(children) ? children.map((c, i) => <span key={i}>{splitText(c)}</span>) : splitText(children)}
    </Tag>
  );
}
