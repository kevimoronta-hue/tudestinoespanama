import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { ContactForm } from "../forms/ContactForm";
import { SectionHeading } from "../ui/SectionHeading";

/** Final call to action with the contact form embedded. */
export function FinalCTA({
  locale,
  dict,
  id = "contacto",
  title = dict.home.contact.title,
  intro = dict.home.contact.intro,
  eyebrow = dict.home.contact.eyebrow,
}: {
  locale: Locale;
  dict: Dictionary;
  id?: string;
  title?: string;
  intro?: string;
  eyebrow?: string;
}) {
  // One large surface that straddles the sand → ocean seam, so the contact block and the
  // footer read as a single closing composition instead of a box glued to a blue band.
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-[linear-gradient(180deg,var(--sand)_0%,var(--sand)_62%,var(--ocean-deep)_62%,var(--ocean-deep)_100%)] pt-20 sm:pt-28"
    >
      <div className="container-site">
        <div className="grid gap-10 rounded-[var(--radius-surface)] bg-white p-6 shadow-[0_30px_80px_-50px_rgb(6_34_48/0.55)] sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
          <div className="space-y-6 lg:col-span-5">
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
            <ol className="space-y-3 text-muted">
              {dict.pages.contact.next.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ocean-mist font-display text-sm font-bold text-ocean">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <ContactForm locale={locale} labels={dict.form} privacyHref={href("privacy", locale)} />
          </div>
        </div>
      </div>
    </section>
  );
}
