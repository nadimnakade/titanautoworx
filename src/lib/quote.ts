export type QuoteInput = {
  name: string;
  phone: string;
  service: string;
  message: string;
  vehicle?: string;
};

export type QuoteResult = { ok: boolean; errors: Partial<Record<keyof QuoteInput, string>> };

export function validateQuote(input: QuoteInput): QuoteResult {
  const errors: QuoteResult["errors"] = {};
  if (!input.name.trim()) errors.name = "Please enter your name.";
  if (input.phone.replace(/\D/g, "").length < 8) errors.phone = "Please enter a valid phone number.";
  if (!input.service.trim()) errors.service = "Please choose a service.";
  return { ok: Object.keys(errors).length === 0, errors };
}

export function quoteMessage(v: QuoteInput): string {
  return [
    "Hi Titan Autoworx, I'd like a quote.",
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Service: ${v.service}`,
    v.vehicle?.trim() && `Vehicle: ${v.vehicle.trim()}`,
    v.message.trim() && `Details: ${v.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}
