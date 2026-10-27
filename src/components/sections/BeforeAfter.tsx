"use client";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { clampPercent, percentFromPointer } from "@/lib/slider";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** Draggable before/after comparison. Keyboard: ←/→ ±5, Home/End. */
export function BeforeAfter({
  before,
  after,
  alt,
  labelBefore = "Before",
  labelAfter = "After",
  className = "aspect-[4/3]",
}: {
  before: string;
  after: string;
  alt: string;
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromEvent = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.round(percentFromPointer(clientX, r.left, r.width)));
  }, []);

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={`${alt}: drag to compare before and after`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pos}
      aria-valuetext={`${pos}% before`}
      className={`group relative select-none overflow-hidden rounded-lg touch-pan-y ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        fromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={(e) => {
        const step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
        if (step !== undefined) {
          e.preventDefault();
          setPos((p) => clampPercent(p + step));
        } else if (e.key === "Home") {
          e.preventDefault();
          setPos(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setPos(100);
        }
      }}
    >
      <ImageSlot src={after} alt={`${alt} after`} label="After photo" tone="after" className="absolute inset-0" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageSlot src={before} alt={`${alt} before`} label="Before photo" tone="before" className="absolute inset-0 grayscale-[0.4]" />
      </div>
      <span className="absolute bottom-3 left-3 rounded bg-bg/80 px-2 py-1 font-heading text-xs tracking-widest">{labelBefore}</span>
      <span className="absolute bottom-3 right-3 rounded bg-accent px-2 py-1 font-heading text-xs tracking-widest text-bg">{labelAfter}</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_20px_rgb(255_90_31/0.8)]" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-bg/70 backdrop-blur transition-transform group-active:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-accent">
          <ChevronsLeftRight className="size-4" />
        </span>
      </div>
    </div>
  );
}
