import { siteConfig } from '../config/site';

export interface Service {
  title: string;
  description: string;
  href: string;
  external: boolean;
  label: string;
}

export const services: readonly Service[] = [
  {
    title: 'Bienes Raíces',
    description:
      'Fotos y videos de nuestros apartamentos disponibles. Seguimiento de su inversión inmobiliaria paso a paso.',
    href: siteConfig.instagram,
    external: true,
    label: 'Ir a Instagram',
  },
  {
    title: 'Departamento Legal',
    description:
      'Comuníquese con la recepción de nuestro despacho vía WhatsApp para consultas y orientación jurídica.',
    href: `https://wa.me/${siteConfig.whatsappDoctor.replace(/\D/g, '')}`,
    external: true,
    label: 'WhatsApp',
  },
  {
    title: 'Dr. Eleuterio Batista',
    description:
      'Contacto directo con el Dr. Batista (809-843-4342) para seguimiento de su caso.',
    href: `https://wa.me/${siteConfig.whatsappDoctor.replace(/\D/g, '')}`,
    external: true,
    label: 'WhatsApp directo',
  },
] as const;

export type ServiceItem = (typeof services)[number];