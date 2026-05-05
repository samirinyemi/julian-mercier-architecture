"use client";

import { useEffect, useRef, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  stagger?: 1 | 2 | 3 | 4 | 5;
  threshold?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Reveal({
  children,
  stagger,
  threshold = 0.2,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-stagger={stagger}
    >
      {children}
    </Tag>
  );
}
