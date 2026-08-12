import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, children, href, ...props }, ref) => {
    const hrefValue = href ?? '';
    const isExternal = hrefValue.startsWith('http') || hrefValue.startsWith('mailto:') || hrefValue.startsWith('tel:') || hrefValue.startsWith('wa.me');

    return (
      <a
        ref={ref}
        href={hrefValue}
        {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        className={cn('inline-flex items-center gap-1 text-sm font-semibold text-gray-600 transition-transform group-hover:translate-x-0.5', className)}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            data-testid="external-link-icon"
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
          </svg>
        )}
      </a>
    );
  }
);

ExternalLink.displayName = 'ExternalLink';