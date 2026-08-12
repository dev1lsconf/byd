import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

vi.mock('next/image', () => ({
  default: function Image({ src, alt, priority, ...props }: Record<string, unknown>) {
    return <img src={src as string} alt={alt as string} data-priority={priority ? 'true' : 'false'} {...props} />;
  },
}));

describe('Hero', () => {
  it('renderiza la imagen del logo', () => {
    render(<Hero />);
    const img = screen.getByAltText(/Logo de Batista Doleo/) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/home.png');
  });

  it('tiene priority en la imagen', () => {
    render(<Hero />);
    const img = screen.getByAltText(/Logo de Batista Doleo/) as HTMLImageElement;
    expect(img).toHaveAttribute('data-priority', 'true');
  });
});