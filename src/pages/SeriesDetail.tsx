import { useParams, Link } from "react-router-dom";
import { useSeries } from "../hooks/useSeries";
import { Helmet } from "react-helmet-async";
import { pageTitle, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, canonicalUrl } from "../utils/seo";

export default function SeriesDetail() {
  const { seriesSlug } = useParams<{ seriesSlug: string }>();
  const { series, loading, error } = useSeries(seriesSlug || "");

  if (loading)
    return (
      <div className="series-loading">
        <div className="loading-bar" />
      </div>
    );

  if (error || !series)
    return (
      <div className="series-not-found">
        <p>Series not found.</p>
        <Link to="/threads">← Back to Threads</Link>
      </div>
    );

  const allCountries = Array.from(
    new Set((series.parts || []).flatMap((p) => p.countries || [])),
  ).sort();
  const allDecades = Array.from(
    new Set((series.parts || []).flatMap((p) => p.decades || [])),
  ).sort();

  return (
    <div className="series-detail-page">
      {series && (
        <Helmet>
          <title>{pageTitle(`The ${series.title} Tradition in World Cinema`)}</title>
          <meta name="description" content={series.description || series.subtitle || ""} />
          <link rel="canonical" href={canonicalUrl(`/threads/${series.slug}`)} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={`The ${series.title} Tradition in World Cinema`} />
          <meta property="og:description" content={series.description || series.subtitle || ""} />
          <meta property="og:url" content={canonicalUrl(`/threads/${series.slug}`)} />
          <meta property="og:image" content={series.cover_image || DEFAULT_OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`The ${series.title} Tradition in World Cinema`} />
          <meta name="twitter:description" content={series.description || series.subtitle || ""} />
          <meta name="twitter:image" content={series.cover_image || DEFAULT_OG_IMAGE} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": `The ${series.title} Tradition in World Cinema`,
              "description": series.description || series.subtitle,
              "author": {
                "@type": "Organization",
                "name": "VaultOf50",
                "url": SITE_URL
              },
              "publisher": {
                "@type": "Organization",
                "name": "VaultOf50",
                "url": SITE_URL
              },
              "url": canonicalUrl(`/threads/${series.slug}`),
              "hasPart": (series.parts || []).map((part) => ({
                "@type": "Article",
                "name": part.title,
                "url": canonicalUrl(`/threads/${series.slug}/${part.slug}`)
              }))
            })}
          </script>
        </Helmet>
      )}
      {/* Header */}
      <div className="series-detail-header">
        <div className="series-detail-header-inner">
          <Link to="/threads" className="back-link">
            ← The Threads
          </Link>
          <div className="series-detail-subject">{series.subject}</div>
          <h1 className="series-detail-title">{series.title}</h1>
          {series.subtitle && (
            <p className="series-detail-subtitle">{series.subtitle}</p>
          )}
          {series.description && (
            <p className="series-detail-description">{series.description}</p>
          )}

          <div className="series-detail-stats">
            <div className="stat-item">
              <span className="stat-num">{(series.parts || []).length}</span>
              <span className="stat-label">Parts</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">{allCountries.length}</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">{allDecades.length}</span>
              <span className="stat-label">Decades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parts list as timeline */}
      <div className="series-parts-list">
        <div className="parts-list-inner">
          <div className="parts-timeline-label">
            <span>Read in order</span>
          </div>

          <div className="parts-timeline">
            {(series.parts || []).map((part, idx) => (
              <Link
                key={part.id}
                to={`/threads/${series.slug}/${part.slug}`}
                className="part-row"
              >
                <div className="part-row-left">
                  <div className="part-row-num">
                    <span>{String(part.part_number).padStart(2, "0")}</span>
                    {idx < (series.parts || []).length - 1 && (
                      <div className="part-connector" />
                    )}
                  </div>
                </div>
                <div className="part-row-body">
                  <div className="part-row-meta">
                    {(part.decades || []).map((d) => (
                      <span key={d} className="part-decade">
                        {d}
                      </span>
                    ))}
                    {(part.countries || []).map((c) => (
                      <span key={c} className="part-country">
                        {c}
                      </span>
                    ))}
                  </div>
                  <h2 className="part-row-title">{part.title}</h2>
                  {part.subtitle && (
                    <p className="part-row-subtitle">{part.subtitle}</p>
                  )}
                  <div className="part-row-cta">
                    Read Part {part.part_number} <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .series-detail-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .series-loading, .series-not-found {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #6b7280;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
        }

        .series-not-found a {
          color: #b43c2f;
          text-decoration: none;
        }

        .loading-bar {
          width: 120px;
          height: 2px;
          background: #b43c2f;
          animation: expand 1.5s ease-in-out infinite;
        }

        @keyframes expand {
          0%, 100% { transform: scaleX(0.2); opacity: 0.3; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        .series-detail-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 4rem 0 3rem;
        }

        .series-detail-header-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .back-link {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6b7280;
          text-decoration: none;
          margin-bottom: 2.5rem;
          transition: color 0.2s;
        }

        .back-link:hover { color: #b43c2f; }

        .series-detail-subject {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #b43c2f;
          margin-bottom: 1rem;
        }

        .series-detail-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 1rem;
          line-height: 1.05;
        }

        .series-detail-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          font-style: italic;
          margin: 0 0 1.5rem;
        }

        .series-detail-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4b5563;
          max-width: 640px;
          margin: 0 0 2.5rem;
        }

        .series-detail-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-num {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 2rem;
          color: #b43c2f;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000000;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: #e5e5e5;
        }

        .series-parts-list {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
        }

        .parts-list-inner {
          max-width: 720px;
        }

        .parts-timeline-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #000000;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .parts-timeline-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e5e5;
        }

        .parts-timeline {
          display: flex;
          flex-direction: column;
        }

        .part-row {
          display: flex;
          gap: 2rem;
          text-decoration: none;
          color: inherit;
          padding: 2rem 0;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s;
        }

        .part-row:last-child { border-bottom: none; }

        .part-row:hover .part-row-title { color: #b43c2f; }
        .part-row:hover .part-row-cta { color: #b43c2f; }

        .part-row-left {
          width: 40px;
          flex-shrink: 0;
        }

        .part-row-num {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .part-row-num span {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: #b43c2f;
          line-height: 1;
        }

        .part-connector {
          width: 1px;
          flex: 1;
          min-height: 40px;
          background: linear-gradient(to bottom, #fce7e7, transparent);
          margin-top: 0.5rem;
        }

        .part-row-body {
          flex: 1;
          padding-top: 0.1rem;
        }

        .part-row-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .part-decade, .part-country {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          padding: 0.2rem 0.5rem;
          border: 1px solid;
          letter-spacing: 0.05em;
        }

        .part-decade { border-color: #fce7e7; color: #b43c2f; }
        .part-country { border-color: #dbeafe; color: #4b7bec; }

        .part-row-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.9rem;
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 0.4rem;
          line-height: 1.2;
          transition: color 0.2s;
        }

        .part-row-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          font-style: italic;
          margin: 0 0 1rem;
        }

        .part-row-cta {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b43c2f;
          transition: color 0.2s;
        }
      `}</style>
    </div>
  );
}
