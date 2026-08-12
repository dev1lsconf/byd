import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

vi.mock('@/config/site', () => ({
  siteConfig: {
    name: 'Batista Doleo & Asociados',
    city: 'Santo Domingo',
  },
}));

describe('Footer', () => {
  it('renderiza copyright con año actual', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Batista Doleo & Asociados. Todos los derechos reservados.`)).toBeInTheDocument();
  });

  it('renderiza ciudad y país', () => {
    render(<Footer />);
    expect(screen.getByText('Santo Domingo, República Dominicana')).toBeInTheDocument();
  });
});