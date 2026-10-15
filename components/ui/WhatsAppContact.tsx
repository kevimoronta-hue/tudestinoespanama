"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/contact-links";
import { Icon } from "./Icon";

interface Labels {
  open: string;
  title: string;
  text: string;
  cta: string;
  close: string;
  message: string;
}

const TEASER_KEY = "tdp-wa-teaser"; // once per session: shown or dismissed

/**
 * Floating WhatsApp contact built on the brand symbol (public/brand/logo-symbol-white.webp).
 * The button arrives quietly after a short delay. The small card opens on tap, or once per
 * session by itself after the visitor has scrolled past the hero; closing it is remembered
 * for the session. Not a modal: nothing blocks the page. Motion: opacity + 8px, 180 ms.
 */
export function WhatsAppContact({ labels }: { labels: Labels }) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const cardId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1200);
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (seen) return () => window.clearTimeout(t);

    let teaser = 0;
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.8 || teaser) return;
      teaser = window.setTimeout(() => {
        try {
          sessionStorage.setItem(TEASER_KEY, "1");
        } catch {}
        setOpen(true);
      }, 1500);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(teaser);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
    setOpen((o) => !o);
  };

  return (
    <div className="wa-contact" data-ready={ready} data-open={open}>
      <div id={cardId} role="dialog" aria-modal="false" aria-labelledby={`${cardId}-t`} className="wa-card card-depth" inert={!open}>
        <button type="button" onClick={toggle} aria-label={labels.close} className="wa-close">
          <Icon name="close" size={18} />
        </button>
        <p id={`${cardId}-t`} className="font-display text-[1.05rem] font-bold leading-snug text-ink">
          {labels.title}
        </p>
        <p className="mt-1 pr-4 text-[0.92rem] leading-relaxed text-muted">{labels.text}</p>
        <a
          href={whatsappUrl(labels.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-sm mt-4 w-full"
          onClick={() => setOpen(false)}
        >
          <Icon name="whatsapp" size={18} />
          <span>{labels.cta}</span>
        </a>
      </div>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={cardId}
        aria-label={labels.open}
        className="wa-button"
      >
        <Image src="/brand/logo-symbol-white.webp" alt="" width={44} height={30} className="h-auto w-[44px]" unoptimized />
      </button>
    </div>
  );
}
