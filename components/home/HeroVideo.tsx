import { existsSync } from "node:fs";
import path from "node:path";
import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import mediaSources from "@/data/media-sources.json";
import { creditLine } from "@/lib/credits";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { TrackedLink } from "../ui/TrackedLink";
import { HeroVideoPlayer } from "./HeroVideoPlayer";

const VIDEO = {
  mobile: "/video/hero-panama-mobile-9x16.mp4",
  desktop: "/video/hero-panama-desktop-16x9.mp4",
};
const POSTER = {
  mobile: "/video/hero-panama-mobile-poster.webp",
  desktop: "/video/hero-panama-desktop-poster.webp",
};

/** A source is only offered once the final montage exists in /public (see scripts/build-hero-video.sh). */
function available(src: string): string | undefined {
  return existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
}

export function HeroVideo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const poster = mediaSources.items.find((m) => m.key === "05-nature");
  const credit = poster ? creditLine(poster, dict) : "";

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex h-[100svh] min-h-[600px] overflow-hidden bg-ocean-deep text-white">
      {/* Poster: rendered in the HTML, visible immediately and used as LCP element. */}
      <picture>
        <source media="(min-aspect-ratio: 1/1)" srcSet={POSTER.desktop} type="image/webp" width={1920} height={1080} />
        <img
          src={POSTER.mobile}
          alt=""
          width={1080}
          height={1920}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <HeroVideoPlayer mobileSrc={available(VIDEO.mobile)} desktopSrc={available(VIDEO.desktop)} />

      {/* Progressive overlay: protects the navbar at the top and the text block. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_34_48/0.55)_0%,rgb(6_34_48/0.05)_22%,rgb(6_34_48/0.15)_45%,rgb(6_34_48/0.88)_100%)] md:bg-[linear-gradient(180deg,rgb(6_34_48/0.5)_0%,rgb(6_34_48/0)_25%),linear-gradient(90deg,rgb(6_34_48/0.82)_0%,rgb(6_34_48/0.45)_45%,rgb(6_34_48/0)_75%)]"
      />

      <div className="container-site relative flex w-full flex-col justify-end pb-[max(40px,calc(env(safe-area-inset-bottom)+28px))] md:justify-center md:pb-0 md:pt-[var(--header-h)]">
        <div className="max-w-[46rem] animate-fade-up md:ml-[4%]">
          <p className="sr-only">{dict.hero.posterAlt}</p>
          <h1 id="hero-title" className="text-display !text-white">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{dict.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={href("discover", locale)}
              event="hero_primary_cta_click"
              eventProps={{ locale }}
              className={buttonClasses("primary", "!px-7 !py-3.5")}
            >
              {dict.hero.primary}
              <Icon name="arrowRight" size={18} />
            </TrackedLink>
            <TrackedLink
              href={href("opportunities", locale)}
              event="hero_secondary_cta_click"
              eventProps={{ locale }}
              className={buttonClasses("outline-light", "!px-7 !py-3.5")}
            >
              {dict.hero.secondary}
            </TrackedLink>
          </div>
        </div>
      </div>

      <p className="absolute bottom-2 right-3 hidden text-[11px] text-white/60 md:block">{credit}</p>
    </section>
  );
}
