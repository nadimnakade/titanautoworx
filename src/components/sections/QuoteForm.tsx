"use client";
import { useRef, useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { site } from "@/content/site";
import { mailUrl, whatsappUrl } from "@/lib/links";
import { quoteMessage, validateQuote, type QuoteInput, type QuoteResult } from "@/lib/quote";

const empty: QuoteInput = { name: "", phone: "", service: "", vehicle: "", message: "" };

export function QuoteForm() {
  const [v, setV] = useState<QuoteInput>(empty);
  const [errors, setErrors] = useState<QuoteResult["errors"]>({});
  const form = useRef<HTMLFormElement>(null);

  const set = (k: keyof QuoteInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const check = () => {
    const r = validateQuote(v);
    setErrors(r.errors);
    if (!r.ok) {
      const first = (["name", "phone", "service"] as const).find((k) => r.errors[k]);
      form.current?.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
    }
    return r.ok;
  };

  const field = "w-full rounded-md border bg-bg/60 px-4 py-3 text-text placeholder:text-muted/60 outline-none transition-colors focus:border-accent";
  const lab = "mb-1.5 block text-sm font-semibold";
  const err = (k: keyof QuoteInput) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm text-[#ff8a5c]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof QuoteInput) => ({
    "aria-invalid": !!errors[k] || undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
    className: `${field} ${errors[k] ? "border-[#ff8a5c]" : "border-border"}`,
  });

  return (
    <form
      ref={form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (check()) window.open(whatsappUrl(site.whatsapp, quoteMessage(v)), "_blank", "noopener");
      }}
      className="grid gap-5 rounded-xl border border-border bg-surface p-6 md:grid-cols-2 md:p-8"
    >
      <div>
        <label htmlFor="q-name" className={lab}>Name *</label>
        <input id="q-name" name="name" autoComplete="name" value={v.name} onChange={set("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="q-phone" className={lab}>Phone *</label>
        <input id="q-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set("phone")} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="q-service" className={lab}>Service *</label>
        <select id="q-service" name="service" value={v.service} onChange={set("service")} {...aria("service")}>
          <option value="">Choose a service…</option>
          {site.services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Something else</option>
        </select>
        {err("service")}
      </div>
      <div>
        <label htmlFor="q-vehicle" className={lab}>Vehicle (make, model, year)</label>
        <input id="q-vehicle" name="vehicle" value={v.vehicle} onChange={set("vehicle")} className={`${field} border-border`} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="q-message" className={lab}>What does it need?</label>
        <textarea id="q-message" name="message" rows={5} value={v.message} onChange={set("message")} className={`${field} resize-y border-border`} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-semibold text-bg transition-colors hover:bg-accent-hover">
          <MessageCircle className="size-5" /> Send via WhatsApp
        </button>
        <button
          type="button"
          onClick={() => check() && (window.location.href = mailUrl(site.email, `Quote request: ${v.service}`, quoteMessage(v)))}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-6 font-semibold transition-colors hover:border-accent"
        >
          <Mail className="size-5" /> Send by email
        </button>
      </div>
      <p className="text-xs text-muted md:col-span-2">We reply during working hours. For breakdowns, call or WhatsApp — towing runs 24/7.</p>
    </form>
  );
}
