"use client";
import { useEffect, useRef } from "react";

const fmt = (n: number, suffix: string) => `${n.toLocaleString("en-GB")}${suffix}`;

/**
 * Server renders the final number (crawlers, no-JS, reduced motion).
 * With motion, numbers that start off-screen reset to 0 and count up on view.
 */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible: keep final value
    el.textContent = fmt(0, suffix);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        el.textContent = fmt(Math.round(value * (1 - Math.pow(1 - p, 4))), suffix);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      {fmt(value, suffix)}
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
