import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/links";

export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider";
  return (
    <div
      data-testid="mobile-action-bar"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <a href={telUrl(site.phone)} className={`${item} text-text`}>
        <Phone className="size-5" /> Call
      </a>
      <a href={whatsappUrl(site.whatsapp)} target="_blank" rel="noopener noreferrer" className={`${item} text-text`}>
        <MessageCircle className="size-5" /> WhatsApp
      </a>
      <Link href="/contact" className={`${item} bg-accent text-bg`}>
        <FileText className="size-5" /> Get Quote
      </Link>
    </div>
  );
}
