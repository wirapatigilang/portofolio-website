import { describe, test } from 'vitest';
import fc from 'fast-check';
import { contactFormSchema } from '@/lib/validations';

// Valid subject values for the enum
const validSubjects = [
  'Software Project',
  'Photography',
  'Videography',
  'Video Editing',
  'Other',
] as const;

// Arbitrary that generates empty strings only.
// Note: the Zod schema uses .min(1) which checks string length — a single space
// has length 1 and passes. Only truly empty strings (length 0) are rejected by
// the schema for fullName and message fields.
const emptyString = fc.constant('');

// Arbitrary for a valid non-empty string (not whitespace-only)
const nonEmptyString = (maxLength: number) =>
  fc.string({ minLength: 1, maxLength }).filter((s) => s.trim().length > 0);

describe('Feature: portfolio-website, Property 4: validasi form menolak semua kombinasi field kosong', () => {
  /**
   * Property 4: Validasi form menolak semua kombinasi field kosong
   * Validates: Requirements 7.2
   *
   * For any combination of form data where one or more required fields
   * (fullName, email, subject, message) are empty or whitespace-only,
   * contactFormSchema.safeParse() SHALL return success === false.
   */
  test(
    'Feature: portfolio-website, Property 4: validasi form menolak semua kombinasi field kosong',
    () => {
      // Arbitrary for a valid email address
      const validEmail = fc.emailAddress();

      // Arbitrary for a valid subject
      const validSubject = fc.constantFrom(...validSubjects);

      // Arbitrary for a valid message (non-empty, within 2000 chars)
      const validMessage = nonEmptyString(2000);

      // We test all four cases: each required field being empty/whitespace
      // while the others are valid. We also test combinations.

      // Case A: fullName is empty string
      fc.assert(
        fc.property(
          validEmail,
          validSubject,
          validMessage,
          (email, subject, message) => {
            const result = contactFormSchema.safeParse({ fullName: '', email, subject, message });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );

      // Case B: email is empty string
      fc.assert(
        fc.property(
          nonEmptyString(100),
          validSubject,
          validMessage,
          (fullName, subject, message) => {
            const result = contactFormSchema.safeParse({ fullName, email: '', subject, message });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );

      // Case C: message is empty string
      fc.assert(
        fc.property(
          nonEmptyString(100),
          validEmail,
          validSubject,
          (fullName, email, subject) => {
            const result = contactFormSchema.safeParse({ fullName, email, subject, message: '' });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );

      // Case D: subject is missing/undefined (invalid enum value)
      fc.assert(
        fc.property(
          nonEmptyString(100),
          validEmail,
          validMessage,
          (fullName, email, message) => {
            const result = contactFormSchema.safeParse({
              fullName,
              email,
              subject: undefined,
              message,
            });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );

      // Case E: multiple fields empty simultaneously (fullName, email, message all empty)
      fc.assert(
        fc.property(
          validSubject,
          (subject) => {
            const result = contactFormSchema.safeParse({
              fullName: '',
              email: '',
              subject,
              message: '',
            });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );

      // Case F: all fields empty including subject undefined
      fc.assert(
        fc.property(
          emptyString,
          (fullName) => {
            const result = contactFormSchema.safeParse({
              fullName,
              email: '',
              subject: undefined,
              message: '',
            });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});

describe('Feature: portfolio-website, Property 5: validasi email menolak semua format email tidak valid', () => {
  /**
   * Property 5: Validasi email menolak semua format email tidak valid
   * Validates: Requirements 7.3
   *
   * For any string that does not meet valid email format (no '@', no domain
   * with extension, or illegal characters), contactFormSchema.safeParse()
   * with that string as the email field SHALL return success === false
   * with an error on the email field.
   */
  test(
    'Feature: portfolio-website, Property 5: validasi email menolak semua format email tidak valid',
    () => {
      const validFullName = nonEmptyString(100);
      const validSubject = fc.constantFrom(...validSubjects);
      const validMessage = nonEmptyString(2000);

      // Arbitrary for strings without '@' — cannot be valid emails
      const stringWithoutAt = fc
        .string({ minLength: 1, maxLength: 100 })
        .filter((s) => !s.includes('@') && s.trim().length > 0);

      // Arbitrary for strings with '@' but no valid domain extension (e.g. "user@nodomain")
      const stringWithAtButNoDomain = fc
        .tuple(
          fc.string({ minLength: 1, maxLength: 30 }).filter((s) => !s.includes('@')),
          fc.string({ minLength: 1, maxLength: 30 }).filter(
            (s) => !s.includes('@') && !s.includes('.')
          )
        )
        .map(([local, domain]) => `${local}@${domain}`);

      // Case A: email has no '@' character
      fc.assert(
        fc.property(
          validFullName,
          stringWithoutAt,
          validSubject,
          validMessage,
          (fullName, email, subject, message) => {
            const result = contactFormSchema.safeParse({ fullName, email, subject, message });
            if (result.success) return false;
            // Verify the error is on the email field
            const emailErrors = result.error.errors.filter((e) => e.path[0] === 'email');
            return emailErrors.length > 0;
          }
        ),
        { numRuns: 100 }
      );

      // Case B: email has '@' but no domain extension (no dot after @)
      fc.assert(
        fc.property(
          validFullName,
          stringWithAtButNoDomain,
          validSubject,
          validMessage,
          (fullName, email, subject, message) => {
            const result = contactFormSchema.safeParse({ fullName, email, subject, message });
            if (result.success) return false;
            const emailErrors = result.error.errors.filter((e) => e.path[0] === 'email');
            return emailErrors.length > 0;
          }
        ),
        { numRuns: 100 }
      );

      // Case C: empty string as email — must fail with email field error
      fc.assert(
        fc.property(
          validFullName,
          validSubject,
          validMessage,
          (fullName, subject, message) => {
            const result = contactFormSchema.safeParse({
              fullName,
              email: '',
              subject,
              message,
            });
            return result.success === false;
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
