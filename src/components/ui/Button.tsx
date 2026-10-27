import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  size?: "md" | "lg" | "sm";
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md font-semibold tracking-wide transition-[background,color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98]";
const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-[0.95rem]", lg: "h-13 px-7 text-base" };
const variants = {
  primary:
    "bg-accent text-[#0a0a0b] hover:bg-accent-hover shadow-[0_0_0_0_rgb(255_90_31/0)] hover:shadow-[0_10px_40px_-10px_rgb(255_90_31/0.7)]",
  outline: "border border-accent/70 text-text hover:border-accent hover:bg-accent/10",
  ghost: "text-text hover:text-accent",
};

export function Button({ variant = "primary", size = "md", href, onClick, icon, iconLeft, children, className = "", type = "button", external }: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"
        />
      )}
      {iconLeft}
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );
  if (href) {
    if (external || /^(https?:|mailto:|tel:)/.test(href))
      return (
        <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {inner}
        </a>
      );
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
