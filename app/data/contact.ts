import { siteConfig } from '../config/site';

export interface ContactItem {
  title: string;
  value: string;
  href: string;
  external: boolean;
}

export const contactItems: readonly ContactItem[] = [
  {
    title: 'WhatsApp Dr. Batista',
    value: siteConfig.phone.replace('+1 ', ''),
    href: `https://wa.me/${siteConfig.whatsappDoctor.replace(/\D/g, '')}`,
    external: true,
  },
  {
    title: 'Correo electrónico',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
] as const;

export type ContactItemType = (typeof contactItems)[number];