import type { FormEvent } from "react";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";

interface Props {
  label: string;
  placeholder: string;
  button: string;
  defaultValue?: string;
  /** Client handler. When omitted, the form submits natively (GET) to `action`. */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  action?: string;
  tone?: "default" | "large";
}

export function SearchBar({ label, placeholder, button, defaultValue, onSubmit, action, tone = "default" }: Props) {
  const large = tone === "large";
  return (
    <form role="search" action={action} method={action ? "get" : undefined} onSubmit={onSubmit} className="flex gap-2">
      <label className="relative flex-1">
        <span className="sr-only">{label}</span>
        <Icon
          name="search"
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          maxLength={100}
          className={`w-full rounded-full border border-line-strong bg-white pl-12 pr-4 text-base text-ink placeholder:text-muted/80 focus:border-blue-800 focus:outline-none focus-visible:ring-3 focus-visible:ring-blue-600/40 ${
            large ? "h-14" : "h-12"
          }`}
        />
      </label>
      <button
        type="submit"
        className={buttonClasses("dark", `shrink-0 !rounded-full ${large ? "!min-h-14" : ""}`)}
      >
        <Icon name="search" size={18} className="sm:hidden" />
        <span className="sr-only sm:not-sr-only">{button}</span>
      </button>
    </form>
  );
}
