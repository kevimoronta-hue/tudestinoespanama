"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { systemCopy } from "@/lib/dictionaries/system";
import { href, isLocale } from "@/lib/i18n";

// Client component: not-found receives no params, so the locale is read from the URL.
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : "es";
  const c = systemCopy[locale];
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="text-h1">{c.notFoundTitle}</h1>
      <p className="text-lead measure">{c.notFoundText}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={`/${locale}`} className={buttonClasses("primary")}>
          {c.home}
          <Icon name="arrowRight" size={18} />
        </Link>
        <Link href={href("explore", locale)} className={buttonClasses("secondary")}>
          {c.explore}
        </Link>
      </div>
    </section>
  );
}
