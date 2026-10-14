"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";
import { systemCopy } from "@/lib/dictionaries/system";
import { isLocale } from "@/lib/i18n";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const c = systemCopy[isLocale(params?.locale) ? params.locale : "es"];
  useEffect(() => {
    // Digest only — no user data.
    console.error("[error-boundary]", error.digest ?? error.message);
  }, [error]);
  return (
    <section className="container-site py-24">
      <ErrorState
        title={c.errorTitle}
        text={c.errorText}
        action={
          <button type="button" onClick={reset} className={buttonClasses("primary")}>
            {c.retry}
          </button>
        }
      />
    </section>
  );
}
