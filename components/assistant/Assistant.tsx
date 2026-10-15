"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/contact-links";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SCROLLED_AT } from "@/lib/scroll";
import { Icon } from "../ui/Icon";

/*
 * Beta AI assistant: floating launcher (brand symbol) + compact chat panel.
 * Conversation logic adapted from the Scalia FAQ agent (browser keeps the conversation in
 * sessionStorage and sends its recent turns to /api/assistant); no Scalia identity.
 *
 * Launcher visibility: on the home page it stays hidden over the hero and appears at the
 * same scroll offset as the navbar's glass state (lib/scroll.ts). On other pages it
 * appears after a short delay. Once shown it stays for the rest of the visit (this
 * component lives in the locale layout, so client navigation keeps the state); a full
 * reload starts hidden again.
 */

type LinkOut = { key: string; href: string; label: string };
type Msg = { role: "user" | "assistant"; content: string; links?: LinkOut[]; whatsapp?: boolean; local?: true };

const KEY = "tdp.assistant.v1";
const SEND_MAX = 12;
const MAX_LEN = 500;
const OPEN_EVENT = "tdep:assistant-open";
const TEASER_KEY = "tdp.assistant.teaser";

/** Lets any component (e.g. the FAQ) open the assistant. */
export function openAssistant(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question } }));
}

