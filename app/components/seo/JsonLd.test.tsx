import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JsonLd } from './JsonLd';

vi.mock('@/config/site', () => ({
  siteConfig: {
    name: 'Batista Doleo & Asociados',
    url: 'https://batistaydoleo.com',
    ogImage: '/home.png',
    email: 'despacho@batistaydoleo.com',
    phone: '+1 809-843-4342',
    city: 'Santo Domingo',
    country: 'DO',
    instagram: 'https://www.instagram.com/batistaydoleo',
    openingHours: 'Mo-Fr 09:00-18:00',
  },
}));

describe('JsonLd', () => {
  it('inyecta script JSON-LD con schema correcto', () => {
    render(<JsonLd />);
    const script = screen.getByTestId('local-business-jsonld');
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute('type', 'application/ld+json');
  });

  it('contiene datos del negocio en el JSON', () => {
    render(<JsonLd />);
    const script = screen.getByTestId('local-business-jsonld');
    const content = JSON.parse(script.textContent || '{}');
    expect(content['@type']).toEqual(['LegalService', 'LocalBusiness']);
    expect(content.name).toBe('Batista Doleo & Asociados');
    expect(content.url).toBe('https://batistaydoleo.com');
    expect(content.email).toBe('despacho@batistaydoleo.com');
    expect(content.address).toEqual({
      '@type': 'PostalAddress',
      addressLocality: 'Santo Domingo',
      addressCountry: 'DO',
    });
  });
});