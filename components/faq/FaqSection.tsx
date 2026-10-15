import { FAQ } from "@/content/faq";
import { whatsappUrl } from "@/lib/contact-links";
import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { REFERENCE_INSTITUTIONS } from "@/lib/institutions";
import { JsonLd } from "../ui/Editorial";
import { SectionHeading } from "../ui/SectionHeading";
import { FaqAccordion, type FaqItemView } from "./FaqAccordion";

/** Home FAQ — same entries the assistant uses as knowledge (content/faq.ts). */
export function FaqSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const linkLabels: Partial<Record<string, string>> = {
    discover: dict.nav.discover,
    live: dict.nav.live,
    invest: dict.nav.invest,
    explore: dict.nav.explore,
    opportunities: dict.pages.opportunities.title,
    about: dict.nav.about,
    contact: dict.nav.contact,
  };
  const items: FaqItemView[] = FAQ[locale].map((f) => ({
    id: f.id,
    q: f.q,
    a: f.a,
    links: [
      ...(f.links ?? []).map((k) => ({ href: href(k, locale), label: linkLabels[k] ?? k, external: false })),
      ...(f.whatsapp ? [{ href: whatsappUrl(dict.whatsapp.message), label: "WhatsApp", external: true }] : []),
      ...(f.institutions ? REFERENCE_INSTITUTIONS.map((i) => ({ href: i.url, label: i.name, external: true })) : []),
    ],
  }));
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ[locale].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <JsonLd data={ld} />
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <SectionHeading id="faq-title" eyebrow={dict.faq.eyebrow} title={dict.faq.title} intro={dict.faq.intro} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={items} askLabel={dict.faq.ask} newTab={dict.a11y.newTab} />
        </div>
      </div>
    </section>
  );
}
