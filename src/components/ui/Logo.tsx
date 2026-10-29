import Link from "next/link";

/** Original Titan Autoworx mark: helmet glyph + stacked wordmark. */
export function Logo({ className = "", href = "/" }: { className?: string; href?: string | null }) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="lg-helm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff2525" />
            <stop offset="1" stopColor="#b80000" />
          </linearGradient>
        </defs>
        {/* crest */}
        <path d="M24 2c8 2 14 6 17 13-6-3-11-4-17-4S13 12 7 15C10 8 16 4 24 2Z" fill="url(#lg-helm)" />
        {/* helmet shell */}
        <path
          d="M10 18c4-3 9-4.5 14-4.5S34 15 38 18v12c0 6-4 11-9 14l-1-11h-8l-1 11c-5-3-9-8-9-14V18Z"
          fill="#e7e5e4"
        />
        {/* T-visor */}
        <path d="M14 22h20v5h-7.5v8h-5v-8H14z" fill="#0a0a0b" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.55rem] tracking-tight text-text">Titan</span>
        <span className="font-heading text-[0.78rem] tracking-[0.2em] text-accent">Autoworx</span>
      </span>
    </span>
  );
  if (href === null) return mark;
  return (
    <Link href={href} aria-label="Titan Autoworx home" className="inline-flex">
      {mark}
    </Link>
  );
}
