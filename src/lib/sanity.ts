import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery } from 'groq';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';

export const sanityConfigured = Boolean(projectId && /^[a-z0-9-]+$/.test(projectId));

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion: '2026-09-13', useCdn: true, perspective: 'published' })
  : null;

const newsPostsQuery = defineQuery(`
  *[_type == "newsPost" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, category, publishedAt,
    authorName, featured,
    featuredImage { asset, alt, crop, hotspot }
  }
`);

const newsPostBySlugQuery = defineQuery(`
  *[_type == "newsPost" && slug.current == $slug && publishedAt <= now()][0] {
    _id, title, "slug": slug.current, excerpt, category, publishedAt,
    authorName, featuredImage { asset, alt, crop, hotspot }, body
  }
`);

const newsSlugsQuery = defineQuery(`
  *[_type == "newsPost" && defined(slug.current) && publishedAt <= now()] {
    "slug": slug.current
  }
`);

const activeAnnouncementQuery = defineQuery(`
  *[
    _type == "announcement" && status == "active" &&
    (!defined(startsAt) || startsAt <= now()) &&
    (!defined(endsAt) || endsAt > now())
  ]
  | order(priority desc, _updatedAt desc)[0] {
    _id, _updatedAt, title, message, kind, dismissible,
    callToAction { label, url, openInNewTab }
  }
`);

export interface SanityImage {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  crop?: Record<string, number>;
  hotspot?: Record<string, number>;
}

export interface NewsPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt: string;
  authorName?: string;
  featured?: boolean;
  featuredImage?: SanityImage;
}

export interface NewsPost extends NewsPostSummary { body?: unknown[]; }

export interface Announcement {
  _id: string;
  _updatedAt: string;
  title: string;
  message: string;
  kind?: 'information' | 'urgent' | 'celebration';
  dismissible?: boolean;
  callToAction?: { label?: string; url?: string; openInNewTab?: boolean; };
}

async function safeFetch<T>(query: string, params: Record<string, string> = {}, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.warn('Sanity content could not be loaded during this build.', error);
    return fallback;
  }
}

export const getNewsPosts = () => safeFetch<NewsPostSummary[]>(newsPostsQuery, {}, []);
export const getNewsPostBySlug = (slug: string) => safeFetch<NewsPost | null>(newsPostBySlugQuery, { slug }, null);
export const getNewsSlugs = () => safeFetch<Array<{ slug: string }>>(newsSlugsQuery, {}, []);
export const getActiveAnnouncement = () => safeFetch<Announcement | null>(activeAnnouncementQuery, {}, null);

export function newsImageUrl(image: SanityImage | undefined, width = 1200, height = 750) {
  if (!sanityClient || !image?.asset?._ref) return null;
  return imageUrlBuilder(sanityClient).image(image).width(width).height(height).fit('crop').auto('format').url();
}
