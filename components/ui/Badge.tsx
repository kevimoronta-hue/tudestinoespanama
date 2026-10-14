import type { ReactNode } from "react";

type Tone = "neutral" | "blue" | "red" | "success" | "warning" | "demo";

const tones: Record<Tone, string> = {
  neutral: "bg-off-white text-muted ring-line",
  blue: "bg-blue-100 text-blue-800 ring-blue-100",
  red: "bg-red-100 text-red-700 ring-red-100",
  success: "bg-success-100 text-success ring-success-100",
  warning: "bg-warning-100 text-[#7a4f00] ring-warning-100",
  demo: "bg-[#fff6d6] text-[#6b4a00] ring-[#f0d37a]",
};

export function Badge({ tone = "neutral", children, title }: { tone?: Tone; children: ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Visible marker on every demo item — demo content must never pass as real. */
export function DemoBadge({ label, title }: { label: string; title: string }) {
  return (
    <Badge tone="demo" title={title}>
      <span aria-hidden="true">●</span>
      {label}
      <span className="sr-only">: {title}</span>
    </Badge>
  );
}
