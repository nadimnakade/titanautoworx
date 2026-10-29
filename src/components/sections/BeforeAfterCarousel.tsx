"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "./BeforeAfter";

export function BeforeAfterCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const btn =
    "grid size-11 place-items-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent";
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/35 py-14 md:py-18">
      <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal className="mb-6 flex items-end justify-between gap-6 md:mb-7">
          <div>
            <p className="eyebrow mb-3">Real results</p>
            <h2 className="font-heading text-[clamp(2.1rem,5vw,3.6rem)]">Before &amp; after transformations</h2>
            <p className="mt-2 text-sm text-muted md:text-base">Real cars. Real results. Drag to see the difference expert care makes.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Previous transformations" className={btn} onClick={() => scroll(-1)}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" aria-label="Next transformations" className={btn} onClick={() => scroll(1)}>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </Reveal>
        <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
          {site.work.map((w) => (
            <article key={w.title + w.subtitle} className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)]">
              <p className="eyebrow mb-1.5 text-[0.72rem]">{w.category}</p>
              <h3 className="mb-3 font-heading text-xl not-italic tracking-wide">
                {w.title} <span className="text-muted">— {w.subtitle}</span>
              </h3>
              <BeforeAfter before={w.before} after={w.after} alt={`${w.title} ${w.subtitle}`} className="aspect-[16/10]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
