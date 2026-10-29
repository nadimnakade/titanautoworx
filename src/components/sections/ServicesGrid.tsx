import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard, ServiceRow } from "./ServiceCard";

export function ServicesGrid() {
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-border/70 py-14 md:py-18">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our services"
          title="Complete automotive solutions"
          subtitle="All under one roof. Whatever you drive, we keep you on the road."
          action={{ label: "View All Services", href: "/services" }}
        />
        {/* Desktop/tablet: 4 + 3 card grid */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-12">
          {site.services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.08} className={i < 4 ? "lg:col-span-3" : "lg:col-span-4"}>
              <ServiceCard s={s} className="h-full" />
            </Reveal>
          ))}
        </div>
        {/* Mobile: compact list */}
        <div className="flex flex-col gap-2.5 sm:hidden">
          {site.services.map((s) => (
            <ServiceRow key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
