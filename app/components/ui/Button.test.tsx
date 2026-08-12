import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza con texto', () => {
    render(<Button>Hola</Button>);
    expect(screen.getByRole('button', { name: 'Hola' })).toBeInTheDocument();
  });

  it('aplica variante primary por defecto', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-black');
  });

  it('aplica variante secondary', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-gray-300');
  });

  it('deshabilita cuando isLoading', () => {
    render(<Button isLoading>Cargando</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('deshabilita con prop disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('aplica clase custom', () => {
    render(<Button className="mi-clase">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('mi-clase');
  });
});