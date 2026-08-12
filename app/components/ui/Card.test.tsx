import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renderiza con children', () => {
    render(<Card>Contenido</Card>);
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });

  it('aplica variante bordered por defecto', () => {
    render(<Card>Bordered</Card>);
    const card = screen.getByText('Bordered').closest('a');
    expect(card?.className).toContain('border-gray-300');
  });

  it('aplica variante default', () => {
    render(<Card variant="default">Default</Card>);
    const card = screen.getByText('Default').closest('a');
    expect(card?.className).toContain('bg-white');
  });

  it('aplica padding md por defecto', () => {
    render(<Card>Padding</Card>);
    const card = screen.getByText('Padding').closest('a');
    expect(card?.className).toContain('p-6');
  });

  it('aplica padding personalizado', () => {
    render(<Card padding="lg">Large</Card>);
    const card = screen.getByText('Large').closest('a');
    expect(card?.className).toContain('p-8');
  });

  it('maneja href con target _blank y rel cuando se pasa external', () => {
    render(<Card href="https://example.com" external>Externo</Card>);
    const card = screen.getByText('Externo').closest('a');
    expect(card?.href).toBe('https://example.com/');
    expect(card?.target).toBe('_blank');
    expect(card?.rel).toContain('noopener noreferrer');
  });
});