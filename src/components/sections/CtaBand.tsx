import { ArrowRight, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({ title = "Ready when you are.", body = "Tell us about your car and what it needs. We’ll come back with a clear, honest quote." }: { title?: string; body?: string }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgb(255_90_31/0.28),transparent_70%)]" />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-60" />
      <Reveal className="container-x relative text-center">
        <p className="eyebrow mb-4">Get a quote</p>
        <h2 className="mx-auto max-w-4xl font-heading text-[clamp(2.4rem,6vw,5rem)]">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted md:text-lg">{body}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg" icon={<ArrowRight className="size-5" />}>Request a Quote</Button>
          <Button href={whatsappUrl(site.whatsapp)} variant="outline" size="lg" iconLeft={<MessageCircle className="size-5" />}>Chat on WhatsApp</Button>
        </div>
      </Reveal>
    </section>
  );
}
