import CTAButton from '@/components/ui/CTAButton';
import { owner } from '@/data/owner';

// ============================================================
// BioSection component
// ============================================================

/**
 * Displays a short bio of the Owner (max 3 sentences) and a CTA button
 * that links to the Contact page.
 *
 * Validates: Requirements 1.4, 1.5
 */
export default function BioSection() {
  return (
    <section aria-labelledby="bio-heading" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="bio-heading"
          className="text-2xl font-semibold mb-4 text-foreground"
        >
          About Me
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
          {owner.bio}
        </p>

        <CTAButton href="/contact">Contact Me</CTAButton>
      </div>
    </section>
  );
}
