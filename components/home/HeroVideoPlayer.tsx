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
 * - fades in only once frames are actually playing, so the poster stays visible meanwhile.
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
    video.play().catch(() => {
      /* Autoplay refused (e.g. Low Power Mode) — the poster remains. */
    });

    const onReduce = () => {
      if (reduce.matches) {
        video.pause();
        setPlaying(false);
      }
    };
    reduce.addEventListener("change", onReduce);
    return () => reduce.removeEventListener("change", onReduce);
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
