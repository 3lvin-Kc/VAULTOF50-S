import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchMovieById, getPosterUrl, getBackdropUrl } from '@/src/services/movies';
import type { Movie } from '@/src/lib/database.types';

const SITE_URL = 'https://vault-50.co';
const SITE_NAME = 'VaultOf50';

interface MovieDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MovieDetailProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: 'Film Detail | VaultOf50',
    description: 'View detailed information about this horror film from our archive.',
    openGraph: {
      type: 'video.movie',
      title: 'Film Detail',
      url: `${SITE_URL}/movie/${id}`,
    },
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const { id } = await params;
  
  let movie: Movie | null = null;
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

  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      <section className="relative border-b border-gray-200">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/75 to-white" />

        <div className="relative mx-auto max-w-screen-xl px-6 pt-10 pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[3px] text-gray-600 hover:text-gray-900"
          >
            Back to Archive
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[220px_1fr_300px]">
            <div className="w-44">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full border border-gray-200 shadow-lg"
                />
              ) : (
                <div className="aspect-[2/3] w-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                  <span className="font-garamond italic text-gray-400 text-center px-4">
                    {movie.title}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700 mb-3">
                Archive Entry
              </p>
              <h1 className="font-UnifrakturMaguntia text-4xl md:text-6xl leading-none mb-3">
                {movie.title}
              </h1>

              {movie.original_title && movie.original_title !== movie.title ? (
                <p className="font-garamond italic text-lg text-gray-600 mb-4">
                  {movie.original_title}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 mb-5">
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

              {movie.overview ? (
                <p className="font-garamond text-base leading-relaxed text-gray-700 max-w-3xl">
                  {movie.overview}
                </p>
              ) : null}
            </div>

            <aside className="border border-gray-200 bg-gray-50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-700 mb-4">
                Film Facts
              </p>

              <dl className="space-y-4 text-sm">
                {movie.original_language && (
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[2px] text-gray-500">
                      Language
                    </dt>
                    <dd className="font-garamond text-gray-900 mt-1">
                      {movie.original_language.toUpperCase()}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: movie.title,
            ...(movie.original_title &&
            movie.original_title !== movie.title
              ? { alternateName: movie.original_title }
              : {}),
            description: movie.overview,
            datePublished: movie.release_date || String(movie.release_year),
            ...(movie.runtime ? { duration: `PT${movie.runtime}M` } : {}),
            ...(posterUrl ? { image: posterUrl } : {}),
            ...(movie.tmdb_rating
              ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: movie.tmdb_rating,
                  bestRating: 10,
                  ratingCount: movie.tmdb_vote_count ?? 0,
                },
              }
              : {}),
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
            },
            url: `${SITE_URL}/movie/${id}`,
          }),
        }}
      />
    </div>
  );
}
