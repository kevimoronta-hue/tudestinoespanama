import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "tap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[0.95rem] font-bold leading-tight transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-red-600 text-white shadow-[0_1px_0_rgb(0_0_0/0.08)] hover:bg-red-700 focus-visible:bg-red-700",
  secondary: "border border-blue-800 bg-white text-blue-800 hover:bg-blue-100",
  ghost: "text-blue-800 hover:bg-blue-100 px-4",
  light: "bg-white text-blue-900 hover:bg-blue-100",
  "outline-light": "border border-white/70 text-white hover:bg-white/12 backdrop-blur-[2px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", icon, className = "", children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...rest}>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} /> : null}
    </Link>
  );
}
