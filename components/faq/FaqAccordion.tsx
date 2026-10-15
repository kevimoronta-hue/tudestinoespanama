"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { openAssistant } from "../assistant/Assistant";
import { Icon } from "../ui/Icon";

export interface FaqItemView {
  id: string;
  q: string;
  a: string[];
  links: { href: string; label: string; external: boolean }[];
}

/**
 * One question open at a time. The panel height animates with grid-template-rows
 * (0fr → 1fr) over 200 ms with the site's strong ease-out; content stays in the DOM
 * (hidden + inert when closed) so it remains indexable.
 */
export function FaqAccordion({ items, askLabel, newTab }: { items: FaqItemView[]; askLabel: string; newTab: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const base = useId();

  return (
    <div>
      <ul className="card-depth divide-y divide-ink/8 overflow-hidden rounded-[var(--radius-surface)] bg-white">
        {items.map((f) => {
          const isOpen = open === f.id;
          const btn = `${base}-${f.id}-b`;
          const panel = `${base}-${f.id}-p`;
          return (
            <li key={f.id} className="faq-item" data-open={isOpen}>
              <h3>
                <button
                  id={btn}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="faq-q"
                >
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="faq-sign" />
                </button>
              </h3>
              <div id={panel} role="region" aria-labelledby={btn} className="faq-a" inert={!isOpen}>
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-3 px-6 pb-7 text-[1rem] leading-relaxed text-ink/80 sm:px-8 sm:text-[1.02rem]">
                    {f.a.map((p) => (
                      <p key={p} className="max-w-[62ch]">
                        {p}
                      </p>
                    ))}
                    {f.links.length ? (
                      <p className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
                        {f.links.map((l) =>
                          l.external ? (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="faq-link">
                              {l.label}
                              <Icon name="external" size={14} />
                              <span className="sr-only"> {newTab}</span>
                            </a>
                          ) : (
                            <Link key={l.href} href={l.href} className="faq-link">
                              {l.label}
                              <Icon name="arrowRight" size={14} />
                            </Link>
                          ),
                        )}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={() => openAssistant()} className="btn btn-ghost mt-5 gap-2">
        <span>{askLabel}</span>
        <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}
