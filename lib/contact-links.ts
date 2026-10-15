/** Public contact channels — single source for the footer and the WhatsApp widget. */
export const WHATSAPP_NUMBER = "50765750380"; // +507 6575 0380

export function whatsappUrl(message?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/bayronward/" },
  { key: "whatsapp", label: "WhatsApp", href: whatsappUrl() },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bayronward?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
] as const;
