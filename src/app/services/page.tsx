import type { Metadata } from "next";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description: "Mechanical repairs, bodywork, spray painting, classic restorations, modifications, towing and parts in Malta.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="What we do" title="Our Services" intro="Everything your vehicle needs, under one roof — from routine servicing to full restorations, custom builds and 24/7 recovery." />
      <nav aria-label="Services" className="sticky top-[72px] z-30 border-b border-border bg-bg/85 backdrop-blur-xl">
        <ul className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {site.services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="block whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-text">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-x divide-y divide-border">
        {site.services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-h`} className="grid scroll-mt-36 items-center gap-8 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <ImageSlot src={s.image} alt={s.title} label={s.title} className="aspect-[4/3] rounded-xl border border-border" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-md bg-accent text-bg"><Icon name={s.icon} className="size-6" /></span>
                <span className="font-heading text-sm tracking-[0.2em] text-muted">0{i + 1}</span>
              </div>
              <h2 id={`${s.slug}-h`} className="font-heading text-[clamp(2rem,4vw,3.2rem)]">{s.title}</h2>
              <p className="mt-4 text-lg text-text/80">{s.body}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-text/90"><Check className="size-4 shrink-0 text-accent" />{p}</li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
