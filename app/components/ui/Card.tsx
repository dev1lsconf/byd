import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  external?: boolean;
}

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  ({ className, variant = 'bordered', padding = 'md', external, children, ...props }, ref) => {
    const baseStyles = 'flex flex-col transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black';

    const variants = {
      default: 'bg-white',
      bordered: 'border border-gray-300 bg-gray-50 hover:border-black hover:bg-white',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <a
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Card.displayName = 'Card';