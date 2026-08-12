export const siteConfig = {
  name: 'Batista Doleo & Asociados',
  tagline: 'Más de 3 décadas en el ejercicio jurídico',
  description:
    'Bufete de abogados con más de 3 décadas de ejercicio jurídico. Bienes raíces, departamento legal y asesoría integral en República Dominicana.',
  url: 'https://batistaydoleo.com',
  ogImage: '/home.png',
  locale: 'es_DO',
  country: 'DO',
  city: 'Santo Domingo',
  phone: '+1 809-843-4342',
  whatsappReception: '+1 829-703-8306',
  whatsappDoctor: '+1 809-843-4342',
  email: 'despacho@batistaydoleo.com',
  instagram: 'https://www.instagram.com/batistaydoleo',
  openingHours: 'Mo-Fr 09:00-18:00',
  keywords: [
    'abogados República Dominicana',
    'bufete de abogados',
    'bienes raíces',
    'derecho inmobiliario',
    'Batista Doleo',
  ] as string[],
} as const;

export type SiteConfig = typeof siteConfig;