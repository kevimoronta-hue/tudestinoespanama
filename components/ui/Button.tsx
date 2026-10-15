import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/**
 * One button family for the whole site (styles: `.btn*` in app/globals.css).
 * primary = main CTA (brand red) · dark = filled brand-blue action · secondary = outline on
 * light surfaces · light = white on dark surfaces · outline-light = on photos/video ·
 * ghost = text CTA with arrow. Sizes: default 48px, "sm" 44px, "lg" 52px.
 */
export type ButtonVariant = "primary" | "dark" | "secondary" | "ghost" | "light" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonClasses(variant: ButtonVariant = "primary", extra = "", size: ButtonSize = "md") {
  return `btn btn-${variant} ${size === "md" ? "" : `btn-${size}`} ${extra}`.trim();
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", size = "md", icon, className = "", children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className, size)} {...rest}>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={17} /> : null}
    </Link>
  );
}
