'use client';

import { useState } from "react";
import Link from "next/link";
import { getPosterUrl } from "../../services/movies";
import type { Movie } from "../../lib/database.types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block bg-[#f8f3ea] border border-[#d9d2c4] aspect-[2/3] cursor-pointer hover:border-[#b43c2f] transition-colors"
    >
      {posterUrl && !imgError ? (
        <img
          src={posterUrl}
          alt={movie.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#efe7db] p-4">
          <span className="font-garamond text-sm text-[#736d63] text-center italic">
            {movie.title}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#f8f3ea]/95 border-t border-[#d9d2c4]">
        <p className="font-mono text-[10px] tracking-[2px] text-[#b43c2f] mb-1">
          {movie.release_year}
        </p>
        <h3 className="font-garamond text-sm font-semibold text-[#1f2328] leading-tight line-clamp-2">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}
