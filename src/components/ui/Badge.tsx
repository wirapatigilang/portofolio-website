'use client';

import React from 'react';
import type {
  ProjectCategory,
  PhotoCategory,
  VideoCategory,
} from '@/types/index';

// ============================================================
// Badge variants
// ============================================================

/**
 * All known category values across the three content domains.
 * Tech stack items use the 'default' variant.
 */
type BadgeCategory = ProjectCategory | PhotoCategory | VideoCategory;

type BadgeVariant = 'default' | BadgeCategory;

/**
 * Color map for each category value.
 * Tech stack items (variant = 'default') use a neutral style.
 *
 * Validates: Requirements 3.2, 3.3
 */
const variantClasses: Record<BadgeVariant, string> = {
  // ── default (tech stack) ──────────────────────────────────
  default:
    'bg-foreground/10 text-foreground border border-foreground/20',

  // ── ProjectCategory ───────────────────────────────────────
  'Web App':
    'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  'Mobile App':
    'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  'API':
    'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  'Open Source':
    'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',

  // ── PhotoCategory ─────────────────────────────────────────
  'Portrait':
    'bg-pink-100 text-pink-800 border border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
  'Landscape':
    'bg-teal-100 text-teal-800 border border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
  'Event':
    'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
  'Street':
    'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600',
  'Product':
    'bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',

  // ── VideoCategory ─────────────────────────────────────────
  'Cinematic':
    'bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600',
  'Commercial':
    'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  'Short Film':
    'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
  'Motion Graphics':
    'bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
};

// ============================================================
// Badge props
// ============================================================

export interface BadgeProps {
  /** Text label displayed inside the badge */
  label: string;
  /**
   * Visual variant that controls the color scheme.
   * Pass a category value for color-coded badges, or omit / pass 'default'
   * for neutral tech-stack badges.
   */
  variant?: BadgeVariant;
  /** Additional Tailwind classes to merge */
  className?: string;
}

// ============================================================
// Badge component
// ============================================================

/**
 * Pill/badge component for displaying tech stack items and content categories.
 *
 * - Neutral style for tech stack labels (variant = 'default')
 * - Color-coded style for ProjectCategory, PhotoCategory, and VideoCategory values
 * - Accessible: uses `<span>` with `role="status"` omitted intentionally —
 *   badges are purely presentational labels, not live regions.
 *   Screen readers will read the text content naturally.
 *
 * Validates: Requirements 3.2, 3.3
 */
const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className = '',
}) => {
  const colorClasses =
    variantClasses[variant] ?? variantClasses['default'];

  const classes = [
    'inline-flex items-center justify-center',
    'rounded-full px-2.5 py-0.5',
    'text-xs font-medium',
    'whitespace-nowrap',
    colorClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label}</span>;
};

Badge.displayName = 'Badge';

export default Badge;
