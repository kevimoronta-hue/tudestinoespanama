"use client";

import { useId, useRef } from "react";
import type { FacetOption } from "@/types/listing";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";

export interface FilterField {
  name: string;
  label: string;
  value: string;
  allLabel: string;
  options: FacetOption[];
}

function Select({ field, onChange, id }: { field: FilterField; onChange: (name: string, value: string) => void; id: string }) {
  const selected = Boolean(field.value);
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
        {field.label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={field.value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`h-12 w-full appearance-none truncate rounded-xl border bg-white pl-4 pr-10 text-base text-ink transition-colors focus:border-blue-800 focus:outline-none focus-visible:ring-3 focus-visible:ring-blue-600/40 ${
            selected ? "border-blue-800 font-semibold" : "border-line-strong"
          }`}
        >
          <option value="">{field.allLabel}</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

/** Inline filters (tablet/desktop). */
export function FilterBar({ fields, onChange }: { fields: FilterField[]; onChange: (name: string, value: string) => void }) {
  const id = useId();
  return (
    <div className={`hidden gap-3 md:grid ${fields.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {fields.map((f) => (
        <Select key={f.name} field={f} onChange={onChange} id={`${id}-${f.name}`} />
      ))}
    </div>
  );
}

/** Mobile filters in a modal sheet (native <dialog>: focus trap + Escape). */
export function FilterDrawer({
  fields,
  onChange,
  onClear,
  labels,
  activeCount,
}: {
  fields: FilterField[];
  onChange: (name: string, value: string) => void;
  onClear: () => void;
  labels: { open: string; apply: string; close: string; clear: string };
  activeCount: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-haspopup="dialog"
        className="tap inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-5 font-display text-sm font-bold text-blue-900"
      >
        <Icon name="filter" size={18} />
        {labels.open}
        {activeCount > 0 ? (
          <span className="grid size-6 place-items-center rounded-full bg-blue-800 text-xs text-white">{activeCount}</span>
        ) : null}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={`${id}-title`}
        className="m-0 mt-auto max-h-[88dvh] w-full max-w-none rounded-t-3xl bg-white p-0 text-ink open:animate-[fade-up_0.25s_var(--ease-out-soft)_both]"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p id={`${id}-title`} className="font-display text-lg font-bold">
            {labels.open}
          </p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={labels.close}
            className="tap -mr-2 inline-flex items-center justify-center rounded-full hover:bg-blue-100"
          >
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="space-y-4 overflow-y-auto px-5 py-5">
          {fields.map((f) => (
            <Select key={f.name} field={f} onChange={onChange} id={`${id}-${f.name}`} />
          ))}
        </div>
        <div
          className="flex gap-3 border-t border-line px-5 pt-4"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          <button type="button" onClick={onClear} className={buttonClasses("secondary", "flex-1")}>
            {labels.clear}
          </button>
          <button type="button" onClick={() => ref.current?.close()} className={buttonClasses("primary", "flex-1")}>
            {labels.apply}
          </button>
        </div>
      </dialog>
    </>
  );
}
