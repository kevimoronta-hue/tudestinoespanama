import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function EmptyState({
  title,
  text,
  icon = "compass",
  action,
}: {
  title: string;
  text: string;
  icon?: IconName;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-strong bg-off-white px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-blue-100 text-blue-800">
        <Icon name={icon} size={24} />
      </span>
      <p className="font-display text-xl font-bold text-ink">{title}</p>
      <p className="measure text-muted">{text}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label, cards = 6 }: { label: string; cards?: number }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-line bg-white">
            <div className="skeleton aspect-[16/10]" />
            <div className="space-y-3 p-6">
              <div className="skeleton h-3 w-24 rounded-full" />
              <div className="skeleton h-5 w-4/5 rounded-full" />
              <div className="skeleton h-3 w-full rounded-full" />
              <div className="skeleton h-3 w-2/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-3xl border border-error/30 bg-error-100 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-white text-error">
        <Icon name="alert" size={24} />
      </span>
      <p className="font-display text-xl font-bold text-ink">{title}</p>
      <p className="measure text-muted">{text}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning";
  title?: string;
  children: ReactNode;
}) {
  const styles =
    tone === "warning"
      ? "border-warning/40 bg-warning-100 [--icon:var(--warning)]"
      : "border-blue-800/20 bg-blue-50 [--icon:var(--panama-blue-800)]";
  return (
    <aside className={`flex gap-3 rounded-2xl border p-5 ${styles}`}>
      <Icon name={tone === "warning" ? "alert" : "info"} size={22} className="mt-0.5 shrink-0 text-[var(--icon)]" />
      <div className="space-y-1 text-[0.95rem] leading-relaxed text-ink">
        {title ? <p className="font-bold">{title}</p> : null}
        <div className="text-ink/85">{children}</div>
      </div>
    </aside>
  );
}
