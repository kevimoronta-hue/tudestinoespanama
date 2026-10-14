"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { isActive, type NavItem } from "./nav";

export function DesktopNavigation({ locale, items, tone, label }: { locale: Locale; items: NavItem[]; tone: "light" | "dark"; label: string }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label={label} className="hidden xl:block">
      <ul className="flex items-center gap-0.5 2xl:gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item, locale);
          return (
            // "Home" is redundant with the logo link on narrower desktops; shown from 1536px.
            <li key={item.key} className={item.key === "home" ? "hidden 2xl:block" : undefined}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2.5 font-display text-[0.9rem] font-semibold transition-colors after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:transition-transform after:duration-200 ${
                  active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                } ${
                  tone === "light"
                    ? "text-white after:bg-white hover:text-white"
                    : `${active ? "text-blue-900" : "text-blue-800"} after:bg-red-600 hover:text-blue-900`
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
