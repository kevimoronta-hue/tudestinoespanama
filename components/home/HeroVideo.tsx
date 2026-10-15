import { existsSync } from "node:fs";
import path from "node:path";
import type { Dictionary } from "@/lib/dictionaries";
import { HERO_MEDIA } from "@/lib/hero-media";
import { href, type Locale } from "@/lib/i18n";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { TrackedLink } from "../ui/TrackedLink";
import { HeroVideoPlayer } from "./HeroVideoPlayer";

const { desktop, mobile } = HERO_MEDIA;

/** A source is only offered once the final montage exists in /public (see scripts/build-hero-video.sh). */
function available(src: string): string | undefined {
  return existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
}

export function HeroVideo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex h-[100svh] min-h-[600px] overflow-hidden bg-ocean-deep text-white">
      {/* Poster: rendered in the HTML, visible immediately and used as LCP element. */}
      <picture>
        <source media="(min-aspect-ratio: 1/1)" srcSet={desktop.poster} type="image/webp" width={desktop.width} height={desktop.height} />
        <img
          src={mobile.poster}
          alt=""
          width={mobile.width}
          height={mobile.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <HeroVideoPlayer mobileSrc={available(mobile.video)} desktopSrc={available(desktop.video)} />

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
              className={buttonClasses("primary", "", "lg")}
            >
              {dict.hero.primary}
              <Icon name="arrowRight" size={18} />
            </TrackedLink>
            <TrackedLink
              href={href("opportunities", locale)}
              event="hero_secondary_cta_click"
              eventProps={{ locale }}
              className={buttonClasses("outline-light", "", "lg")}
            >
              {dict.hero.secondary}
            </TrackedLink>
          </div>
        </div>
      </div>

    </section>
  );
}
