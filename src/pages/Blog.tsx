import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORIES = [
  { label: "Genre Deep Dives", value: "genre" },
  { label: "Country Profiles", value: "country" },
];

export default function Blog() {
  const { blogs, loading, error } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string>("genre");

  const filteredBlogs = blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">
          The <span className="blog-title-accent">Vault</span> Journal
        </h1>
      </div>

      <div className="blog-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`blog-tab ${selectedCategory === cat.value ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="blog-content">
        {loading && (
          <div className="blog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="blog-card-skeleton" />
            ))}
          </div>
        )}

        {error && (
          <p className="blog-error">Failed to load posts.</p>
        )}

        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="blog-empty">
            <p className="blog-empty-title">No Posts Yet</p>
            <p className="blog-empty-sub">Coming soon</p>
          </div>
        )}

        {!loading && filteredBlogs.length > 0 && (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="blog-card"
              >
                <div className="blog-card-image">
                  {blog.cover_image ? (
                    <img
                      src={
                        blog.cover_image.startsWith("http")
                          ? blog.cover_image
                          : `${TMDB_IMAGE_BASE}${blog.cover_image}`
                      }
                      alt={blog.title}
                      className="blog-card-img"
                    />
                  ) : (
                    <div className="blog-card-placeholder">
                      <span className="blog-card-placeholder-icon">V</span>
                    </div>
                  )}
                </div>

                <div className="blog-card-body">
                  <p className="blog-card-date">{formatDate(blog.created_at)}</p>
                  <h2 className="blog-card-title">{blog.title}</h2>
                  {blog.excerpt && (
                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                  )}
                  <span className="blog-card-cta">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .blog-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .blog-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 1.5rem 1.5rem;
        }

        .blog-title {
          font-family: 'UnifrakturMaguntia', cursive;
          font-size: clamp(1.875rem, 4vw, 2.5rem);
          color: #1f2328;
          margin: 0;
          line-height: 1;
        }

        .blog-title-accent {
          color: #b43c2f;
        }

        .blog-tabs {
          border-bottom: 1px solid #e5e5e5;
          background: white;
          padding: 1rem 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .blog-tab {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border: 1px solid #e5e5e5;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .blog-tab.active {
          background: #b43c2f;
          border-color: #b43c2f;
          color: white;
        }

        .blog-tab:not(.active):hover {
          border-color: #b43c2f;
          color: #1f2328;
        }

        .blog-content {
          padding: 3rem 1.5rem;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .blog-card-skeleton {
          background: #f3f4f6;
          animation: pulse 1.5s ease-in-out infinite;
          height: 20rem;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .blog-error {
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .blog-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8rem 0;
          gap: 1rem;
        }

        .blog-empty-title {
          font-family: 'UnifrakturMaguntia', cursive;
          font-size: 2.25rem;
          color: #d1d5db;
          margin: 0;
        }

        .blog-empty-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          background: white;
          border: 1px solid #e5e5e5;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease;
        }

        .blog-card:hover {
          border-color: #b43c2f;
        }

        .blog-card-image {
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #f3f4f6;
        }

        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .blog-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-card-placeholder-icon {
          font-family: 'UnifrakturMaguntia', cursive;
          font-size: 2.25rem;
          color: #d1d5db;
        }

        .blog-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.75rem;
        }

        .blog-card-date {
          font-family: 'Space Mono', monospace;
          font-size: 0.5625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }

        .blog-card-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.25rem;
          color: #1f2328;
          margin: 0;
          line-height: 1.3;
          transition: color 0.2s;
        }

        .blog-card:hover .blog-card-title {
          color: #b43c2f;
        }

        .blog-card-excerpt {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 0.875rem;
          font-style: italic;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
          flex: 1;
        }

        .blog-card-cta {
          font-family: 'Space Mono', monospace;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b43c2f;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
