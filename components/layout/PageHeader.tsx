import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, JsonLd } from "../ui/Editorial";
import { breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumb: { items: { name: string; href?: string; path?: string }[]; label: string };
  image?: { src: string; alt: string };
  children?: ReactNode;
}

/** Inner-page header: breadcrumb, H1, intro and an optional editorial image. */
export function PageHeader({ eyebrow, title, intro, breadcrumb, image, children }: Props) {
  const ld = breadcrumbJsonLd(
    breadcrumb.items.filter((i) => i.path ?? i.href).map((i) => ({ name: i.name, path: (i.path ?? i.href)! })),
  );
  return (
    // The fixed site header is transparent at the top: this surface extends behind it.
    <header className="border-b border-line bg-off-white pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
      <JsonLd data={ld} />
      <div
        className={`container-site grid gap-10 py-10 sm:py-14 ${image ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16" : ""}`}
      >
        <div className="min-w-0 space-y-5">
          <Breadcrumb items={breadcrumb.items} label={breadcrumb.label} />
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="text-h1 max-w-4xl">{title}</h1>
          {intro ? <div className="text-lead measure">{intro}</div> : null}
          {children}
        </div>
        {image ? (
          <div className="card-depth relative aspect-[16/10] overflow-hidden rounded-[var(--radius-surface)] bg-blue-100 lg:aspect-auto lg:h-[460px]">
            <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
