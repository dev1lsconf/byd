import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Services } from './Services';
import React from 'react';

vi.mock('@/data/services', () => ({
  services: [
    {
      title: 'Servicio Test',
      description: 'Descripción test',
      href: 'https://example.com',
      external: true,
      label: 'Ir',
    },
  ],
}));

vi.mock('@/components/ui', () => ({
  Card: ({ children, href, external, ...props }: Record<string, unknown>) => (
    <a
      href={href as string}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-testid="service-card"
      {...props}
    >
      {children as React.ReactNode}
    </a>
  ),
  ExternalLink: ({ children, href }: Record<string, unknown>) => (
    <a
      href={href as string}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="external-link"
    >
      {children as React.ReactNode}
    </a>
  ),
}));

describe('Services', () => {
  it('renderiza la sección de servicios', () => {
    render(<Services />);
    expect(screen.getByText('Servicio Test')).toBeInTheDocument();
    expect(screen.getByText('Descripción test')).toBeInTheDocument();
  });

  it('renderiza card con href correcto', () => {
    render(<Services />);
    const card = screen.getByTestId('service-card') as HTMLAnchorElement;
    expect(card).toHaveAttribute('href', 'https://example.com');
  });

  it('aplica target _blank y rel en links externos', () => {
    render(<Services />);
    const link = screen.getByTestId('external-link') as HTMLAnchorElement;
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});