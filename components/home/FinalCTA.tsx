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
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-off-white py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          <ul className="space-y-3 text-muted">
            {dict.pages.contact.next.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-100 font-display text-sm font-bold text-blue-800">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgb(6_34_48/0.4)] sm:p-10">
          <ContactForm locale={locale} labels={dict.form} privacyHref={href("privacy", locale)} />
        </div>
      </div>
    </section>
  );
}
