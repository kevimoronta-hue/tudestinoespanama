"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HIDDEN: Keyframe = { opacity: 0, transform: "translateY(14px)" };
const SHOWN: Keyframe = { opacity: 1, transform: "none" };

/**
 * One IntersectionObserver for the whole site. Elements opt in with `data-reveal`
 * (section headings and card grids only — never individual sentences).
 *
 * Uses the Web Animations API instead of toggling attributes/classes, so React's
 * markup is never mutated (no hydration mismatch) and content stays visible without
 * JS. Anything already on screen is left alone; reduced motion disables it entirely.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const holds = new Map<Element, Animation>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          holds.get(e.target)?.cancel();
          holds.delete(e.target);
          e.target.animate([HIDDEN, SHOWN], { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const el of document.querySelectorAll("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue; // already in view
      // Hold the hidden state until the element scrolls into view.
      holds.set(el, el.animate([HIDDEN, HIDDEN], { duration: 1, fill: "forwards" }));
      io.observe(el);
    }

    // Never leave content hidden for printing.
    const releaseAll = () => holds.forEach((a) => a.cancel());
    window.addEventListener("beforeprint", releaseAll);

    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", releaseAll);
      releaseAll();
    };
  }, [pathname]);

  return null;
}
