import type { Movie, Person, Genre, Blog } from './database.types';

/**
 * Enhanced Movie type with related data for SEO/AEO
 * Includes crew, cast, genres, countries, and facts
 */
export interface MovieDetail extends Movie {
  cast?: Array<{
    id: number;
    name: string;
    character?: string;
    profilePath?: string;
    castOrder?: number;
  }>;
  crew?: Array<{
    id: number;
    name: string;
    job: string;
    department?: string;
    profilePath?: string;
  }>;
  genres?: Genre[];
  countries?: Array<{
    code: string;
    name: string;
  }>;
  facts?: Array<{
    id: number;
    fact: string;
    section?: string;
    sourceUrl?: string;
  }>;
}

/**
 * Blog Post with related movies for SEO
 */
export interface BlogDetail extends Blog {
  relatedMovies?: Movie[];
  author?: {
    name: string;
    bio?: string;
  };
  publishedAt?: string;
}

/**
 * SEO Metadata structure for any page
 */
export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  url: string;
  type: 'website' | 'article' | 'video.movie';
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  keywords?: string[];
}

/**
 * JSON-LD Schema types for structured data
 */
export interface MovieSchema {
  '@context': string;
  '@type': 'Movie';
  name: string;
  description?: string;
  image?: string;
  datePublished?: string;
  director?: PersonSchema | PersonSchema[];
  actor?: PersonSchema[];
  genre?: string[];
  inLanguage?: string;
  contentRating?: string;
  runtimeMinutes?: number;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
  };
  keywords?: string;
  url?: string;
  countryOfOrigin?: CountrySchema[];
}

export interface ArticleSchema {
  '@context': string;
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author?: PersonSchema;
  publisher?: OrganizationSchema;
  inLanguage?: string;
  keywords?: string;
  url?: string;
  mainEntity?: MovieSchema;
}

export interface PersonSchema {
  '@type': 'Person';
  name: string;
  image?: string;
  url?: string;
}

export interface CountrySchema {
  '@type': 'Country';
  name: string;
}

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  logo?: string;
  url?: string;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}
