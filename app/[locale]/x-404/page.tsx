import { notFound } from "next/navigation";

/**
 * Internal target of proxy.ts for unknown URLs: renders the localized 404 page
 * with a real HTTP 404 status (the user-facing URL is unchanged).
 */
export default function UnknownPath() {
  notFound();
}