export function Assistant({
  locale,
  labels,
  siteName,
  whatsappMessage,
}: {
  locale: Locale;
  labels: Dictionary["assistant"];
  siteName: string;
  whatsappMessage: string;
}) {
  const pathname = usePathname() ?? "";
  const isHome = pathname === `/${locale}`;
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* ---- launcher visibility: hidden over the home hero, sticky once shown ---- */
  useEffect(() => {
    if (visible) return;
    if (!isHome) {
      const t = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(t);
    }
    const check = () => {
      if (window.scrollY > SCROLLED_AT) setVisible(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isHome, visible]);

  useEffect(() => {
    if (visible) track("assistant_launcher_visible", { locale });
  }, [visible, locale]);

  /* ---- one-time invitation (once per session) ---- */
  const [teaser, setTeaser] = useState(false);
  useEffect(() => {
    if (!visible) return;
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      return;
    }
    const on = window.setTimeout(() => setTeaser(true), 1500);
    const off = window.setTimeout(() => setTeaser(false), 5500);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, [visible]);

  /* ---- session conversation ---- */
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring session state once on mount
      if (Array.isArray(saved)) setMsgs(saved.filter((m) => m && typeof m.content === "string").slice(-40));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(msgs.filter((m) => !m.local).slice(-40)));
    } catch {}
  }, [msgs]);

  /* ---- open / close ---- */
  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || busy) return;
      if (content.length > MAX_LEN) return setError(labels.tooLong);
      setError("");
      setText("");
      const next: Msg[] = [...msgs, { role: "user", content }];
      setMsgs(next);
      setBusy(true);
      track("assistant_question_sent", { locale, turn: next.filter((m) => m.role === "user").length });
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            messages: next
              .filter((m) => !m.local)
              .slice(-SEND_MAX)
              .map(({ role, content }) => ({ role, content })),
          }),
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok && typeof body.text === "string") {
          setMsgs((m) => [
            ...m,
            {
              role: "assistant",
              content: body.text,
              links: Array.isArray(body.links) ? body.links : [],
              whatsapp: !!body.whatsapp,
              ...(body.kind === "answer" ? {} : { local: true as const }),
            },
          ]);
        } else {
          const msg = res.status === 429 ? labels.rateLimited : body.error === "too_long" ? labels.tooLong : labels.error;
          setMsgs((m) => [...m, { role: "assistant", content: msg, whatsapp: res.status !== 422, local: true }]);
        }
      } catch {
        setMsgs((m) => [...m, { role: "assistant", content: labels.error, whatsapp: true, local: true }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, labels, locale, msgs],
  );

  const show = useCallback((question?: string) => {
    setVisible(true);
    setOpen(true);
    setTeaser(false);
    track("assistant_opened", { locale });
    if (question) void send(question);
  }, [locale, send]);

  useEffect(() => {
    const onOpen = (e: Event) => show((e as CustomEvent<{ question?: string }>).detail?.question);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    // Desktop: type right away. Touch: don't pop the keyboard over the panel on open.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    window.setTimeout(() => (coarse ? panelRef.current?.focus() : inputRef.current?.focus()), 60);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* ---- iOS / Android keyboard: size the phone sheet to the visual viewport ---- */
  useEffect(() => {
    const vv = window.visualViewport;
    const panel = panelRef.current;
    if (!open || !vv || !panel) return;
    const fit = () => {
      panel.style.setProperty("--vv-h", `${vv.height}px`);
      panel.style.setProperty("--vv-top", `${vv.offsetTop}px`);
    };
    fit();
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    return () => {
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
    };
  }, [open]);

  /* ---- keep the log pinned to the latest message ---- */
  useLayoutEffect(() => {
    const log = logRef.current;
    if (log && open) log.scrollTop = log.scrollHeight;
  }, [msgs, busy, open]);

  /* ---- textarea auto-grow ---- */
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [text]);

  const welcomeOnly = msgs.length === 0;
  const wa = whatsappUrl(whatsappMessage);

  return (
    <div className="ai" data-visible={visible} data-open={open}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="ai-panel"
        inert={!open}
      >
        {/* Brand band: the white body slides over its lower edge. */}
        <header className="ai-head">
          <span className="ai-head-mark" aria-hidden="true">
            <Image src="/brand/logo-symbol-white.webp" alt="" width={44} height={30} className="h-auto w-[30px]" unoptimized />
          </span>
          <div className="min-w-0 flex-1">
            <p id={titleId} className="truncate font-display text-[1.05rem] font-bold leading-tight tracking-[-0.01em] text-white">
              {siteName}
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-[0.8rem] text-white/70">
              {labels.name}
              <span className="ai-beta">{labels.beta}</span>
            </p>
          </div>
          <button type="button" onClick={close} aria-label={labels.close} className="ai-head-close">
            <Icon name="close" size={20} />
          </button>
        </header>

        <div ref={logRef} className="ai-log" role="log" aria-live="polite" aria-label={labels.log}>
          <div className="ai-welcome">
            {labels.welcome.split("\n").map((l, i) => (
              <p key={l} className={i === 0 ? "text-ink" : "text-muted"}>
                {l}
              </p>
            ))}
          </div>

          {welcomeOnly ? (
            <div>
              <p className="ai-kicker">{labels.suggestionsTitle}</p>
              <ul className="ai-suggest">
                {labels.suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => {
                        track("suggested_question_clicked", { locale });
                        void send(s);
                      }}
                    >
                      <span>{s}</span>
                      <Icon name="arrowRight" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="ai-msg-user">
                {m.content}
              </div>
            ) : (
              <div key={i} className="ai-msg-bot">
                {m.content.split(/\n+/).map((l, k) => (
                  <p key={k}>{l}</p>
                ))}
                {m.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.links.map((l) => (
                      <Link key={l.key} href={l.href} className="ai-link" onClick={() => window.matchMedia("(max-width: 639px)").matches && close()}>
                        {l.label}
                        <Icon name="arrowRight" size={14} />
                      </Link>
                    ))}
                  </div>
                ) : null}
                {m.whatsapp ? (
                  <div className="ai-wa">
                    <p>{labels.whatsappPrompt}</p>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="ai-wa-btn" onClick={() => track("whatsapp_clicked", { locale, from: "assistant" })}>
                      <Icon name="whatsapp" size={17} />
                      <span>{labels.whatsappCta}</span>
                    </a>
                  </div>
                ) : null}
              </div>
            ),
          )}

          {busy ? (
            <div className="ai-typing" aria-label={labels.typing} role="status">
              <i />
              <i />
              <i />
            </div>
          ) : null}
        </div>

        <form
          className="ai-foot"
          onSubmit={(e) => {
            e.preventDefault();
            void send(text);
          }}
        >
          <div className="ai-input">
            <label htmlFor={`${titleId}-q`} className="sr-only">
              {labels.placeholder}
            </label>
            <textarea
              id={`${titleId}-q`}
              ref={inputRef}
              rows={1}
              value={text}
              maxLength={MAX_LEN}
              placeholder={labels.placeholder}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${titleId}-err` : `${titleId}-note`}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  void send(text);
                }
              }}
            />
            <button type="submit" className="ai-send" aria-label={labels.send} disabled={busy || !text.trim()}>
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
          {error ? (
            <p id={`${titleId}-err`} role="alert" className="mt-2 text-[0.8rem] text-error">
              {error}
            </p>
          ) : (
            <p id={`${titleId}-note`} className="mt-2.5 text-center text-[0.7rem] leading-snug text-muted/80">
              {labels.note}
            </p>
          )}
        </form>
      </div>

      <button
        type="button"
        className="ai-teaser"
        data-show={teaser && visible && !open}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => show()}
      >
        {labels.teaser}
      </button>

      <button
        ref={launcherRef}
        type="button"
        className="ai-launcher"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-haspopup="dialog"
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : true}
        onClick={() => (open ? close() : show())}
      >
        <span className="ai-ico ai-ico-mark" aria-hidden="true">
          <Image src="/brand/logo-symbol-white.webp" alt="" width={44} height={30} className="h-auto w-[40px]" unoptimized />
        </span>
        <span className="ai-ico ai-ico-close" aria-hidden="true">
          <Icon name="close" size={24} />
        </span>
      </button>
    </div>
  );
}

