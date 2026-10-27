"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

/** Accessible tablist; arrow keys move focus and select (automatic activation). */
export function FilterTabs({ options, value, onChange, label, controls }: { options: string[]; value: string; onChange: (v: string) => void; label: string; controls: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (i: number) => {
    const n = (i + options.length) % options.length;
    onChange(options[n]);
    refs.current[n]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {options.map((o, i) => {
        const active = o === value;
        return (
          <button
            key={o}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={controls}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); move(i + 1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); move(i - 1); }
              if (e.key === "Home") { e.preventDefault(); move(0); }
              if (e.key === "End") { e.preventDefault(); move(options.length - 1); }
            }}
            className={`relative shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-accent text-bg" : "border-border text-muted hover:border-accent/60 hover:text-text"}`}
          >
            {active && <motion.span layoutId={`tab-${label}`} className="absolute inset-0 -z-0 rounded-[5px] bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{o}</span>
          </button>
        );
      })}
    </div>
  );
}
