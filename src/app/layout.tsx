import type { Metadata, Viewport } from "next";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/barlow-condensed/800-italic.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  openGraph: { type: "website", siteName: site.name, locale: "en_MT" },
  twitter: { card: "summary_large_image" },
  title: { default: "Titan Autoworx | Expert Automotive Care in Malta", template: "%s | Titan Autoworx" },
  description:
    "Malta's automotive specialists: mechanical repairs, bodywork, spray painting, classic restorations, performance builds, 24/7 towing and parts.",
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "MT" },
  openingHours: ["Mo-Fr 08:00-17:30", "Sa 08:00-12:30"],
  areaServed: "Malta",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Gate hero intro animation before paint; safety net un-hides if JS stalls. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!d.dataset.heroReady)d.classList.remove('motion-ok')},4000)}})()",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-body text-text">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
