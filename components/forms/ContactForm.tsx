"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  BUDGETS,
  FIELD_RULES,
  PROJECT_TYPES,
  REQUEST_TYPES,
  SECTORS,
  validateField,
  validateForm,
  type ErrorCode,
  type FieldErrors,
  type FormKind,
} from "@/lib/validation";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; dryRun: boolean }
  | { state: "error"; message: string };

interface Props {
  locale: Locale;
  kind?: FormKind;
  labels: Dictionary["form"];
  privacyHref: string;
  defaultRequestType?: string;
}

type Values = Record<string, string>;

const EMPTY: Record<FormKind, Values> = {
  contact: { name: "", email: "", country: "", requestType: "", message: "" },
  invest: { name: "", company: "", country: "", email: "", sector: "", projectType: "", budget: "", message: "" },
};

export function ContactForm({ locale, kind = "contact", labels, privacyHref, defaultRequestType }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const [values, setValues] = useState<Values>(() => ({
    ...EMPTY[kind],
    ...(kind === "contact" && defaultRequestType ? { requestType: defaultRequestType } : {}),
  }));
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [attempted, setAttempted] = useState(false);

  const rules = FIELD_RULES[kind];
  const fid = (name: string) => `${id}-${name}`;

  const message = (err?: ErrorCode): string | undefined => {
    if (!err) return undefined;
    const m = labels.errors[err.code];
    return "n" in err ? m.replace("{n}", String(err.n)) : m;
  };

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      track("contact_start", { form: kind, locale });
    }
  };

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validateField(rules[name], value) }));
    if (status.state === "error") setStatus({ state: "idle" });
  };

  const blur = (name: string) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validateField(rules[name], values[name]) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.state === "submitting") return;

    const found = validateForm(kind, { ...values, consent });
    setAttempted(true);
    setErrors(found);
    setTouched(Object.fromEntries([...Object.keys(rules), "consent"].map((k) => [k, true])));
    const invalid = Object.keys(found).filter((k) => found[k]);
    if (invalid.length) {
      // Move focus to the error summary so screen readers announce it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, locale, ...values, consent, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; mode?: string; error?: string };
      if (res.ok && data.ok === true) {
        // Success is shown ONLY after the server confirms delivery (or an explicit dev dry-run).
        track("contact_submit_success", { form: kind, locale, requestType: values.requestType || kind });
        setStatus({ state: "success", dryRun: data.mode === "dry-run" });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      const msg =
        res.status === 429
          ? labels.errorRateLimit
          : data.error === "not_configured"
            ? labels.errorNotConfigured
            : labels.errorGeneric;
      track("contact_submit_error", { form: kind, locale, status: res.status });
      setStatus({ state: "error", message: msg });
    } catch {
      track("contact_submit_error", { form: kind, locale, status: 0 });
      setStatus({ state: "error", message: labels.errorNetwork });
    }
    // Values are intentionally kept so the user can retry.
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const reset = () => {
    setValues(EMPTY[kind]);
    setConsent(false);
    setErrors({});
    setTouched({});
    setAttempted(false);
    started.current = false;
    setStatus({ state: "idle" });
  };

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={`rounded-3xl border p-8 outline-none ${
          status.dryRun ? "border-warning/40 bg-warning-100" : "border-success/30 bg-success-100"
        }`}
      >
        <Icon name={status.dryRun ? "alert" : "checkCircle"} size={32} className={status.dryRun ? "text-warning" : "text-success"} />
        <p className="mt-4 font-display text-2xl font-bold">{status.dryRun ? labels.dryRunTitle : labels.successTitle}</p>
        <p className="mt-2 text-ink/85">{status.dryRun ? labels.dryRunText : labels.successText}</p>
        <button type="button" onClick={reset} className={buttonClasses("secondary", "mt-6")}>
          {labels.sendAnother}
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, ErrorCode][];
  const showSummary = attempted && errorList.length > 0;
  const fieldLabel = (name: string): string =>
    name === "consent" ? labels.consentLink : ((labels as unknown as Record<string, string>)[name] ?? name);

  const field = (name: string, input: ReactNode, opts: { hint?: string; optional?: boolean } = {}) => {
    const err = touched[name] ? message(errors[name]) : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fid(name)} className="font-semibold text-ink">
          {fieldLabel(name)}{" "}
          {opts.optional ? (
            <span className="font-normal text-muted">({labels.optional})</span>
          ) : (
            <span className="text-red-700" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {opts.hint ? (
          <p id={`${fid(name)}-hint`} className="text-sm text-muted">
            {opts.hint}
          </p>
        ) : null}
        {input}
        {err ? (
          <p id={`${fid(name)}-error`} className="flex items-start gap-1.5 text-sm font-medium text-error">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  const inputProps = (name: string, hint?: boolean) => {
    const invalid = Boolean(touched[name] && errors[name]);
    return {
      id: fid(name),
      name,
      value: values[name],
      onFocus: onStart,
      onBlur: () => blur(name),
      "aria-invalid": invalid || undefined,
      "aria-required": rules[name]?.required || undefined,
      "aria-describedby": [hint ? `${fid(name)}-hint` : "", invalid ? `${fid(name)}-error` : ""].filter(Boolean).join(" ") || undefined,
      className: `w-full rounded-xl border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:ring-3 focus-visible:ring-blue-600/40 ${
        invalid ? "border-error" : "border-line-strong focus:border-blue-800"
      }`,
    };
  };

  const select = (name: string, options: readonly string[], optionLabels: Record<string, string>) => (
    <div className="relative">
      <select {...inputProps(name)} onChange={(e) => set(name, e.target.value)} className={`${inputProps(name).className} h-12 appearance-none pr-10`}>
        <option value="">{labels.selectPlaceholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {optionLabels[o]}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );

  const text = (name: string, type = "text", autoComplete?: string) => (
    <input
      {...inputProps(name)}
      type={type}
      autoComplete={autoComplete}
      maxLength={rules[name].max}
      onChange={(e) => set(name, e.target.value)}
      className={`${inputProps(name).className} h-12`}
    />
  );

  const submitting = status.state === "submitting";
  const consentLabel = labels.consent.split("{link}");

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={`${id}-req`}>
      <p id={`${id}-req`} className="text-sm text-muted">
        <span className="text-red-700" aria-hidden="true">
          *
        </span>{" "}
        = {labels.required}
      </p>

      {showSummary ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border border-error/30 bg-error-100 p-5 outline-none">
          <p className="font-bold text-ink">{labels.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map(([name]) => (
              <li key={name}>
                <a href={`#${fid(name)}`} className="font-medium text-error underline underline-offset-4">
                  {fieldLabel(name)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", text("name", "text", "name"))}
        {kind === "invest" ? field("company", text("company", "text", "organization"), { optional: true }) : null}
        {field("email", text("email", "email", "email"))}
        {field("country", text("country", "text", "country-name"))}
        {kind === "contact"
          ? field("requestType", select("requestType", REQUEST_TYPES, labels.requestTypes))
          : null}
        {kind === "invest" ? field("sector", select("sector", SECTORS, labels.sectors)) : null}
        {kind === "invest" ? field("projectType", select("projectType", PROJECT_TYPES, labels.projectTypes)) : null}
        {kind === "invest" ? field("budget", select("budget", BUDGETS, labels.budgets), { optional: true }) : null}
      </div>

      {field(
        "message",
        <textarea
          {...inputProps("message", true)}
          rows={6}
          maxLength={rules.message.max}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputProps("message", true).className} min-h-40 py-3 leading-relaxed`}
        />,
        { hint: labels.messageHint },
      )}

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>{labels.honeypot}</label>
        <input
          id={fid("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fid("consent")} className="flex cursor-pointer items-start gap-3">
          <input
            id={fid("consent")}
            type="checkbox"
            checked={consent}
            onFocus={onStart}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((er) => ({ ...er, consent: e.target.checked ? undefined : { code: "consent" } }));
              setTouched((t) => ({ ...t, consent: true }));
            }}
            aria-invalid={Boolean(touched.consent && errors.consent) || undefined}
            aria-describedby={touched.consent && errors.consent ? `${fid("consent")}-error` : undefined}
            className="mt-1 size-5 shrink-0 accent-blue-800"
          />
          <span className="text-[0.95rem] leading-relaxed text-ink/90">
            {consentLabel[0]}
            <Link href={privacyHref} className="font-semibold text-blue-800 underline underline-offset-4">
              {labels.consentLink}
            </Link>
            {consentLabel[1]}
          </span>
        </label>
        {touched.consent && errors.consent ? (
          <p id={`${fid("consent")}-error`} className="flex items-start gap-1.5 pl-8 text-sm font-medium text-error">
            <Icon name="alert" size={16} className="mt-0.5 shrink-0" />
            {message(errors.consent)}
          </p>
        ) : null}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status.state === "error" ? (
          <div role="alert" className="flex gap-3 rounded-2xl border border-error/30 bg-error-100 p-5">
            <Icon name="alert" size={22} className="mt-0.5 shrink-0 text-error" />
            <div>
              <p className="font-bold">{labels.errorTitle}</p>
              <p className="text-sm text-ink/85">{status.message}</p>
            </div>
          </div>
        ) : null}
      </div>

      <button type="submit" disabled={submitting} aria-disabled={submitting} className={buttonClasses("primary", "w-full sm:w-auto")}>
        {submitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            {labels.submitting}
          </>
        ) : (
          <>
            {kind === "invest" ? labels.submitInvest : labels.submit}
            <Icon name="arrowRight" size={18} />
          </>
        )}
      </button>
    </form>
  );
}
