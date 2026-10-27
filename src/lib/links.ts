const digits = (s: string) => s.replace(/\D/g, "");

export function whatsappUrl(phone: string, text?: string): string {
  const base = `https://wa.me/${digits(phone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telUrl(phone: string): string {
  return `tel:+${digits(phone)}`;
}

export function mailUrl(email: string, subject?: string, body?: string): string {
  const q = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${email}${q.length ? `?${q.join("&")}` : ""}`;
}
