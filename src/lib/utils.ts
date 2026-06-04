import type { Project, ProjectCategory, Photo, PhotoCategory, Video, VideoCategory, ExperienceEntry } from '@/types';
import { owner } from '@/data/owner';

// ============================================================
// Filter functions
// ============================================================

/**
 * Filter projects by category.
 * Returns all projects if category is null or undefined.
 *
 * Validates: Requirements 3.6
 */
export function filterProjects(
  projects: Project[],
  category: ProjectCategory | null | undefined
): Project[] {
  if (category == null) return projects;
  return projects.filter((p) => p.category === category);
}

/**
 * Filter photos by category.
 * Returns all photos if category is null or undefined.
 *
 * Validates: Requirements 4.7
 */
export function filterPhotos(
  photos: Photo[],
  category: PhotoCategory | null | undefined
): Photo[] {
  if (category == null) return photos;
  return photos.filter((p) => p.category === category);
}

/**
 * Filter videos by category.
 * Returns all videos if category is null or undefined.
 *
 * Validates: Requirements 5.4
 */
export function filterVideos(
  videos: Video[],
  category: VideoCategory | null | undefined
): Video[] {
  if (category == null) return videos;
  return videos.filter((v) => v.category === category);
}

// ============================================================
// Sort functions
// ============================================================

/**
 * Sort experience entries in descending order by startDate ('YYYY-MM').
 * Most recent entries appear first.
 *
 * Validates: Requirements 6.2
 */
export function sortExperience(entries: ExperienceEntry[]): ExperienceEntry[] {
  return [...entries].sort((a, b) => {
    if (b.startDate > a.startDate) return 1;
    if (b.startDate < a.startDate) return -1;
    return 0;
  });
}

// ============================================================
// Metadata generation
// ============================================================

export interface PageMetadataInput {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: string[];
    url: string;
  };
}

/**
 * Generate a Next.js-compatible metadata object for a page.
 * Uses the owner's profileImage as fallback og:image when no page-specific image is provided.
 *
 * Validates: Requirements 10.1, 10.5, 10.6
 */
export function generateMetadata(pageData: PageMetadataInput): PageMetadata {
  const ogImage = pageData.image ?? owner.profileImage;

  return {
    title: pageData.title,
    description: pageData.description,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      images: [ogImage],
      url: pageData.url,
    },
  };
}
