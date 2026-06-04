'use client';

import React from 'react';

// ============================================================
// Button variants and sizes
// ============================================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-foreground text-background hover:opacity-80 focus-visible:ring-foreground',
  secondary:
    'bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background focus-visible:ring-foreground',
  ghost:
    'bg-transparent text-foreground hover:bg-foreground/10 focus-visible:ring-foreground',
};

// All sizes enforce a minimum 44×44px touch target (Requirement 8.6)
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] min-w-[44px] px-4 py-2 text-sm',
  md: 'min-h-[44px] min-w-[44px] px-6 py-3 text-base',
  lg: 'min-h-[44px] min-w-[44px] px-8 py-4 text-lg',
};

// ============================================================
// Button props
// ============================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as a different element (e.g. 'a') while keeping button styles */
  asChild?: boolean;
}

// ============================================================
// Button component
// ============================================================

/**
 * Reusable button primitive.
 *
 * - Variants: primary, secondary, ghost
 * - Sizes: sm, md, lg (all enforce ≥44×44px touch target — Requirement 8.6)
 * - Keyboard accessible with visible focus indicator (Requirement 8.3)
 *
 * Validates: Requirements 8.3, 8.6
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      children,
      disabled,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
      'disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

    const classes = [base, variantClasses[variant], sizeClasses[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
