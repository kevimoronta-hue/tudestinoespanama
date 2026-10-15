"use client";

import { useEffect, useRef, useState } from "react";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Progressive enhancement over the poster:
 * - picks ONE source (portrait → 9:16, landscape → 16:9) so a device never downloads both;
 * - never starts with prefers-reduced-motion, Data Saver or 2G connections;
 * - fades in only once frames are actually playing, so the poster stays visible meanwhile;
 * - resumes after the browser suspended it (iOS/Android app switch, screen lock, tab
 *   change, back/forward cache): on visibilitychange / pageshow / focus it just calls
 *   play() again — never load(), so nothing is re-downloaded. There is no user pause
 *   control, so any pause while visible can only come from the browser.
 * The video is decorative (aria-hidden): all information lives in the HTML.
 */
export function HeroVideoPlayer({ mobileSrc, desktopSrc }: { mobileSrc?: string; desktopSrc?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (reduce.matches || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;

    const landscape = window.matchMedia("(min-aspect-ratio: 1/1)").matches;
    const src = landscape ? desktopSrc : mobileSrc;
    if (!src) return;

    video.muted = true; // iOS requires the property, not only the attribute
    video.src = src;

    const resume = () => {
      if (document.visibilityState !== "visible" || reduce.matches || !video.paused) return;
      video.muted = true;
      video.play().catch(() => {
        /* Autoplay refused (e.g. Low Power Mode) — the poster remains. */
      });
    };
    resume();

    const onVisibility = () => resume();
    const onPageShow = () => resume(); // also fires when restored from the bfcache
    const onReduce = () => {
      if (reduce.matches) {
        video.pause();
        setPlaying(false);
      } else resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onVisibility);
    reduce.addEventListener("change", onReduce);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onVisibility);
      reduce.removeEventListener("change", onReduce);
    };
  }, [mobileSrc, desktopSrc]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
