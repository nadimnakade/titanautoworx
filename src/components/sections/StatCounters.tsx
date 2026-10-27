"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

export function StatCounters({ stats }: { stats: { value: number; suffix: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface p-6 md:p-8">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</dt>
          <dd className="mt-2 font-heading text-5xl text-accent md:text-6xl">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
