import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieGrid from "../components/movie/MovieGrid";
import FilterBar from "../components/filters/FilterBar";
import type { MovieFilters } from "../services/movies";
import { Helmet } from "react-helmet-async";
import { STATIC_SEO } from "../utils/seo";

const DECADES = [
  { label: "1950s", from: 1950, to: 1959 },
  { label: "1960s", from: 1960, to: 1969 },
  { label: "1970s", from: 1970, to: 1979 },
  { label: "1980s", from: 1980, to: 1989 },
  { label: "1990s", from: 1990, to: 2000 },
];

export default function Browse() {
  const [searchParams] = useSearchParams();

  const getInitialDecade = () => {
    const from = Number(searchParams.get("yearFrom"));
    return DECADES.find((d) => d.from === from) ?? null;
  };

  const [filters, setFilters] = useState<MovieFilters>({
    sortBy: "tmdb_rating",
    sortOrder: "desc",
    yearFrom: Number(searchParams.get("yearFrom")) || 1950,
    yearTo: Number(searchParams.get("yearTo")) || 2000,
    country: searchParams.get("country") || undefined,
    page: 1,
  });

  const [activeDecade, setActiveDecade] = useState<string | null>(getInitialDecade()?.label ?? null);

  const { movies, total, totalPages, loading, error } = useMovies(filters);

  const selectDecade = (decade: (typeof DECADES)[0]) => {
    setActiveDecade(decade.label);
    setFilters((f) => ({ ...f, yearFrom: decade.from, yearTo: decade.to, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Helmet>
        <title>{STATIC_SEO.browse.title}</title>
        <meta name="description" content={STATIC_SEO.browse.description} />
      </Helmet>
      <div className="border-b border-gray-200 px-6 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-red-700 mb-3">
          The Archive
        </p>
        <h1 className="font-UnifrakturMaguntia text-5xl md:text-7xl text-gray-800 leading-none mb-4">
          Browse <span className="text-red-700">All Films</span>
        </h1>
        <div className="w-12 h-px bg-red-700 mt-6" />
      </div>

      <div className="border-b border-gray-200 bg-white px-6 py-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveDecade(null);
            setFilters((f) => ({ ...f, yearFrom: 1950, yearTo: 2000, page: 1 }));
          }}
          className={`font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border transition-colors ${
            !activeDecade
              ? "border-red-700 bg-red-700 text-white"
              : "border-gray-200 text-gray-500 hover:border-red-700 hover:text-gray-800"
          }`}
        >
          All Eras
        </button>
        {DECADES.map((decade) => (
          <button
            key={decade.label}
            onClick={() => selectDecade(decade)}
            className={`font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border transition-colors ${
              activeDecade === decade.label
                ? "border-red-700 bg-red-700 text-white"
                : "border-gray-200 text-gray-500 hover:border-red-700 hover:text-gray-800"
            }`}
          >
            {decade.label}
          </button>
        ))}
      </div>

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <div className="px-6 pt-6 pb-3 flex items-center justify-between">
        <p className="font-garamond italic text-sm text-gray-500">
          Showing <span className="text-gray-800">{movies.length}</span> of{" "}
          <span className="text-gray-800">{total.toLocaleString()}</span> films
          {activeDecade && <span className="text-red-700"> in {activeDecade}</span>}
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
            onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
            className="font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          <button
            disabled={filters.page === totalPages}
            onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
            className="font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border border-gray-300 text-gray-500 hover:border-red-700 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
