import type {
  MovieSchema,
  ArticleSchema,
  BreadcrumbSchema,
  PersonSchema,
  OrganizationSchema,
  MovieDetail,
  BlogDetail,
} from './seo-types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vault-50.co';
const SITE_NAME = 'VaultOf50';

/**
 * Generate Movie schema for JSON-LD
 */
export function generateMovieSchema(movie: MovieDetail, url: string): MovieSchema {
  const director = movie.crew?.find((c) => c.job === 'Director');
  const cast = movie.cast?.slice(0, 5) || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview || undefined,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : undefined,
    datePublished: movie.release_date || undefined,
    director: director
      ? {
        '@type': 'Person',
        name: director.name,
      }
      : undefined,
    actor: cast.map((c) => ({
      '@type': 'Person',
      name: c.name,
      ...(c.character && { characterName: c.character }),
    })),
    genre: movie.genres?.map((g) => g.name) || [],
    inLanguage: movie.original_language || 'en',
    runtimeMinutes: movie.runtime || undefined,
    ...(movie.tmdb_rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Math.round(movie.tmdb_rating * 10) / 10,
        ratingCount: movie.tmdb_vote_count || 0,
      },
    }),
    keywords: [
      movie.title,
      'horror film',
      ...(movie.genres?.map((g) => g.name) || []),
      movie.original_language === 'es' ? 'Spanish' : '',
      movie.original_language === 'it' ? 'Italian' : '',
      movie.original_language === 'ja' ? 'Japanese' : '',
    ]
      .filter(Boolean)
      .join(', '),
    url,
    countryOfOrigin: movie.countries?.map((c) => ({
      '@type': 'Country',
      name: c.name,
    })),
  };
}

/**
 * Generate Article/BlogPosting schema for JSON-LD
 */
export function generateArticleSchema(
  blog: BlogDetail,
  url: string,
  relatedMovie?: MovieDetail,
): ArticleSchema {
  const publishedDate = blog.publishedAt || blog.created_at || new Date().toISOString();

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.content?.substring(0, 160),
    image: blog.cover_image
      ? `${SITE_URL}${blog.cover_image}`
      : `${SITE_URL}/og-default.png`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Person',
      name: 'VaultOf50 Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: `${SITE_URL}/logo.png`,
      url: SITE_URL,
    },
    inLanguage: 'en',
    keywords: [blog.title, blog.category || 'horror', 'horror films'].filter(Boolean).join(', '),
    url,
  };

  if (relatedMovie) {
    schema.mainEntity = generateMovieSchema(relatedMovie, url);
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * Generate Organization schema for site-wide markup
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };
}

/**
 * Generate rich Search Action schema for Google Search
 */
export function generateSearchActionSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Extract critical SEO metadata from a page
 */
export function extractSEOMetadata(data: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'article' | 'movie' | 'website';
  keywords?: string[];
}) {
  return {
    title: data.title,
    description: data.description.substring(0, 160),
    image: data.image,
    url: data.url,
    keywords: data.keywords?.join(', '),
    type: data.type,
  };
}
