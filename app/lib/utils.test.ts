import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('combina clases simples', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignora valores falsy', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });

  it('acepta objetos condicionales', () => {
    const active = true;
    expect(cn('base', { active, disabled: false })).toBe('base active');
  });

  it('combina arrays anidados', () => {
    expect(cn(['a', ['b', 'c']], 'd')).toBe('a b c d');
  });

  it('concatena duplicados (clsx no deduplica)', () => {
    expect(cn('a', 'b', 'a')).toBe('a b a');
  });
});