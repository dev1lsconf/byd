import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExternalLink } from './ExternalLink';

describe('ExternalLink', () => {
  it('renderiza link interno sin target _blank', () => {
    render(<ExternalLink href="/page">Interno</ExternalLink>);
    const link = screen.getByRole('link', { name: 'Interno' }) as HTMLAnchorElement;
    expect(link.target).toBe('');
    expect(link.rel).toBe('');
  });

  it('renderiza link https con target _blank y rel', () => {
    render(<ExternalLink href="https://example.com">Externo</ExternalLink>);
    const link = screen.getByRole('link', { name: 'Externo' }) as HTMLAnchorElement;
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener noreferrer');
  });

  it('renderiza mailto con target _blank y rel', () => {
    render(<ExternalLink href="mailto:test@example.com">Email</ExternalLink>);
    const link = screen.getByRole('link', { name: 'Email' }) as HTMLAnchorElement;
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener noreferrer');
  });

  it('renderiza tel con target _blank y rel', () => {
    render(<ExternalLink href="tel:+123456789">Llamar</ExternalLink>);
    const link = screen.getByRole('link', { name: 'Llamar' }) as HTMLAnchorElement;
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener noreferrer');
  });

  it('incluye icono de enlace externo en hrefs externos', () => {
    render(<ExternalLink href="https://example.com">Con icono</ExternalLink>);
    const svg = screen.getByTestId('external-link-icon');
    expect(svg).toBeInTheDocument();
  });
});