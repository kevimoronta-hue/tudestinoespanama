import Image from "next/image";
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
  // One large two-part card straddling the sand → brand-blue seam, so the contact block and
  // the footer read as a single closing composition. Content + form on one side, a real
  // Panama photo on the other (stacked, photo first, on phones).
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-[linear-gradient(180deg,var(--sand)_0%,var(--sand)_62%,var(--brand-ocean-navy)_62%,var(--brand-ocean-navy)_100%)] pt-20 sm:pt-28"
    >
      <div className="container-site">
        <div className="card-depth grid overflow-hidden rounded-[var(--radius-surface)] bg-white lg:grid-cols-12">
          <div className="relative h-56 sm:h-80 lg:order-last lg:col-span-5 lg:h-auto lg:min-h-[640px]">
            <Image
              src="/images/contacto-ventana-skyline.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-[45%_34%] lg:object-[55%_50%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_22_31/0)_60%,rgb(4_22_31/0.18)_100%)]" />
          </div>
          <div className="space-y-8 p-6 sm:p-10 lg:col-span-7 lg:p-14">
            <div className="space-y-6">
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
            <ContactForm locale={locale} labels={dict.form} privacyHref={href("privacy", locale)} />
          </div>
        </div>
      </div>
    </section>
  );
}
