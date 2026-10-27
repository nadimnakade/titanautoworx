import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { mailUrl, telUrl } from "@/lib/links";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/Social";

export function Footer() {
  const head = "mb-4 font-heading text-lg text-text";
  const link = "text-sm text-muted transition-colors hover:text-accent";
  return (
    <footer className="relative mt-auto border-t border-border bg-[#070708] pb-24 md:pb-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Malta&apos;s trusted automotive specialists. Repairs, restorations, modifications and towing. Driven by passion. Built on experience.
          </p>
          <ul className="mt-6 flex gap-2">
            {site.socials.filter((s) => s.href).map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent">
                  <SocialIcon label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={head}>Quick Links</h2>
          <ul className="space-y-2.5">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={head}>Our Services</h2>
          <ul className="space-y-2.5">
            {site.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className={link}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={head}>Get in Touch</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-accent" /><span><a href={telUrl(site.phone)} className="hover:text-accent">{site.phone}</a><br /><a href={telUrl(site.phone2)} className="hover:text-accent">{site.phone2}</a></span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-accent" /><a href={mailUrl(site.email)} className="hover:text-accent">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-accent" />{site.address}</li>
          </ul>
          <ul className="mt-5 space-y-1 text-sm">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 border-b border-border/50 py-1.5"><span className="text-muted">{h.days}</span><span>{h.time}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {process.env.NEXT_PUBLIC_BUILD_YEAR} Titan Autoworx. All rights reserved.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
