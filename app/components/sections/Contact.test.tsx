import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

vi.mock('@/data/contact', () => ({
  contactItems: [
    {
      title: 'WhatsApp Dr. Batista',
      value: '809-843-4342',
      href: 'https://wa.me/18098434342',
      external: true,
    },
    {
      title: 'Correo electrónico',
      value: 'despacho@batistaydoleo.com',
      href: 'mailto:despacho@batistaydoleo.com',
      external: false,
    },
  ],
}));

vi.mock('@/config/site', () => ({
  siteConfig: {
    phone: '+18098434342',
  },
}));

describe('Contact', () => {
  it('renderiza título y descripción', () => {
    render(<Contact />);
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Escríbanos por el canal de su preferencia.')).toBeInTheDocument();
  });

  it('renderiza elementos de contacto', () => {
    render(<Contact />);
    expect(screen.getByText('WhatsApp Dr. Batista')).toBeInTheDocument();
    expect(screen.getByText('809-843-4342')).toBeInTheDocument();
    expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByText('despacho@batistaydoleo.com')).toBeInTheDocument();
  });

  it('links externos tienen target _blank y rel', () => {
    render(<Contact />);
    const waLink = screen.getByRole('link', { name: /WhatsApp Dr. Batista/ });
    expect(waLink).toHaveAttribute('target', '_blank');
    expect(waLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('link mailto no tiene target _blank', () => {
    render(<Contact />);
    const mailLink = screen.getByRole('link', { name: /Correo electrónico/ });
    expect(mailLink).toHaveAttribute('href', 'mailto:despacho@batistaydoleo.com');
  });

  it('renderiza botón Llamar ahora con tel:', () => {
    render(<Contact />);
    const callButton = screen.getByRole('link', { name: 'Llamar ahora' });
    expect(callButton).toHaveAttribute('href', 'tel:18098434342');
  });
});