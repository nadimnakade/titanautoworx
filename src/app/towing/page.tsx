import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/links";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Towing & Vehicle Recovery",
  description: "24/7 towing and vehicle recovery across Malta for cars, classics, vans, 4x4s and project vehicles.",
};

const steps = [
  { t: "Call or WhatsApp", b: "Tell us where you are and what happened. Share your location pin on WhatsApp." },
  { t: "We dispatch", b: "A recovery truck is on its way with an ETA. Night or day, island-wide." },
  { t: "Safe transport", b: "Your vehicle is loaded and secured with care — classics and low cars included." },
  { t: "Repair or deliver", b: "Into our workshop for diagnosis, or delivered wherever you need it." },
];

export default function TowingPage() {
  const t = site.towing;
  return (
    <>
      <PageHero eyebrow="24/7 across Malta" title="Vehicle Recovery & Towing" intro={t.body} image={t.image}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl(site.whatsapp, "Hi Titan Autoworx, I need vehicle recovery. My location is: ")} size="lg" icon={<ArrowRight className="size-5" />}>
            Request Recovery
          </Button>
          <Button href={telUrl(site.phone)} variant="outline" size="lg" iconLeft={<Phone className="size-5" />}>
            Call {site.phone}
          </Button>
        </div>
      </PageHero>
      <section className="container-x py-16 md:py-24">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.features.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <li className="h-full rounded-lg border border-border bg-surface p-6">
                <Icon name={f.icon} className="size-8 text-accent" />
                <p className="mt-4 font-heading text-xl not-italic">{f.label}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <h2 className="mb-8 mt-20 font-heading text-[clamp(2rem,4vw,3.2rem)]">How it works</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <li className="relative h-full rounded-lg border border-border bg-surface p-6">
                <span className="font-heading text-5xl text-accent/30">0{i + 1}</span>
                <h3 className="mt-2 font-heading text-xl not-italic">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand title="Stuck? We’re on our way." body="Call or WhatsApp any time — recovery runs 24 hours a day, 7 days a week." />
    </>
  );
}
