"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { LOCALE_COOKIE, localeMeta, locales, type Locale } from "@/lib/i18n";
import { t } from "@/lib/t";
import { Flag } from "../ui/Flag";
import { Icon } from "../ui/Icon";
import { languageTargets, type DetailAlternates } from "./nav";

interface Props {
  locale: Locale;
  labels: { button: string; list: string };
  detailAlternates: DetailAlternates;
  tone?: "light" | "dark";
}

/** Remembers the visitor's explicit choice so "/" opens in that language next time. */
function rememberLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Compact language disclosure: [flag ES ▾] → small panel with the 5 languages.
 * Same component on mobile and desktop. Motion: 160 ms, cubic-bezier(0.23, 1, 0.32, 1),
 * opacity + 4 px + 0.97 scale from the trigger corner — no bounce, no scale-from-zero.
 */
export function LanguageSelector({ locale, labels, detailAlternates, tone = "dark" }: Props) {
  const pathname = usePathname() ?? `/${locale}`;
  const targets = languageTargets(pathname, locale, detailAlternates);
  // Open state is tied to the current path, so it closes by itself after navigation
  // (Cache Components keeps the header mounted across routes).
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const next = typeof value === "function" ? value(prev === pathname) : value;
      return next ? pathname : null;
    });
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const current = localeMeta[locale];

  // Close on outside pointer.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // After the commit: the panel must no longer be visibility:hidden to take focus.
    const timer = window.setTimeout(() =>
      listRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus({ preventScroll: true }),
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) return;
    const items = [...(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      items[e.key === "Home" ? 0 : items.length - 1]?.focus();
    }
  };

  const light = tone === "light";

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={t(labels.button, { name: current.name })}
        onClick={() => setOpen((o) => !o)}
        className={`tap inline-flex items-center gap-1.5 rounded-full px-2.5 font-display text-sm font-bold uppercase tracking-wide transition-colors duration-150 ${
          light ? "text-white hover:bg-white/12" : "text-blue-900 hover:bg-blue-100"
        } ${open ? (light ? "bg-white/12" : "bg-blue-100") : ""}`}
      >
        <Flag code={current.flag} size={20} />
        <span>{locale}</span>
        <Icon
          name="chevronDown"
          size={16}
          className={`transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        ref={listRef}
        id={`${id}-list`}
        aria-label={labels.list}
        data-open={open}
        className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 origin-top-right rounded-2xl bg-white p-1.5 text-ink shadow-[0_18px_40px_-16px_rgb(6_29_41/0.35)] ring-1 ring-black/5 [transition:opacity_160ms_var(--ease-out-snappy),transform_160ms_var(--ease-out-snappy),visibility_0s_linear_0s] data-[open=false]:[transition:opacity_160ms_var(--ease-out-snappy),transform_160ms_var(--ease-out-snappy),visibility_0s_linear_160ms] data-[open=false]:pointer-events-none data-[open=false]:invisible data-[open=false]:-translate-y-1 data-[open=false]:scale-[0.97] data-[open=false]:opacity-0"
      >
        {locales.map((l) => {
          const meta = localeMeta[l];
          const isCurrent = l === locale;
          return (
            <li key={l}>
              <Link
                href={targets[l]}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                aria-current={isCurrent ? "true" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  rememberLocale(l);
                  if (!isCurrent) track("language_change", { from: locale, to: l });
                  setOpen(false);
                }}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[0.95rem] outline-none transition-colors duration-150 hover:bg-ocean-mist focus-visible:bg-ocean-mist ${
                  isCurrent ? "font-semibold text-ink" : "text-ink/80"
                }`}
              >
                <Flag code={meta.flag} size={20} />
                <span className="flex-1">{meta.name}</span>
                {isCurrent ? <Icon name="check" size={16} className="text-ocean" /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
