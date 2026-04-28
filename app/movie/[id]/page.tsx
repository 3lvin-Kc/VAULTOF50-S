import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { fetchMovieById, getPosterUrl, getBackdropUrl } from '@/src/services/movies';
import { generateMovieSchema, generateBreadcrumbSchema } from '@/src/lib/schemas';
import type { MovieDetail } from '@/src/services/movies';

const SITE_URL = 'https://vault-50.co';
const SITE_NAME = 'VaultOf50';

interface MovieDetailProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate dynamic metadata for each movie page
 * Includes unique title, description, and OG image for social sharing
 */
export async function generateMetadata({
  params,
}: MovieDetailProps): Promise<Metadata> {
  const { id } = await params;
  
  let movie: MovieDetail | null = null;
  try {
    movie = await fetchMovieById(Number(id));
  } catch (error) {
    console.error('Error fetching movie metadata:', error);
  }

  if (!movie) {
    return {
      title: 'Film Not Found | VaultOf50',
      description: 'This horror film record could not be found in our archive.',
      robots: 'noindex, follow',
    };
  }

  const title = `${movie.title} (${movie.release_year || 'Unknown'}) | Horror Film Archive`;
  const description = movie.overview
    ? movie.overview.substring(0, 160)
    : `${movie.title} — A horror film ${movie.release_year ? `from ${movie.release_year}` : ''} in the VaultOf50 archive. ${movie.runtime ? `Runtime: ${movie.runtime} minutes.` : ''}`;
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : `${SITE_URL}/og-default.png`;

  const genreString = movie.genres?.map((g: any) => g.name).join(', ') || 'Horror';

  return {
    title,
    description,
    keywords: [
      movie.title,
      'horror film',
      `${movie.release_year}`,
      ...((movie.genres || []).map((g: any) => g.name) || []),
      movie.countries?.map((c: any) => c.name).join(', ') || '',
    ]
      .filter(Boolean)
      .slice(0, 10),
    openGraph: {
      type: 'video.movie',
      title,
      description,
      url: `${SITE_URL}/movie/${id}`,
      images: [
        {
          url: posterUrl,
          width: 342,
          height: 513,
          alt: movie.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [posterUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/movie/${id}`,
    },
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const { id } = await params;
  
  let movie: MovieDetail | null = null;
  try {
    movie = await fetchMovieById(Number(id));
  } catch (error) {
    console.error('Error fetching movie:', error);
  }

  if (!movie) {
    notFound();
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const director = movie.crew?.find((c) => c.job === 'Director');
  const writers = movie.crew?.filter(
    (c) => c.job.toLowerCase().includes('writer') || c.job.toLowerCase().includes('screenplay'),
  ) || [];
  const cast = movie.cast?.slice(0, 5) || [];

  // Generate structured data
  const movieSchema = generateMovieSchema(movie as any, `${SITE_URL}/movie/${id}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'VaultOf50', url: SITE_URL },
    { name: 'Browse', url: `${SITE_URL}/browse` },
    { name: movie.title },
  ]);

  return (
    <>
      <div className="min-h-screen bg-transparent text-gray-900">
        <section className="relative border-b border-gray-200" role="region" aria-label="Movie header">
          {backdropUrl ? (
            <div className="absolute inset-0 h-full w-full overflow-hidden">
              <img
                src={backdropUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
                loading="eager"
              />
            </div>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/75 to-white" />

          <div className="relative mx-auto max-w-screen-xl px-6 pt-10 pb-10">
            <nav aria-label="Breadcrumb">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[3px] text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Archive
              </Link>
            </nav>

            <div className="mt-7 grid gap-8 lg:grid-cols-[220px_1fr_300px]">
              {/* Poster Image */}
              <div className="w-44">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`${movie.title} poster`}
                    className="w-full border border-gray-200 shadow-lg"
                    loading="eager"
                  />
                ) : (
                  <div className="aspect-[2/3] w-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <span className="font-garamond italic text-gray-400 text-center px-4">
                      No poster available
                    </span>
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700 mb-3">
                  Archive Entry
                </p>
                <h1 className="font-UnifrakturMaguntia text-4xl md:text-6xl leading-none mb-3">
                  {movie.title}
                </h1>

                {movie.original_title && movie.original_title !== movie.title ? (
                  <p className="font-garamond italic text-lg text-gray-600 mb-4">
                    Original Title: {movie.original_title}
                  </p>
                ) : null}

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.release_year ? (
                    <span className="font-mono text-[10px] uppercase tracking-[2px] border border-red-300 bg-red-50 px-2.5 py-1 text-red-700">
                      {movie.release_year}
                    </span>
                  ) : null}
                  {movie.runtime ? (
                    <span className="font-mono text-[10px] uppercase tracking-[2px] border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-600">
                      {movie.runtime} min
                    </span>
                  ) : null}
                  {movie.original_language ? (
                    <span className="font-mono text-[10px] uppercase tracking-[2px] border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-600">
                      {movie.original_language.toUpperCase()}
                    </span>
                  ) : null}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre: any) => (
                      <Link
                        key={genre.id}
                        href={`/browse?genre=${genre.slug}`}
                        className="font-mono text-[9px] uppercase tracking-[2px] border border-gray-300 bg-white px-2.5 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {/* Rating */}
                {movie.tmdb_rating ? (
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-sm font-bold text-red-700">
                        {Math.round(movie.tmdb_rating * 10) / 10}
                      </span>
                      <span className="font-mono text-xs text-gray-500">/10</span>
                    </div>
                    <div className="h-1 bg-gray-200 flex-grow rounded" style={{
                      background: `linear-gradient(to right, #b91c1c 0%, #b91c1c ${Math.min(movie.tmdb_rating * 10, 100)}%, #e5e7eb ${Math.min(movie.tmdb_rating * 10, 100)}%, #e5e7eb 100%)`
                    }} />
                    {movie.tmdb_vote_count && (
                      <span className="font-mono text-[9px] text-gray-500">
                        {movie.tmdb_vote_count.toLocaleString()} votes
                      </span>
                    )}
                  </div>
                ) : null}

                {/* Overview */}
                {movie.overview ? (
                  <div className="mb-8">
                    <p className="font-garamond text-base leading-relaxed text-gray-700">
                      {movie.overview}
                    </p>
                  </div>
                ) : null}

                {/* Director & Writers */}
                {director || writers.length > 0 ? (
                  <div className="mb-8 space-y-3">
                    {director ? (
                      <div>
                        <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500 mb-1">
                          Director
                        </dt>
                        <dd className="font-garamond text-gray-900">
                          {director.name}
                        </dd>
                      </div>
                    ) : null}
                    {writers.length > 0 ? (
                      <div>
                        <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500 mb-1">
                          Writers
                        </dt>
                        <dd className="font-garamond text-gray-900">
                          {writers.map((w) => w.name).join(', ')}
                        </dd>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Cast */}
                {cast.length > 0 ? (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700 mb-3">
                      Cast
                    </p>
                    <ul className="grid gap-2">
                      {cast.map((c: any, idx: number) => (
                        <li key={idx} className="text-sm">
                          <span className="font-garamond font-bold text-gray-900">{c.name}</span>
                          {c.character && (
                            <span className="font-garamond text-gray-600"> as {c.character}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {/* Sidebar */}
              <aside
                className="border border-gray-200 bg-gray-50 p-4 h-fit"
                role="region"
                aria-label="Film facts"
              >
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700 mb-4">
                  Film Facts
                </p>

                <dl className="space-y-4 text-sm">
                  {movie.countries && movie.countries.length > 0 ? (
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500">
                        Countries
                      </dt>
                      <dd className="font-garamond text-gray-900 mt-1">
                        {movie.countries.map((c: any) => c.name).join(', ')}
                      </dd>
                    </div>
                  ) : null}
                  {movie.original_language ? (
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500">
                        Language
                      </dt>
                      <dd className="font-garamond text-gray-900 mt-1">
                        {movie.original_language.toUpperCase()}
                      </dd>
                    </div>
                  ) : null}
                  {movie.budget ? (
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500">
                        Budget
                      </dt>
                      <dd className="font-garamond text-gray-900 mt-1">
                        ${(movie.budget / 1000000).toFixed(1)}M
                      </dd>
                    </div>
                  ) : null}
                  {movie.revenue ? (
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500">
                        Revenue
                      </dt>
                      <dd className="font-garamond text-gray-900 mt-1">
                        ${(movie.revenue / 1000000).toFixed(1)}M
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </aside>
            </div>

            {/* Facts Section */}
            {movie.facts && movie.facts.length > 0 ? (
              <section className="mt-12 border-t border-gray-200 pt-8" role="region" aria-label="Trivia and facts">
                <h2 className="font-mono text-[11px] uppercase tracking-[3px] text-red-700 mb-6">
                  Trivia & Facts
                </h2>
                <ul className="grid gap-4 max-w-3xl">
                  {movie.facts.map((fact: any, idx: number) => (
                    <li key={idx} className="font-garamond text-base leading-relaxed text-gray-700 pl-4 border-l-2 border-red-300">
                      {fact.fact}
                      {fact.source_url && (
                        <a
                          href={fact.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[9px] uppercase tracking-[1px] text-blue-600 hover:text-blue-700 ml-2"
                        >
                          [source]
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </section>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movieSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
