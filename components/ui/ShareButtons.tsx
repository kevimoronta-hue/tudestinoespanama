"use client";

import { useState, useSyncExternalStore } from "react";
import { buttonClasses } from "./Button";
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

  const btn = buttonClasses("secondary", "", "sm");
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
