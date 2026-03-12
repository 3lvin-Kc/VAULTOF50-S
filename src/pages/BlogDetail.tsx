import { useParams, useNavigate, Link } from "react-router-dom";
import { useBlog, useBlogMovies, useRelatedBlogs } from "../hooks/useBlogs";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w342";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlog(slug ?? "");
  const { movies } = useBlogMovies(blog?.id ?? null);
  const { relatedBlogs } = useRelatedBlogs(blog?.id ?? null);

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <p className="blog-loading-text">Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-missing">
        <p className="blog-missing-title">Post Not Found</p>
        <button onClick={() => navigate("/blog")} className="blog-missing-btn">
          ← Back to Journal
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-back">
        <button onClick={() => navigate(-1)} className="blog-back-btn">
          ← Back
        </button>
      </div>

      <article className="blog-detail-article">
        <p className="blog-detail-date">{formatDate(blog.created_at)}</p>
        <h1 className="blog-detail-title">{blog.title}</h1>
        <div className="blog-detail-divider" />
        <div className="blog-detail-content">
  {blog.content.split('\n\n').map((paragraph, i) => (
    <p key={i}>{paragraph}</p>
  ))}
</div>
      </article>

      {movies.length > 0 && (
        <div className="blog-films-section">
          <div className="blog-films-inner">
            <p className="blog-films-label">Films Mentioned</p>
            <h2 className="blog-films-heading">In This Article</h2>

            <div className="blog-films-grid">
              {movies.map(({ movies: movie }) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="blog-film-card"
                >
                  <div className="blog-film-poster">
                    {movie.poster_path ? (
                      <img
                        src={`${TMDB_POSTER_BASE}${movie.poster_path}`}
                        alt={movie.title}
                        className="blog-film-img"
                      />
                    ) : (
                      <div className="blog-film-placeholder">
                        <span>{movie.title}</span>
                      </div>
                    )}
                  </div>
                  <p className="blog-film-year">{movie.release_year}</p>
                  <p className="blog-film-name">{movie.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {relatedBlogs && relatedBlogs.length > 0 && (
        <div className="blog-related-section">
          <div className="blog-related-inner">
            <p className="blog-related-label">Related Posts</p>
            <h2 className="blog-related-heading">Keep Reading</h2>

            <div className="blog-related-grid">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="blog-related-card"
                >
                  <div className="blog-related-image">
                    {related.cover_image ? (
                      <img
                        src={
                          related.cover_image.startsWith("http")
                            ? related.cover_image
                            : `${TMDB_IMAGE_BASE}${related.cover_image}`
                        }
                        alt={related.title}
                        className="blog-related-img"
                      />
                    ) : (
                      <div className="blog-related-placeholder">
                        <span>V</span>
                      </div>
                    )}
                  </div>
                  <h3 className="blog-related-title">{related.title}</h3>
                  {related.excerpt && (
                    <p className="blog-related-excerpt">{related.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .blog-detail-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .blog-detail-loading {
          min-height: 100vh;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-loading-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #000000;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .blog-detail-missing {
          min-height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .blog-missing-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 2.25rem;
          color: #d1d5db;
          margin: 0;
        }

        .blog-missing-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .blog-missing-btn:hover {
          color: #1f2328;
        }

        .blog-detail-back {
          padding: 2rem 1.5rem 0;
        }

        .blog-back-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .blog-back-btn:hover {
          color: #1f2328;
        }

        .blog-detail-article {
          max-width: 48rem;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        .blog-detail-date {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #b43c2f;
          margin: 0 0 1rem;
        }

        .blog-detail-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(2.25rem, 5vw, 3.75rem);
          color: #1f2328;
          margin: 0 0 1.5rem;
          line-height: 1;
        }

        .blog-detail-divider {
          width: 3rem;
          height: 1px;
          background: #b43c2f;
          margin-bottom: 2.5rem;
        }

        .blog-detail-content {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.125rem;
          color: #4b5563;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .blog-detail-content p {
          margin: 0 0 1.5rem;
        }

        .blog-films-section {
          border-top: 1px solid #e5e5e5;
          padding: 3rem 1.5rem;
          background: white;
        }

        .blog-films-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .blog-films-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #000000;
          margin: 0 0 0.5rem;
        }

        .blog-films-heading {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.5rem;
          color: #1f2328;
          margin: 0 0 2rem;
        }

        .blog-films-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .blog-films-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (min-width: 768px) {
          .blog-films-grid { grid-template-columns: repeat(6, 1fr); }
        }

        @media (min-width: 1024px) {
          .blog-films-grid { grid-template-columns: repeat(8, 1fr); }
        }

        .blog-film-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
        }

        .blog-film-poster {
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: #f3f4f6;
        }

        .blog-film-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-film-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }

        .blog-film-placeholder span {
          font-family: 'EB Garamond', Georgia, serif;
          font-style: italic;
          font-size: 0.75rem;
          color: #000000;
          text-align: center;
        }

        .blog-film-year {
          font-family: 'Space Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          color: #000000;
          margin: 0;
        }

        .blog-film-name {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.3;
          transition: color 0.2s;
        }

        .blog-film-card:hover .blog-film-name {
          color: #1f2328;
        }

        .blog-related-section {
          border-top: 1px solid #e5e5e5;
          padding: 3rem 1.5rem;
          background: white;
        }

        .blog-related-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .blog-related-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #000000;
          margin: 0 0 0.5rem;
        }

        .blog-related-heading {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.5rem;
          color: #1f2328;
          margin: 0 0 2rem;
        }

        .blog-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .blog-related-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .blog-related-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
        }

        .blog-related-image {
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #f3f4f6;
        }

        .blog-related-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-related-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-related-placeholder span {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.875rem;
          color: #d1d5db;
        }

        .blog-related-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.125rem;
          color: #1f2328;
          margin: 0;
          line-height: 1.3;
          transition: color 0.2s;
        }

        .blog-related-card:hover .blog-related-title {
          color: #b43c2f;
        }

        .blog-related-excerpt {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.875rem;
          font-style: italic;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
