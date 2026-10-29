import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

export function TowingBand({ compact = false }: { compact?: boolean }) {
  const t = site.towing;
  return (
    <section className={compact ? "py-8" : "py-10 md:py-12"}>
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2px] border border-border bg-surface">
            <ImageSlot src={t.image} alt="Titan Autoworx recovery truck" label="Recovery truck photo" className="absolute inset-0 opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/30" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-accent/20 blur-[90px]" />
            <div className="relative grid gap-7 p-6 md:p-9 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow mb-3">24/7 across Malta</p>
                <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)]">{t.title}</h2>
                <p className="mt-3 max-w-lg text-text/80">{t.body}</p>
                <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {t.features.map((f) => (
                    <li key={f.label} className="flex flex-col gap-2">
                      <Icon name={f.icon} className="size-6 text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <Button
                  href={whatsappUrl(site.whatsapp, "Hi Titan Autoworx, I need vehicle recovery. My location is: ")}
                  size="lg"
                  icon={<ArrowRight className="size-5" />}
                >
                  Request Recovery
                </Button>
                <Button href={telUrl(site.phone)} variant="outline" size="lg" iconLeft={<Phone className="size-5" />}>
                  Call {site.phone}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
