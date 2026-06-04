'use client';

import React from 'react';
import Button from './Button';

// ============================================================
// EmptyState props
// ============================================================

export interface EmptyStateProps {
  /**
   * Label for the item type in Indonesian, e.g. "proyek", "foto", "video".
   * Used in the message: "Tidak ada {itemLabel} ditemukan untuk kategori ini."
   */
  itemLabel: string;
  /** Callback invoked when the "Tampilkan Semua" button is clicked. */
  onReset: () => void;
  /** Optional additional className for the wrapper element. */
  className?: string;
}

// ============================================================
// EmptyState component
// ============================================================

/**
 * Displayed when a filter returns no results.
 *
 * - Shows "Tidak ada [item] ditemukan untuk kategori ini."
 * - Provides a "Tampilkan Semua" button to reset the active filter.
 *
 * Validates: Requirements 3.7, 4.8, 5.7
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  itemLabel,
  onReset,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'flex flex-col items-center justify-center gap-4 py-16 px-6 text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Icon — decorative */}
      <span aria-hidden="true" className="text-5xl select-none">
        🔍
      </span>

      {/* Message */}
      <p className="text-lg font-medium text-foreground/80">
        Tidak ada{' '}
        <span className="font-semibold text-foreground">{itemLabel}</span>{' '}
        ditemukan untuk kategori ini.
      </p>

      {/* Reset button */}
      <Button variant="secondary" size="md" onClick={onReset}>
        Tampilkan Semua
      </Button>
    </div>
  );
};

export default EmptyState;
