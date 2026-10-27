"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/links";
import { Logo } from "@/components/ui/Logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-md border border-border text-text lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Logo />
              <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-md border border-border">
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x mt-6 flex-1">
              <ul className="flex flex-col">
                {site.nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-border/60"
                  >
                    <Link href={n.href} className={`block py-4 font-heading text-4xl ${pathname === n.href ? "text-accent" : "text-text"}`}>
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-x grid grid-cols-2 gap-3 pb-8">
              <a href={telUrl(site.phone)} className="flex h-12 items-center justify-center gap-2 rounded-md border border-border font-semibold">
                <Phone className="size-4" /> Call
              </a>
              <a href={whatsappUrl(site.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-md bg-accent font-semibold text-bg">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
