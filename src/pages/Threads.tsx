import { Link } from "react-router-dom";
import { useAllSeries } from "../hooks/useSeries";
import type { Series } from "../services/series";
import { Helmet } from "react-helmet-async";
import { STATIC_SEO, SITE_NAME, DEFAULT_OG_IMAGE, canonicalUrl } from "../utils/seo";

function SeriesCard({ s }: { s: Series }) {
  const allCountries = Array.from(
    new Set((s.parts || []).flatMap((p) => p.countries || [])),
  );
  const allDecades = Array.from(
    new Set((s.parts || []).flatMap((p) => p.decades || [])),
  ).sort();

  return (
    <Link to={`/threads/${s.slug}`} className="series-card">
      <div className="series-card-inner">
        <div className="series-subject">{s.subject}</div>
        <h2 className="series-title">{s.title}</h2>
        {s.subtitle && <p className="series-subtitle">{s.subtitle}</p>}
        {s.description && <p className="series-description">{s.description}</p>}

        <div className="series-meta">
          {allDecades.length > 0 && (
            <div className="meta-row">
              <span className="meta-label">Decades</span>
              <div className="meta-tags">
                {allDecades.map((d) => (
                  <span key={d} className="meta-tag decade-tag">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
          {allCountries.length > 0 && (
            <div className="meta-row">
              <span className="meta-label">Countries</span>
              <div className="meta-tags">
                {allCountries.map((c) => (
                  <span key={c} className="meta-tag country-tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="series-parts-preview">
          {(s.parts || []).map((part) => (
            <div key={part.id} className="part-preview-row">
              <span className="part-num">0{part.part_number}</span>
              <span className="part-preview-title">{part.title}</span>
              {part.subtitle && (
                <span className="part-preview-sub">{part.subtitle}</span>
              )}
            </div>
          ))}
        </div>

        <div className="series-cta">
          Read Series <span className="cta-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function Threads() {
  const { series, loading, error } = useAllSeries();

  return (
    <div className="threads-page">
      <Helmet>
        <title>{STATIC_SEO.threads.title}</title>
        <meta name="description" content={STATIC_SEO.threads.description} />
        <link rel="canonical" href={canonicalUrl('/threads')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={STATIC_SEO.threads.title} />
        <meta property="og:description" content={STATIC_SEO.threads.description} />
        <meta property="og:url" content={canonicalUrl('/threads')} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={STATIC_SEO.threads.title} />
        <meta name="twitter:description" content={STATIC_SEO.threads.description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>
      <div className="threads-header">
        <div className="threads-header-inner">
          <div className="threads-eyebrow">The Threads</div>
          <h1 className="threads-title">
            One Monster.
            <br />
            Every Country.
            <br />
            Every Decade.
          </h1>
          <p className="threads-intro">
            Some horror ideas are too big for one country or one decade to
            contain. These are the series that follow a single subject a
            monster, a mythology, a format as it migrates across borders and
            gets rebuilt from local materials. Each part is its own essay.
            Together they tell a different kind of story.
          </p>
        </div>
        <div className="threads-header-ornament">
          <div className="ornament-line" />
          <div className="ornament-skull">✦</div>
          <div className="ornament-line" />
        </div>
      </div>

      <div className="threads-content">
        {loading && (
          <div className="threads-loading">
            <div className="loading-pulse" />
            <span>Loading threads...</span>
          </div>
        )}
        {error && <div className="threads-error">Failed to load threads.</div>}
        {!loading && !error && series.length === 0 && (
          <div className="threads-empty">No threads yet. Check back soon.</div>
        )}
        <div className="series-grid">
          {series.map((s) => (
            <SeriesCard key={s.id} s={s} />
          ))}
        </div>
      </div>

      <style>{`
        .threads-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .threads-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 5rem 0 3rem;
        }

        .threads-header-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .threads-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #b43c2f;
          margin-bottom: 1.5rem;
        }

        .threads-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.05;
          color: #1f2328;
          margin: 0 0 2rem;
          font-weight: 400;
        }

        .threads-intro {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #6b7280;
          max-width: 640px;
          margin: 0;
        }

        .threads-header-ornament {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 800px;
          margin: 2.5rem auto 0;
          padding: 0 2rem;
        }

        .ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d1d5db);
        }

        .ornament-line:last-child {
          background: linear-gradient(90deg, #d1d5db, transparent);
        }

        .ornament-skull {
          color: #b43c2f;
          font-size: 0.8rem;
        }

        .threads-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
        }

        .threads-loading, .threads-error, .threads-empty {
          text-align: center;
          padding: 4rem;
          color: #6b7280;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
        }

        .loading-pulse {
          width: 40px;
          height: 2px;
          background: #b43c2f;
          margin: 0 auto 1rem;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .series-grid {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .series-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .series-card-inner {
          border: 1px solid #e5e5e5;
          padding: 3rem;
          background: #f9fafb;
          transition: border-color 0.3s ease, background 0.3s ease;
          position: relative;
        }

        .series-card:hover .series-card-inner {
          border-color: #b43c2f;
          background: #fafafa;
        }

        .series-card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: #b43c2f;
          transition: height 0.4s ease;
        }

        .series-card:hover .series-card-inner::before {
          height: 100%;
        }

        .series-subject {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #b43c2f;
          margin-bottom: 1rem;
        }

        .series-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 3rem;
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 0.5rem;
          line-height: 1.1;
        }

        .series-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin: 0 0 1.5rem;
          font-style: italic;
        }

        .series-description {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #4b5563;
          margin: 0 0 2.5rem;
          max-width: 680px;
        }

        .series-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #e5e5e5;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .meta-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000000;
          min-width: 70px;
        }

        .meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .meta-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          padding: 0.25rem 0.6rem;
          border: 1px solid #d1d5db;
          color: #6b7280;
          letter-spacing: 0.05em;
        }

        .decade-tag { border-color: #fce7e7; color: #b43c2f; }
        .country-tag { border-color: #dbeafe; color: #4b7bec; }

        .series-parts-preview {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .part-preview-row {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
        }

        .part-num {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: #000000;
          min-width: 20px;
        }

        .part-preview-title {
          font-size: 1rem;
          color: #6b7280;
          transition: color 0.2s;
        }

        .series-card:hover .part-preview-title {
          color: #1f2328;
        }

        .part-preview-sub {
          font-size: 0.85rem;
          color: #000000;
          font-style: italic;
        }

        .series-cta {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b43c2f;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.2s;
        }

        .series-card:hover .series-cta {
          gap: 1rem;
        }

        .cta-arrow {
          transition: transform 0.2s;
        }

        .series-card:hover .cta-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
