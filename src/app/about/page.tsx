import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { StatCounters } from "@/components/sections/StatCounters";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: "Titan Autoworx is a Malta-based workshop built on passion and driven by precision.",
};

export default function AboutPage() {
  const a = site.about;
  return (
    <>
      <PageHero eyebrow="About Titan Autoworx" title={a.title} intro="A Malta workshop run by people who love cars." />
      <section className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ImageSlot src={a.image} alt="The Titan Autoworx team in the workshop" label="Team / workshop photo" className="aspect-[4/3] rounded-xl border border-border" />
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-text/85">
          {a.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </Reveal>
      </section>
      <section className="container-x pb-16 md:pb-24">
        <StatCounters stats={a.stats} />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-border bg-surface p-7">
                <span aria-hidden="true" className="block h-1 w-10 bg-accent" />
                <h2 className="mt-5 font-heading text-2xl not-italic">{v.title}</h2>
                <p className="mt-2 text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
