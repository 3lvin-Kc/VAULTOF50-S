import { supabase } from "../lib/supabase";
import type { Movie, Genre, Tag } from "../lib/database.types";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
const PAGE_SIZE = 24;

export interface MovieFilters {
  search?: string;
  genre?: string;
  yearFrom?: number;
  yearTo?: number;
  language?: string;
  country?: string;
  sortBy?: "release_year" | "tmdb_rating" | "title" | "tmdb_vote_count";
  sortOrder?: "asc" | "desc";
  page?: number;
}

export interface MovieListResult {
  movies: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  tags: Tag[];
  cast: {
    name: string;
    character: string | null;
    profile_path: string | null;
    cast_order: number | null;
  }[];
  crew: { name: string; job: string; department: string | null }[];
  countries: { code: string; name: string }[];
  facts: { fact: string; section: string | null; source_url: string | null }[];
}

// ── Poster/backdrop URL helpers ──────────────────────────────
export const getPosterUrl = (path: string | null): string | null =>
  path ? `${TMDB_IMAGE_BASE}${path}` : null;

export const getBackdropUrl = (path: string | null): string | null =>
  path ? `${TMDB_BACKDROP_BASE}${path}` : null;

// ── Fetch paginated + filtered movies ───────────────────────
export async function fetchMovies(
  filters: MovieFilters = {},
): Promise<MovieListResult> {
  const {
    search,
    yearFrom = 1950,
    yearTo = 2000,
    language,
    sortBy = "tmdb_rating",
    sortOrder = "desc",
    page = 1,
  } = filters;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("movies")
    .select("*", { count: "exact" })
    .gte("release_year", yearFrom)
    .lte("release_year", yearTo)
    .range(from, to);

  if (search && search.trim().length > 0) {
    query = query
      .or(`title.ilike.%${search.trim()}%,original_title.ilike.%${search.trim()}%`)
      .order("title", { ascending: true });
  } else {
    query = query.order(sortBy, { ascending: sortOrder === "asc" });
  }

  if (language) {
    query = query.eq("original_language", language);
  }

  if (filters.country) {
    const { data: countryMovies } = await supabase
      .from("movie_countries")
      .select("movie_id")
      .eq("country_code", filters.country);

    const ids = (countryMovies ?? []).map((r) => r.movie_id);
    query = query.in("id", ids);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(`Failed to fetch movies: ${error.message}`);

  const total = count ?? 0;

  return {
    movies: data ?? [],
    total,
    page,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

// ── Fetch single movie with all relations ────────────────────
export async function fetchMovieById(id: number): Promise<MovieDetail | null> {
  const { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !movie) return null;

  // Fetch genres
  const { data: genreRows } = await supabase
    .from("movie_genres")
    .select("genres(id, name)")
    .eq("movie_id", id);

  const genres = (genreRows ?? [])
    .map((r: any) => r.genres)
    .filter(Boolean) as Genre[];

  // Fetch tags
  const { data: tagRows } = await supabase
    .from("movie_tags")
    .select("tags(id, name, slug)")
    .eq("movie_id", id);

  const tags = (tagRows ?? []).map((r: any) => r.tags).filter(Boolean) as Tag[];

  // Fetch cast
  const { data: castRows } = await supabase
    .from("movie_cast")
    .select(`
      character,
      cast_order,
      people (
        name,
        profile_path
      )
    `)
    .eq("movie_id", id)
    .order("cast_order", { ascending: true })
    .limit(10);

  const cast = (castRows ?? []).map((r: any) => ({
    name: r.people?.name ?? "",
    character: r.character,
    profile_path: r.people?.profile_path ?? null,
    cast_order: r.cast_order,
  }));

  // Fetch crew
  const { data: crewRows } = await supabase
    .from("movie_crew")
    .select("job, department, people(name)")
    .eq("movie_id", id);

  const crew = (crewRows ?? []).map((r: any) => ({
    name: r.people?.name ?? "",
    job: r.job,
    department: r.department,
  }));

  // Fetch facts
  const { data: factsRows } = await supabase
    .from("movie_facts")
    .select("fact, section, source_url")
    .eq("movie_id", id)
    .limit(10);

  const facts = factsRows ?? [];

  // Fetch countries
  const { data: countryRows } = await supabase
    .from("movie_countries")
    .select("countries(code, name)")
    .eq("movie_id", id);

  const countries = (countryRows ?? [])
    .map((r: any) => r.countries)
    .filter(Boolean) as { code: string; name: string }[];

  return { ...movie, genres, tags, cast, crew, countries, facts };
}

// ── Fetch all genres ─────────────────────────────────────────
export async function fetchGenres(): Promise<Genre[]> {
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to fetch genres: ${error.message}`);
  return data ?? [];
}

// ── Fetch all tags ───────────────────────────────────────────
export async function fetchTags(): Promise<Tag[]> {
  const { data, error } = await supabase.from("tags").select("*").order("name");

  if (error) throw new Error(`Failed to fetch tags: ${error.message}`);
  return data ?? [];
}

// ── Fetch similar movies (same year range + genre) ───────────
export async function fetchSimilarMovies(
  movie: Movie,
  limit = 6,
): Promise<Movie[]> {
  const yearFrom = (movie.release_year ?? 1970) - 5;
  const yearTo = (movie.release_year ?? 1970) + 5;

  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .neq("id", movie.id)
    .eq("original_language", movie.original_language ?? "en")
    .gte("release_year", yearFrom)
    .lte("release_year", yearTo)
    .order("tmdb_rating", { ascending: false })
    .limit(limit);

  if (error)
    throw new Error(`Failed to fetch similar movies: ${error.message}`);
  return data ?? [];
}

// ── Add this function to src/services/movies.ts ──────────────
