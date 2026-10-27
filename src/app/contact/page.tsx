import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { mailUrl, telUrl, whatsappUrl } from "@/lib/links";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Request a quote or get in touch with Titan Autoworx in Malta. Call, WhatsApp or email.",
};

export default function ContactPage() {
  const row = "flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/60";
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Request a Quote" intro="Tell us about your vehicle and what it needs. We’ll come back with a clear, honest price." />
      <section className="container-x grid gap-8 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr]">
        <QuoteForm />
        <aside className="flex flex-col gap-3">
          <a href={telUrl(site.phone)} className={row}><Phone className="mt-0.5 size-5 text-accent" /><span><span className="block text-sm text-muted">Call</span>{site.phone}</span></a>
          <a href={whatsappUrl(site.whatsapp)} target="_blank" rel="noopener noreferrer" className={row}><MessageCircle className="mt-0.5 size-5 text-accent" /><span><span className="block text-sm text-muted">WhatsApp</span>Chat with us</span></a>
          <a href={mailUrl(site.email)} className={row}><Mail className="mt-0.5 size-5 text-accent" /><span><span className="block text-sm text-muted">Email</span>{site.email}</span></a>
          <div className={row}><MapPin className="mt-0.5 size-5 text-accent" /><span><span className="block text-sm text-muted">Workshop</span>{site.address}</span></div>
          <div className={row}>
            <Clock className="mt-0.5 size-5 text-accent" />
            <ul className="flex-1 text-sm">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 py-0.5"><span className="text-muted">{h.days}</span>{h.time}</li>
              ))}
            </ul>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Titan Autoworx " + site.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-lg border border-border bg-surface-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
            style={{ backgroundImage: "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          >
            <span className="flex flex-col items-center gap-2"><MapPin className="size-8 text-accent" />Open in Google Maps</span>
          </a>
        </aside>
      </section>
    </>
  );
}
