import type { Metadata } from "next";
import { Package } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Parts & Components",
  description: "Genuine OEM, aftermarket, performance and classic car parts sourced and fitted in Malta.",
};

export default function PartsPage() {
  return (
    <>
      <PageHero eyebrow="Supply & fit" title="Automotive Parts & Components" intro={site.parts.body} image={site.parts.image} />
      <section className="container-x py-16 md:py-24">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.parts.categories.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <li className="group h-full rounded-lg border border-border bg-surface p-7 transition-colors hover:border-accent/60">
                <Package className="size-7 text-accent transition-transform group-hover:-rotate-6" strokeWidth={1.6} />
                <h2 className="mt-5 font-heading text-2xl not-italic">{c.title}</h2>
                <p className="mt-2 text-muted">{c.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand title="Looking for a part?" body="Send us the make, model and part you need — we’ll find it and tell you price and lead time." />
    </>
  );
}
