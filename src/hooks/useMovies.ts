import { useState, useEffect, useCallback } from "react";
import {
  fetchMovies,
  fetchMovieById,
  fetchGenres,
  fetchSimilarMovies,
  type MovieFilters,
  type MovieListResult,
  type MovieDetail,
} from "../services/movies";
import type { Movie, Genre } from "../lib/database.types";

// ── useMovies — paginated + filtered movie list ──────────────
export function useMovies(filters: MovieFilters = {}) {
  const [result, setResult] = useState<MovieListResult>({
    movies: [],
    total: 0,
    page: 1,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(filters);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...result, loading, error, refetch: load };
}

// ── useMovieDetail — single movie with all relations ─────────
export function useMovieDetail(id: number | null) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchMovieById(id)
      .then(setMovie)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load movie"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}

// ── useGenres — all available genres ────────────────────────
export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { genres, loading };
}

// ── useSimilarMovies — related films ────────────────────────
export function useSimilarMovies(movie: Movie | null) {
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie) return;

    setLoading(true);
    fetchSimilarMovies(movie)
      .then(setSimilar)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [movie?.id]);

  return { similar, loading };
}
