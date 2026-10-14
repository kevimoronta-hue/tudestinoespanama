import type { FlagCode } from "@/lib/i18n";

/**
 * Small inline SVG flags (3:2). Emoji flags are not used: Windows renders them
 * as two letters. Decorative — the language name is always next to the flag.
 */
const STAR = "M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.3633,0.118 L0.5878,0.809 L0,0.382 L-0.5878,0.809 L-0.3633,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z";

function Shapes({ code }: { code: FlagCode }) {
  switch (code) {
    case "pa":
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          <rect x="15" width="15" height="10" fill="#DA121A" />
          <rect y="10" width="15" height="10" fill="#072357" />
          <path d={STAR} transform="translate(7.5 5) scale(2.6)" fill="#072357" />
          <path d={STAR} transform="translate(22.5 15) scale(2.6)" fill="#DA121A" />
        </>
      );
    case "us":
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
          ))}
          <rect width="13" height={(20 * 7) / 13} fill="#3C3B6E" />
        </>
      );
    case "fr":
      return (
        <>
          <rect width="10" height="20" fill="#0055A4" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#EF4135" />
        </>
      );
    case "de":
      return (
        <>
          <rect width="30" height="6.67" fill="#000" />
          <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
          <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
        </>
      );
    case "it":
      return (
        <>
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#CE2B37" />
        </>
      );
  }
}

export function Flag({ code, size = 20 }: { code: FlagCode; size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 30 20"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgb(0_0_0/0.12)]"
    >
      <Shapes code={code} />
    </svg>
  );
}
