import Script from 'next/script';
import { siteConfig } from '../../config/site';

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'LocalBusiness'],
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.city,
    addressCountry: siteConfig.country,
  },
  areaServed: 'República Dominicana',
  openingHours: siteConfig.openingHours,
  sameAs: [siteConfig.instagram],
} as const;

export function JsonLd() {
  return (
    <Script
      data-testid="local-business-jsonld"
      id="local-business-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  );
}