import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import EmptyState from '../EmptyState';

// ============================================================
// Unit tests — EmptyState
// ============================================================

describe('EmptyState', () => {
  it('renders the correct message with the given itemLabel', () => {
    render(<EmptyState itemLabel="proyek" onReset={() => {}} />);
    expect(
      screen.getByText(/tidak ada/i)
    ).toBeInTheDocument();
    expect(screen.getByText('proyek')).toBeInTheDocument();
    expect(
      screen.getByText(/ditemukan untuk kategori ini/i)
    ).toBeInTheDocument();
  });

  it('renders "Tampilkan Semua" reset button', () => {
    render(<EmptyState itemLabel="foto" onReset={() => {}} />);
    expect(
      screen.getByRole('button', { name: /tampilkan semua/i })
    ).toBeInTheDocument();
  });

  it('calls onReset when "Tampilkan Semua" is clicked', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    render(<EmptyState itemLabel="video" onReset={handleReset} />);
    await user.click(screen.getByRole('button', { name: /tampilkan semua/i }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('has role="status" and aria-live="polite" for screen reader announcements', () => {
    const { container } = render(
      <EmptyState itemLabel="proyek" onReset={() => {}} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('role', 'status');
    expect(wrapper).toHaveAttribute('aria-live', 'polite');
  });

  it('renders the decorative icon as aria-hidden', () => {
    const { container } = render(
      <EmptyState itemLabel="foto" onReset={() => {}} />
    );
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <EmptyState itemLabel="video" onReset={() => {}} className="custom-class" />
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-class'
    );
  });

  it('reset button is keyboard accessible — activatable with Enter', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    render(<EmptyState itemLabel="proyek" onReset={handleReset} />);
    screen.getByRole('button', { name: /tampilkan semua/i }).focus();
    await user.keyboard('{Enter}');
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('reset button is keyboard accessible — activatable with Space', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    render(<EmptyState itemLabel="foto" onReset={handleReset} />);
    screen.getByRole('button', { name: /tampilkan semua/i }).focus();
    await user.keyboard(' ');
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('reset button enforces minimum 44px touch target', () => {
    render(<EmptyState itemLabel="video" onReset={() => {}} />);
    const btn = screen.getByRole('button', { name: /tampilkan semua/i });
    expect(btn.className).toContain('min-h-[44px]');
    expect(btn.className).toContain('min-w-[44px]');
  });

  it('renders different itemLabels correctly', () => {
    const labels = ['proyek', 'foto', 'video'];
    labels.forEach((label) => {
      const { unmount } = render(
        <EmptyState itemLabel={label} onReset={() => {}} />
      );
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });
});

// ============================================================
// Property-based tests — EmptyState
// ============================================================

describe('EmptyState — property-based tests', () => {
  /**
   * Feature: portfolio-website, Property: EmptyState always renders itemLabel in message
   * Validates: Requirements 3.7, 4.8, 5.7
   */
  it('always renders the itemLabel within the message for any non-empty label', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (itemLabel) => {
          const { container, unmount } = render(
            <EmptyState itemLabel={itemLabel} onReset={() => {}} />
          );
          const hasLabel = container.textContent?.includes(itemLabel) ?? false;
          unmount();
          return hasLabel;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: EmptyState always renders reset button
   * Validates: Requirements 3.7, 4.8, 5.7
   */
  it('always renders "Tampilkan Semua" button regardless of itemLabel', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (itemLabel) => {
          const { unmount } = render(
            <EmptyState itemLabel={itemLabel} onReset={() => {}} />
          );
          const btn = screen.queryByRole('button', { name: /tampilkan semua/i });
          const found = btn !== null;
          unmount();
          return found;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: EmptyState onReset always called exactly once per click
   * Validates: Requirements 3.7, 4.8, 5.7
   */
  it('onReset is called exactly once per button click for any itemLabel', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (itemLabel) => {
          const user = userEvent.setup();
          const handleReset = vi.fn();
          const { unmount } = render(
            <EmptyState itemLabel={itemLabel} onReset={handleReset} />
          );
          const btn = screen.getByRole('button', { name: /tampilkan semua/i });
          await user.click(btn);
          const calledOnce = handleReset.mock.calls.length === 1;
          unmount();
          return calledOnce;
        }
      ),
      { numRuns: 100 }
    );
  });
});
