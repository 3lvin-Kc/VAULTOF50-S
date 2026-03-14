import { useState, useEffect } from "react";
import { useMovies } from "../hooks/useMovies";
import { fetchMovieById } from "../services/movies";
import MovieGrid from "../components/movie/MovieGrid";
import {
  getBackdropUrl,
  getPosterUrl,
  type MovieFilters,
} from "../services/movies";
import { Link } from "react-router-dom";
import type { Movie } from "../lib/database.types";
import { Helmet } from "react-helmet-async";
import { STATIC_SEO } from "../utils/seo";

const FEATURED_MOVIE_ID = 4707; // Set to movie ID you want featured, or null for auto

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [filters, setFilters] = useState<MovieFilters>({
    sortBy: "tmdb_rating",
    sortOrder: "desc",
    yearFrom: 1950,
    yearTo: 2000,
    page: 1,
  });

  useEffect(() => {
    if (FEATURED_MOVIE_ID) {
      fetchMovieById(FEATURED_MOVIE_ID).then((movie) => {
        if (movie) setFeaturedMovie(movie);
      });
    }
  }, []);

  const { movies, total, totalPages, loading, error } = useMovies(filters);

  const displayFeatured = featuredMovie ?? movies[0] ?? null;
  const latestStories = movies
    .filter((m) => m.id !== displayFeatured?.id)
    .slice(0, 4);
  const featuredBackdrop = displayFeatured
    ? getBackdropUrl(displayFeatured.backdrop_path)
    : null;
  const heroItems = loading ? [null, null, null, null] : latestStories;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Helmet>
        <title>{STATIC_SEO.home.title}</title>
        <meta name="description" content={STATIC_SEO.home.description} />
      </Helmet>
      <section className="border-b border-gray-200 px-6 py-8 md:py-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[3px] text-red-700">
                Latest Stories
              </p>
              <h1 className="font-UnifrakturMaguntia text-4xl md:text-6xl text-gray-800 leading-none mt-2">
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
                {total.toLocaleString()} Films Archived
              </p>
              <div className="h-8 w-px bg-gray-200" />
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
                Covering 1950-2000
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            {displayFeatured ? (
              <Link
                to={`/movie/${displayFeatured.id}`}
                className="group relative block min-h-[360px] overflow-hidden border border-gray-200 bg-gray-100"
              >
                {featuredBackdrop ? (
                  <img
                    src={featuredBackdrop}
                    alt={displayFeatured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/65 to-gray-900/20" />
                <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[3px] text-red-200 mb-3">
                    Featured
                  </p>
                  <h2 className="max-w-3xl font-garamond text-3xl md:text-5xl text-white leading-tight mb-3">
                    {displayFeatured.title}
                  </h2>
                  <p className="max-w-2xl font-garamond text-sm md:text-base text-gray-300 line-clamp-3">
                    {displayFeatured.overview ??
                      "Explore this featured title from the archive."}
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
              <div className="divide-y divide-gray-100">
                {heroItems.map((movie, index) => {
                  if (!movie) {
                    return (
                      <div
                        key={`hero-skeleton-${index}`}
                        className="flex gap-3 p-4"
                      >
                        <div className="h-16 w-12 bg-gray-100 animate-pulse" />
                        <div className="flex-1">
                          <div className="h-3 w-2/3 bg-gray-100 animate-pulse mb-2" />
                          <div className="h-2 w-1/2 bg-gray-100 animate-pulse" />
                        </div>
                      </div>
                    );
                  }

                  const posterUrl = getPosterUrl(movie.poster_path);

                  return (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="group flex gap-3 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-16 w-12 overflow-hidden bg-gray-100 border border-gray-200">
                        {posterUrl ? (
                          <img
                            src={posterUrl}
                            alt={movie.title}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-garamond text-[15px] leading-snug text-gray-800 group-hover:text-red-700 line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[2px] text-gray-400">
                          {movie.release_year ?? "Unknown Year"} -{" "}
                          {movie.tmdb_vote_count?.toLocaleString() ?? "0"} votes
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 pt-6 pb-3 flex items-center justify-between">
        <p className="font-garamond italic text-sm text-gray-500">
          Showing <span className="text-gray-800">{movies.length}</span> of{" "}
          <span className="text-gray-800">{total.toLocaleString()}</span> films
        </p>
        {totalPages > 1 && (
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-500">
            Page {filters.page ?? 1} of {totalPages}
          </p>
        )}
      </div>

      {error && (
        <div className="mx-6 mb-4 border border-red-200 bg-red-50 px-4 py-3 font-mono text-[11px] text-red-700 uppercase tracking-[2px]">
          {error}
        </div>
      )}

      <div className="px-6 pb-6">
        <MovieGrid movies={movies} loading={loading} />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 px-6 pb-12">
          <button
            disabled={!filters.page || filters.page <= 1}
            onClick={() =>
              setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))
            }
            className="font-mono text-[10px] uppercase tracking-[2px] px-4 py-2 border border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          <button
            disabled={filters.page === totalPages}
            onClick={() =>
              setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))
            }
            className="font-mono text-[10px] uppercase tracking-[2px] px-4 py-2 border border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
