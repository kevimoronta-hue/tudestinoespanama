import type { RequestType } from "@/types/content";

/**
 * Shared client/server validation for the contact and investor forms.
 * Returns error *codes*; the UI maps them to localized messages.
 */

export const REQUEST_TYPES: RequestType[] = ["conocer", "vivir", "invertir", "empresa", "otra"];
export const SECTORS = ["logistica", "comercio", "servicios", "turismo", "agro", "tecnologia", "inmobiliario", "otro"] as const;
export const PROJECT_TYPES = ["exploracion", "empresa", "expansion", "alianza", "otro"] as const;
export const BUDGETS = ["no-definido", "menos-50k", "50k-250k", "250k-1m", "mas-1m"] as const;

export type FormKind = "contact" | "invest";

export type ErrorCode =
  | { code: "required" }
  | { code: "email" }
  | { code: "tooShort"; n: number }
  | { code: "tooLong"; n: number }
  | { code: "consent" }
  | { code: "invalidOption" };

export type FieldErrors = Partial<Record<string, ErrorCode>>;

export interface FormValues {
  [field: string]: string | boolean | undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FieldRule {
  required?: boolean;
  min?: number;
  max: number;
  email?: boolean;
  options?: readonly string[];
}

export const FIELD_RULES: Record<FormKind, Record<string, FieldRule>> = {
  contact: {
    name: { required: true, min: 2, max: 120 },
    email: { required: true, email: true, max: 160 },
    country: { required: true, min: 2, max: 80 },
    requestType: { required: true, max: 20, options: REQUEST_TYPES },
    message: { required: true, min: 20, max: 3000 },
  },
  invest: {
    name: { required: true, min: 2, max: 120 },
    company: { max: 160 },
    country: { required: true, min: 2, max: 80 },
    email: { required: true, email: true, max: 160 },
    sector: { required: true, max: 30, options: SECTORS },
    projectType: { required: true, max: 30, options: PROJECT_TYPES },
    budget: { max: 30, options: BUDGETS },
    message: { required: true, min: 20, max: 3000 },
  },
};

export function validateField(rule: FieldRule, raw: unknown): ErrorCode | undefined {
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) return rule.required ? { code: "required" } : undefined;
  if (rule.options && !rule.options.includes(value)) return { code: "invalidOption" };
  if (rule.email && !EMAIL_RE.test(value)) return { code: "email" };
  if (rule.min && value.length < rule.min) return { code: "tooShort", n: rule.min };
  if (value.length > rule.max) return { code: "tooLong", n: rule.max };
  return undefined;
}

export function validateForm(kind: FormKind, values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const [field, rule] of Object.entries(FIELD_RULES[kind])) {
    const err = validateField(rule, values[field]);
    if (err) errors[field] = err;
  }
  if (values.consent !== true) errors.consent = { code: "consent" };
  return errors;
}

/** Trim, strip control characters (keeps newlines/tabs) and cap length. */
export function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}
