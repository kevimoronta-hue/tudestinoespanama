"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Logo } from "./Logo";
import { isActive, type DetailAlternates, type NavItem } from "./nav";

interface Props {
  locale: Locale;
  items: NavItem[];
  cta: { label: string; href: string };
  labels: { open: string; close: string; title: string; language: string; logo: string };
  detailAlternates: DetailAlternates;
  tone: "light" | "dark";
}

/**
 * Full-screen menu built on a native modal <dialog>: the rest of the page becomes
 * inert (focus is trapped), Escape closes it, and body scroll is locked via CSS
 * (`html:has(dialog[open])`). Surface = the navbar's smart glass (.glass-surface). The
 * language switch is not repeated here: it stays next to the burger in the bar.
 */
export function MobileNavigation({ locale, items, cta, labels, tone }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "";

  const open = () => dialogRef.current?.showModal();
  const close = () => {
    dialogRef.current?.close();
  };

  // Close when the route changes (Cache Components keeps the tree mounted across navigations).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={labels.open}
        className={`tap -mr-2 inline-flex items-center justify-center rounded-full ${
          tone === "light" ? "text-white hover:bg-white/12" : "text-blue-900 hover:bg-blue-100"
        }`}
      >
        <Icon name="menu" size={26} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.title}
        onClose={() => triggerRef.current?.focus()}
        className="glass-surface m-0 h-dvh max-h-none w-full max-w-none p-0 text-ink open:flex open:flex-col open:animate-[fade-up_0.25s_var(--ease-out-soft)_backwards]"
      >
        <div
          className="container-site flex items-center justify-between"
          style={{ minHeight: "var(--header-h)", paddingTop: "env(safe-area-inset-top)" }}
        >
          <Link href={`/${locale}`} onClick={close} className="tap inline-flex items-center" aria-label={labels.logo}>
            <Logo height={40} alt="" />
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="tap -mr-2 inline-flex items-center justify-center rounded-full text-blue-900 hover:bg-blue-100"
          >
            <Icon name="close" size={26} />
          </button>
        </div>

        <nav aria-label={labels.title} className="container-site flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = isActive(pathname, item, locale);
              return (
                <li key={item.key} className="border-b border-ink/10 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-between py-3 font-display text-2xl font-bold tracking-tight ${
                      active ? "text-red-700" : "text-blue-900"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrowRight" size={20} className="text-line-strong" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="container-site flex flex-col gap-4 border-t border-ink/10 py-5"
          style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
        >
          <Link href={cta.href} onClick={close} className={buttonClasses("primary", "w-full")}>
            {cta.label}
          </Link>
        </div>
      </dialog>
    </>
  );
}
