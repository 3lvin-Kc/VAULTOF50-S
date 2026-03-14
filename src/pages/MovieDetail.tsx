import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovieDetail, useSimilarMovies } from "../hooks/useMovies";
import { getPosterUrl, getBackdropUrl } from "../services/movies";
import MovieCard from "../components/movie/MovieCard";
import { Helmet } from "react-helmet-async";
import { pageTitle } from "../utils/seo";

function money(value: number | null): string {
  if (!value) return "Unknown";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(id ? Number(id) : null);
  const { similar } = useSimilarMovies(movie);

  const posterUrl = movie ? getPosterUrl(movie.poster_path) : null;
  const backdropUrl = movie ? getBackdropUrl(movie.backdrop_path) : null;

  const director = useMemo(
    () => movie?.crew?.find((c) => c.job === "Director") ?? null,
    [movie?.crew],
  );

  const writers = useMemo(() => {
    if (!movie?.crew) return [];
    return movie.crew.filter(
      (c) =>
        c.job.toLowerCase().includes("writer") ||
        c.job.toLowerCase().includes("screenplay"),
    );
  }, [movie?.crew]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-[#7c7569] animate-pulse">
          Loading film dossier
        </p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="font-UnifrakturMaguntia text-5xl text-[#7c7569]">Film Not Found</p>
        <p className="font-garamond italic text-[#7c7569] max-w-md">
          This record may not exist in the archive or was removed.
        </p>
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-[3px] border border-[#d9d2c4] bg-[#f8f3ea] px-4 py-2 text-[#6f6a60] hover:text-[#1f2328] hover:border-[#b43c2f] transition-colors"
        >
          Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#1f2328]">
      {movie && (
        <Helmet>
          <title>{pageTitle(`${movie.title} (${movie.release_year})`)}</title>
          <meta
            name="description"
            content={
              movie.overview
                ? movie.overview.slice(0, 155)
                : `${movie.title} — horror film from ${movie.release_year} in the VaultOf50 archive.`
            }
          />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Movie",
              "name": movie.title,
              "description": movie.overview,
              "datePublished": String(movie.release_year),
              "publisher": {
                "@type": "Organization",
                "name": "VaultOf50"
              },
              "url": `https://vault-50.co/movie/${movie.id}`
            })}
          </script>
        </Helmet>
      )}
      <section className="relative border-b border-[#d9d2c4]">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.8]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f1e8]/30 via-[#f5f1e8]/75 to-[#f5f1e8]" />

        <div className="relative mx-auto max-w-screen-xl px-6 pt-10 pb-10 md:pt-14 md:pb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[3px] text-[#6f6a60] hover:text-[#1f2328] transition-colors"
          >
            <span>Back to Archive</span>
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[220px_1fr_300px] lg:items-start">
            <div className="w-44 md:w-52 lg:w-full">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full border border-[#d9d2c4] shadow-xl shadow-[#d8cfbf]/50"
                />
              ) : (
                <div className="aspect-[2/3] w-full border border-[#d9d2c4] bg-[#efe7db] flex items-center justify-center p-4">
                  <span className="font-garamond italic text-[#736d63] text-center">
                    {movie.title}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#b43c2f] mb-3">
                Archive Entry
              </p>
              <h1 className="font-UnifrakturMaguntia text-4xl md:text-6xl leading-none mb-3">
                {movie.title}
              </h1>

              {movie.original_title && movie.original_title !== movie.title ? (
                <p className="font-garamond italic text-lg text-[#6f6a60] mb-4">
                  {movie.original_title}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 mb-5">
                {movie.release_year ? (
                  <span className="font-mono text-[10px] uppercase tracking-[2px] border border-[#b43c2f]/40 bg-[#f4ddd8] px-2.5 py-1 text-[#8f3227]">
                    {movie.release_year}
                  </span>
                ) : null}
                {movie.runtime ? (
                  <span className="font-mono text-[10px] uppercase tracking-[2px] border border-[#d9d2c4] bg-[#f8f3ea] px-2.5 py-1 text-[#6f6a60]">
                    {movie.runtime} min
                  </span>
                ) : null}
                {movie.original_language ? (
                  <span className="font-mono text-[10px] uppercase tracking-[2px] border border-[#d9d2c4] bg-[#f8f3ea] px-2.5 py-1 text-[#6f6a60]">
                    {movie.original_language.toUpperCase()}
                  </span>
                ) : null}
                {movie.tmdb_rating ? (
                  <span className="font-mono text-[10px] uppercase tracking-[2px] border border-[#d9d2c4] bg-[#f8f3ea] px-2.5 py-1 text-[#6f6a60]">
                    Rating {movie.tmdb_rating.toFixed(1)} ({movie.tmdb_vote_count?.toLocaleString() ?? 0} votes)
                  </span>
                ) : null}
              </div>

              {movie.tagline ? (
                <p className="font-garamond italic text-xl text-[#5f584e] mb-4">"{movie.tagline}"</p>
              ) : null}

              {movie.overview ? (
                <p className="font-garamond text-base md:text-lg leading-relaxed text-[#2a2f36] max-w-3xl">
                  {movie.overview}
                </p>
              ) : null}
            </div>

            <aside className="border border-[#d9d2c4] bg-[#f8f3ea] p-4 md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#b43c2f] mb-4">
                Film Facts
              </p>

              <dl className="space-y-4">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[2px] text-[#7c7569]">Director</dt>
                  <dd className="font-garamond text-[#1f2328] mt-1">{director?.name ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[2px] text-[#7c7569]">Writers</dt>
                  <dd className="font-garamond text-[#1f2328] mt-1">
                    {writers.length ? writers.slice(0, 3).map((w) => w.name).join(", ") : "Unknown"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[2px] text-[#7c7569]">Countries</dt>
                  <dd className="font-garamond text-[#1f2328] mt-1">
                    {movie.countries?.length ? movie.countries.map((c) => c.name).join(", ") : "Unknown"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[2px] text-[#7c7569]">Budget</dt>
                  <dd className="font-garamond text-[#1f2328] mt-1">{money(movie.budget)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[2px] text-[#7c7569]">Revenue</dt>
                  <dd className="font-garamond text-[#1f2328] mt-1">{money(movie.revenue)}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={`https://www.justwatch.com/us/search?q=${encodeURIComponent(movie.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[2px] border border-[#b43c2f] px-3 py-2 text-center text-[#8f3227] hover:bg-[#b43c2f] hover:text-white transition-colors"
                >
                  Where to Watch
                </a>
                {movie.archive_url ? (
                  <a
                    href={movie.archive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[2px] border border-[#d9d2c4] px-3 py-2 text-center text-[#6f6a60] hover:border-[#b43c2f] hover:text-[#1f2328] transition-colors"
                  >
                    Watch on Archive.org
                  </a>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-6 py-10 md:py-14 space-y-14">
        {movie.facts?.length ? (
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#b43c2f] mb-3">Production Notes</p>
            <h2 className="font-UnifrakturMaguntia text-3xl mb-5">Behind the Scenes</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {movie.facts.map((fact, index) => (
                <article
                  key={`${fact.fact}-${index}`}
                  className="border border-[#d9d2c4] bg-[#f8f3ea] p-4"
                >
                  <p className="font-garamond text-[#2a2f36] leading-relaxed">{fact.fact}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {movie.cast?.length ? (
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#b43c2f] mb-3">Cast</p>
            <h2 className="font-UnifrakturMaguntia text-3xl mb-5">Top Billed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {movie.cast.map((member, index) => (
                <article key={`${member.name}-${index}`} className="border border-[#d9d2c4] bg-[#f8f3ea]">
                  <div className="aspect-square bg-[#efe7db] overflow-hidden">
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center px-3">
                        <span className="font-garamond italic text-[#7c7569] text-center text-sm">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-garamond text-[#1f2328] leading-tight">{member.name}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[1px] text-[#7c7569] line-clamp-2">
                      {member.character ?? "Role unavailable"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {similar.length ? (
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#b43c2f] mb-3">Recommendations</p>
            <h2 className="font-UnifrakturMaguntia text-3xl mb-5">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
          ) : null}
      </div>

      <style>{`
        .movie-detail-page {
          font-family: 'EB Garamond', Georgia, serif;
        }
        .movie-section-title {
          font-family: 'UnifrakturMaguntia', cursive;
        }
        .movie-meta-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .movie-rating-badge {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b43c2f;
        }
        .movie-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          border: 1px solid #e5e5e5;
          color: #6b7280;
        }
        .movie-cta-primary {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: #b43c2f;
          color: white;
          border: none;
          transition: background 0.2s;
        }
        .movie-cta-primary:hover {
          background: #991b1b;
        }
        .movie-cta-secondary {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid #e5e5e5;
          color: #6b7280;
          transition: all 0.2s;
        }
        .movie-cta-secondary:hover {
          border-color: #b43c2f;
          color: #1f2328;
        }
        .movie-cast-card {
          border: 1px solid #e5e5e5;
          background: #f9fafb;
        }
        .movie-cast-name {
          font-family: 'EB Garamond', Georgia, serif;
          color: #1f2328;
        }
        .movie-cast-character {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
