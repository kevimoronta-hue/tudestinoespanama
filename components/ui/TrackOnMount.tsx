"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a page-level analytics event once (e.g. article_open). */
export function TrackOnMount({ event, props }: { event: AnalyticsEvent; props: Record<string, string> }) {
  const key = JSON.stringify(props);
  useEffect(() => {
    track(event, JSON.parse(key) as Record<string, string>);
  }, [event, key]);
  return null;
}
