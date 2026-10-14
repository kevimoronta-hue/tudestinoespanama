"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

const noop = () => () => {};

/** Web Share API when available, otherwise copy-to-clipboard. No third-party share scripts. */
export function ShareButtons({ title, labels }: { title: string; labels: { share: string; copyLink: string; copied: string } }) {
  const [copied, setCopied] = useState(false);
  // Read on the client only, to keep server and client markup identical during hydration.
  const canShare = useSyncExternalStore(noop, () => "share" in navigator, () => false);

  const share = async () => {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch {
      /* dismissed */
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const btn =
    "tap inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-bold text-blue-900 transition-colors hover:bg-blue-100";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {canShare ? (
        <button type="button" onClick={share} className={btn}>
          <Icon name="share" size={18} />
          {labels.share}
        </button>
      ) : null}
      <button type="button" onClick={copy} className={btn}>
        <Icon name={copied ? "check" : "link"} size={18} />
        {copied ? labels.copied : labels.copyLink}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
    </div>
  );
}
