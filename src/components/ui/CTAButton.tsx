'use client';

import React from 'react';
import Button, { type ButtonProps } from './Button';

// ============================================================
// CTAButton props
// ============================================================

export interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Optional href — renders an anchor tag styled as a button */
  href?: string;
  /** Open link in new tab (only relevant when href is provided) */
  external?: boolean;
}

// ============================================================
// CTAButton component
// ============================================================

/**
 * Call-to-Action button — a styled variant of Button with primary appearance
 * and an optional arrow indicator to draw attention.
 *
 * When `href` is provided the component renders as an accessible <a> element
 * while preserving all button styles and touch-target requirements.
 *
 * Validates: Requirements 8.3, 8.6
 */
const CTAButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CTAButtonProps
>(({ href, external, size = 'md', className = '', children, ...rest }, ref) => {
  const ctaClass =
    'bg-foreground text-background hover:opacity-80 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground ' +
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 ' +
    'disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

  const sizeMap: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'min-h-[44px] min-w-[44px] px-4 py-2 text-sm',
    md: 'min-h-[44px] min-w-[44px] px-6 py-3 text-base',
    lg: 'min-h-[44px] min-w-[44px] px-8 py-4 text-lg',
  };

  const classes = [ctaClass, sizeMap[size], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        // Spread remaining props that are valid on <a>
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {/* Arrow indicator */}
        <span aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <Button
      ref={ref as React.Ref<HTMLButtonElement>}
      variant="primary"
      size={size}
      className={`gap-2 font-semibold ${className}`}
      {...rest}
    >
      {children}
      {/* Arrow indicator */}
      <span aria-hidden="true">→</span>
    </Button>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;
