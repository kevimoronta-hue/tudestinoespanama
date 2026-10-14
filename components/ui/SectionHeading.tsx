import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  size?: "h1" | "h2" | "h3";
  id?: string;
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  size,
  id,
  tone = "dark",
  className = "",
}: Props) {
  const sizeClass = size === "h3" ? "text-h3" : (size ?? Tag) === "h1" ? "text-h1" : "text-h2";
  const centered = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div data-reveal className={`flex max-w-3xl flex-col gap-4 ${centered} ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "light" ? "!text-white/85" : ""}`}>{eyebrow}</p>
      ) : null}
      <Tag id={id} className={`${sizeClass} ${tone === "light" ? "!text-white" : ""}`}>
        {title}
      </Tag>
      {intro ? (
        <div className={`text-lead measure ${tone === "light" ? "!text-white/85" : ""}`}>{intro}</div>
      ) : null}
    </div>
  );
}
