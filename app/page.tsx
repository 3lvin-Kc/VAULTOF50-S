import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import MovieGrid from '@/src/components/movie/MovieGrid';
import { fetchMovieById, getBackdropUrl, getPosterUrl } from '@/src/services/movies';
import type { Movie } from '@/src/lib/database.types';

const SITE_NAME = 'VaultOf50';
const SITE_URL = 'https://vault-50.co';
const FEATURED_MOVIE_ID = 823;

export const metadata: Metadata = {
  title: 'VaultOf50 — Horror Film Archive 1950–2000',
  description:
    '8,000+ horror films from 1950 to 2000. Every country. Every decade. Built by fans who take horror seriously.',
  openGraph: {
    type: 'website',
    title: 'VaultOf50 — Horror Film Archive 1950–2000',
    description:
      '8,000+ horror films from 1950 to 2000. Every country. Every decade. Built by fans who take horror seriously.',
    url: SITE_URL,
  },
};

async function getHomePageData() {
  try {
    const featuredMovie = await fetchMovieById(FEATURED_MOVIE_ID);
    return { featuredMovie };
  } catch (error) {
    console.error('Error fetching featured movie:', error);
    return { featuredMovie: null };
  }
}

export default async function Home() {
  const { featuredMovie } = await getHomePageData();
  const featuredBackdrop = featuredMovie
    ? getBackdropUrl(featuredMovie.backdrop_path)
    : null;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <section className="border-b border-gray-200 px-6 py-8 md:py-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[3px] text-red-700">
                Latest Stories
              </p>
              <h1 className="font-UnifrakturMaguntia text-4xl md:text-6xl text-gray-800 leading-none mt-2" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
                8000+ Films Archived
              </p>
              <div className="h-8 w-px bg-gray-200" />
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
                Covering 1950-2000
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            {featuredMovie ? (
              <Link
                href={`/movie/${featuredMovie.id}`}
                className="group relative block min-h-[360px] overflow-hidden border border-gray-200 bg-gray-100"
              >
                {featuredBackdrop ? (
                  <img
                    src={featuredBackdrop}
                    alt={featuredMovie.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/65 to-gray-900/20" />
                <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-200 mb-3">
                    Featured
                  </p>
                  <h2 className="max-w-3xl font-garamond text-3xl md:text-5xl text-white leading-tight mb-3">
                    {featuredMovie.title}
                  </h2>
                  <p className="max-w-2xl font-garamond text-sm md:text-base text-gray-300 line-clamp-3">
                    {featuredMovie.overview ??
                      'Explore this featured title from the archive.'}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="min-h-[360px] border border-gray-200 bg-gray-100 animate-pulse" />
            )}

            <div className="border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700">
                  More Headlines
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'VaultOf50 — Horror Film Archive 1950–2000',
            description:
              '8,000+ horror films from 1950 to 2000. Every country. Every decade.',
            url: SITE_URL,
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
            },
            about: {
              '@type': 'Thing',
              name: 'Horror Films 1950–2000',
            },
          }),
        }}
      />
    </div>
  );
}
