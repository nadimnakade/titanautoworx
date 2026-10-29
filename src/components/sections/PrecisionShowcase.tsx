"use client";

import { useRef, useSyncExternalStore } from "react";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CarInspection3D, type CarInspection3DHandle } from "@/components/sections/CarInspection3D";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const subscribe = () => () => {};
const motionEnabled = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const chapters = [
  { id: "arrival", index: "01", eyebrow: "Damage", title: "Every flaw. In full view.", body: "Impact damage, broken lighting and scarred paint. We begin with an honest view of everything the car needs.", side: "left" },
  { id: "inspect", index: "02", eyebrow: "Bodywork", title: "Shape restored. Millimetre by millimetre.", body: "Panels are straightened, aligned and prepared until every surface is ready to become whole again.", side: "right" },
  { id: "craft", index: "03", eyebrow: "Refinish", title: "A flawless foundation.", body: "Fresh paint transforms the repaired body into one seamless surface, ready for its final finish.", side: "left" },
  { id: "finish", index: "04", eyebrow: "360° reveal", title: "Every angle. Fully restored.", body: "Keep scrolling to orbit the finished car through a complete 360-degree handover inspection.", side: "right" },
] as const;

export function PrecisionShowcase() {
  const root = useRef<HTMLElement>(null);
  const car = useRef<CarInspection3DHandle>(null);
  const enabled = useSyncExternalStore(subscribe, motionEnabled, () => false);

  useGSAP(() => {
    if (!enabled) return;
    gsap.set("[data-story-chapter]", { autoAlpha: 0, y: 28 });
    const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.22, onUpdate: (self) => car.current?.draw(self.progress) } });
    timeline
      .to("[data-story-hero]", { autoAlpha: 0, y: -38, duration: 0.08 }, 0.1)
      .to("[data-story-trust]", { autoAlpha: 0, y: 18, duration: 0.06 }, 0.08)
      .fromTo("[data-story-chapter='arrival']", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.17)
      .to("[data-story-chapter='arrival']", { autoAlpha: 0, y: -22, duration: 0.07 }, 0.31)
      .fromTo("[data-story-chapter='inspect']", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.36)
      .to("[data-story-chapter='inspect']", { autoAlpha: 0, y: -22, duration: 0.07 }, 0.5)
      .fromTo("[data-story-chapter='craft']", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.55)
      .to("[data-story-chapter='craft']", { autoAlpha: 0, y: -22, duration: 0.07 }, 0.69)
      .fromTo("[data-story-chapter='finish']", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.75)
      .to("[data-story-progress]", { scaleX: 1, duration: 0.92 }, 0.04);
  }, { scope: root, dependencies: [enabled] });

  return (
    <section id="precision-showcase" ref={root} data-testid="hero" aria-labelledby="hero-title" className="relative h-[520svh] bg-bg motion-reduce:h-auto">
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:min-h-[100svh]">
        <CarInspection3D ref={car} enabled={enabled} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_0%,rgba(7,7,8,.08)_45%,rgba(7,7,8,.9)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-bg/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg via-bg/45 to-transparent" />

        <div data-story-hero className="container-x absolute inset-x-0 top-[18svh] z-10 text-center md:top-[15svh]">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/55">Titan Autoworx · Malta</p>
          <h1 id="hero-title" className="mx-auto max-w-5xl text-balance font-display text-[clamp(3.4rem,8.6vw,8.6rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-white">Built back.<br /><span className="text-white/45">Beyond expectation.</span></h1>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-sm leading-relaxed text-white/62 md:text-base">From damaged arrival to flawless return. Scroll through the complete Titan transformation.</p>
          <div className="pointer-events-auto mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" icon={<ArrowRight className="size-5" />}>Request a Quote</Button>
            <Button href={whatsappUrl(site.whatsapp, "Hi Titan Autoworx, I have a question about my car.")} variant="outline" size="lg" iconLeft={<MessageCircle className="size-5" />} className="bg-black/20 backdrop-blur-xl">WhatsApp</Button>
          </div>
        </div>

        {chapters.map((chapter) => (
          <div key={chapter.id} data-story-chapter={chapter.id} className={`container-x invisible absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 ${chapter.side === "right" ? "flex justify-end" : ""}`}>
            <div className={`max-w-md ${chapter.side === "right" ? "text-right" : ""}`}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-accent">{chapter.index} · {chapter.eyebrow}</p>
              <h2 className="text-balance font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-white">{chapter.title}</h2>
              <p className={`mt-5 max-w-sm text-pretty text-base leading-relaxed text-white/60 ${chapter.side === "right" ? "ml-auto" : ""}`}>{chapter.body}</p>
            </div>
          </div>
        ))}

        <div data-story-trust className="container-x absolute inset-x-0 bottom-8 z-10 hidden md:block">
          <ul className="mx-auto grid max-w-4xl grid-cols-6 rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-xl">
            {site.trust.map((item) => <li key={item.label} data-testid="trust-item" className="flex items-center justify-center gap-2 border-l border-white/10 px-2 first:border-0"><Icon name={item.icon} className="size-4 text-white/75" /><span className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-white/50">{item.label}</span></li>)}
          </ul>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 w-32 -translate-x-1/2 md:bottom-5">
          <div className="mb-2 flex items-center justify-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/45"><ChevronDown className="size-3.5 animate-bounce" /> Scroll to transform</div>
          <div className="h-px bg-white/15"><span data-story-progress className="block h-full origin-left scale-x-[0.02] bg-accent" /></div>
        </div>
      </div>
    </section>
  );
}
