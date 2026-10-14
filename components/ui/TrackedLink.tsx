"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type EventProps = Record<string, string | number | boolean | undefined>;

/** Internal link that records an analytics event on click (never includes form data). */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...rest
}: ComponentProps<typeof Link> & { event: AnalyticsEvent; eventProps?: EventProps }) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

/** External link (new tab, noopener) with analytics. */
export function TrackedAnchor({
  event,
  eventProps,
  onClick,
  ...rest
}: ComponentProps<"a"> & { event: AnalyticsEvent; eventProps?: EventProps }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
