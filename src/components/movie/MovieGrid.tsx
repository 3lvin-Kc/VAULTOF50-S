import MovieCard from "./MovieCard";
import type { Movie } from "../../lib/database.types";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

export default function MovieGrid({ movies, loading }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] border border-[#d9d2c4] bg-[#efe7db] animate-pulse" />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-UnifrakturMaguntia text-4xl text-[#6f6a60]">
          No Films Found
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[3px] text-[#8d8579]">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
