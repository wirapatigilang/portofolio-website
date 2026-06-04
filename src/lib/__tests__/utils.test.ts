import { describe, test } from 'vitest';
import fc from 'fast-check';
import { filterProjects, filterPhotos, filterVideos } from '@/lib/utils';
import type { Project, ProjectCategory, Photo, PhotoCategory, Video, VideoCategory } from '@/types';

// All valid project categories
const projectCategories: ProjectCategory[] = ['Web App', 'Mobile App', 'API', 'Open Source'];

// Arbitrary that generates a valid Project object
const projectArbitrary = fc.record<Project>({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 150 }),
  fullDescription: fc.string({ minLength: 1, maxLength: 1000 }),
  challenges: fc.string({ minLength: 1, maxLength: 500 }),
  solutions: fc.string({ minLength: 1, maxLength: 500 }),
  techStack: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
  category: fc.constantFrom(...projectCategories),
  repositoryUrl: fc.option(fc.webUrl(), { nil: undefined }),
  demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
  thumbnail: fc.option(fc.string({ minLength: 1, maxLength: 200 }), { nil: undefined }),
  featured: fc.boolean(),
});

describe('Feature: portfolio-website, Property 1: filter proyek menampilkan hanya item yang sesuai kategori', () => {
  /**
   * Property 1: Filter proyek menampilkan hanya item yang sesuai kategori
   * Validates: Requirements 3.6
   *
   * For any list of projects with various categories, when a specific category
   * filter is applied, all displayed projects SHALL have the same category as
   * the selected filter, and no projects from other categories appear.
   */
  test(
    'Feature: portfolio-website, Property 1: filter proyek selalu mengembalikan hanya proyek dengan kategori yang dipilih',
    () => {
      fc.assert(
        fc.property(
          fc.array(projectArbitrary),
          fc.constantFrom(...projectCategories),
          (projects, selectedCategory) => {
            const result = filterProjects(projects, selectedCategory);
            return result.every((p) => p.category === selectedCategory);
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});

// All valid photo categories
const photoCategories: PhotoCategory[] = ['Portrait', 'Landscape', 'Event', 'Street', 'Product'];

// Arbitrary that generates a valid Photo object
const photoArbitrary = fc.record<Photo>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  alt: fc.string({ minLength: 1, maxLength: 200 }),
  src: fc.string({ minLength: 1, maxLength: 200 }),
  fullSrc: fc.string({ minLength: 1, maxLength: 200 }),
  category: fc.constantFrom(...photoCategories),
  year: fc.integer({ min: 2000, max: 2030 }),
});

describe('Feature: portfolio-website, Property 2: filter foto menampilkan hanya item yang sesuai kategori', () => {
  /**
   * Property 2: Filter foto menampilkan hanya item yang sesuai kategori
   * Validates: Requirements 4.7
   *
   * For any collection of photos with various categories, when a specific
   * category filter is applied, all displayed photos SHALL have the same
   * category as the selected filter.
   */
  test(
    'Feature: portfolio-website, Property 2: filter foto selalu mengembalikan hanya foto dengan kategori yang dipilih',
    () => {
      fc.assert(
        fc.property(
          fc.array(photoArbitrary),
          fc.constantFrom(...photoCategories),
          (photos, selectedCategory) => {
            const result = filterPhotos(photos, selectedCategory);
            return result.every((p) => p.category === selectedCategory);
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});

// All valid video categories
const videoCategories: VideoCategory[] = [
  'Cinematic',
  'Commercial',
  'Event',
  'Short Film',
  'Motion Graphics',
];

// Arbitrary that generates a valid Video object
const videoArbitrary = fc.record<Video>({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 150 }),
  thumbnail: fc.string({ minLength: 1, maxLength: 200 }),
  embedUrl: fc.string({ minLength: 1, maxLength: 300 }),
  externalUrl: fc.string({ minLength: 1, maxLength: 300 }),
  category: fc.constantFrom(...videoCategories),
  tools: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 0, maxLength: 10 }),
  role: fc.string({ minLength: 1, maxLength: 100 }),
  year: fc.integer({ min: 2000, max: 2030 }),
});

describe('Feature: portfolio-website, Property 3: filter video menampilkan hanya item yang sesuai kategori', () => {
  /**
   * Property 3: Filter video menampilkan hanya item yang sesuai kategori
   * Validates: Requirements 5.4
   *
   * For any list of videos with various categories, when a specific category
   * filter is applied, all displayed videos SHALL have the same category as
   * the selected filter.
   */
  test(
    'Feature: portfolio-website, Property 3: filter video selalu mengembalikan hanya video dengan kategori yang dipilih',
    () => {
      fc.assert(
        fc.property(
          fc.array(videoArbitrary),
          fc.constantFrom(...videoCategories),
          (videos, selectedCategory) => {
            const result = filterVideos(videos, selectedCategory);
            return result.every((v) => v.category === selectedCategory);
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
