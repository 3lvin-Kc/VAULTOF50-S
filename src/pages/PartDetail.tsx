import { useParams, Link } from "react-router-dom";
import { useSeriesPart } from "../hooks/useSeries";
import { useSeries } from "../hooks/useSeries";
import { Helmet } from "react-helmet-async";
import { pageTitle, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, canonicalUrl } from "../utils/seo";
import { RelatedLinks } from "../components/RelatedLinks";
import { THREAD_RELATED_LINKS } from "../utils/relatedLinks";

function PartContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div className="part-content">
      {paragraphs.map((para, i) => {
        if (para.trim() === "---") {
          return (
            <div key={i} className="part-divider">
              <span>✦</span>
            </div>
          );
        }
        return <p key={i}>{para.trim()}</p>;
      })}
    </div>
  );
}

export default function PartDetail() {
  const { seriesSlug, partSlug } = useParams<{
    seriesSlug: string;
    partSlug: string;
  }>();
  const { part, loading, error } = useSeriesPart(
    seriesSlug || "",
    partSlug || "",
  );
  const { series } = useSeries(seriesSlug || "");

  const parts = series?.parts || [];
  const currentIndex = parts.findIndex((p) => p.slug === partSlug);
  const prevPart = currentIndex > 0 ? parts[currentIndex - 1] : null;
  const nextPart =
    currentIndex < parts.length - 1 ? parts[currentIndex + 1] : null;

  if (loading)
    return (
      <div className="part-loading">
        <div className="loading-bar" />
      </div>
    );

  if (error || !part)
    return (
      <div className="part-not-found">
        <p>Part not found.</p>
        <Link to={`/threads/${seriesSlug}`}>← Back to Series</Link>
      </div>
    );

  return (
    <div className="part-detail-page">
      {part && series && (
        <Helmet>
          <title>
            {pageTitle(`${part.title} — ${series.title} Part ${part.part_number}`)}
          </title>
          <meta name="description" content={part.subtitle || ""} />
          <link rel="canonical" href={canonicalUrl(`/threads/${seriesSlug}/${part.slug}`)} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={`${part.title} — ${series.title} Part ${part.part_number}`} />
          <meta property="og:description" content={part.subtitle || ""} />
          <meta property="og:url" content={canonicalUrl(`/threads/${seriesSlug}/${part.slug}`)} />
          <meta property="og:image" content={DEFAULT_OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${part.title} — ${series.title} Part ${part.part_number}`} />
          <meta name="twitter:description" content={part.subtitle || ""} />
          <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": `${part.title} — ${series.title} Part ${part.part_number}`,
              "description": part.subtitle,
              ...(part.created_at ? { "datePublished": part.created_at } : {}),
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
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl(`/threads/${seriesSlug}/${part.slug}`)
              },
              "url": canonicalUrl(`/threads/${seriesSlug}/${part.slug}`),
              "isPartOf": {
                "@type": "CreativeWorkSeries",
                "name": series.title,
                "url": canonicalUrl(`/threads/${seriesSlug}`)
              }
            })}
          </script>
        </Helmet>
      )}
      {/* Top nav */}
      <div className="part-top-nav">
        <Link to={`/threads/${seriesSlug}`} className="series-nav-link">
          <span className="series-nav-subject">
            {part.series?.subject || part.series?.title}
          </span>
          <span className="series-nav-arrow">↗</span>
        </Link>
        <div className="part-progress">
          {parts.map((p) => (
            <Link
              key={p.id}
              to={`/threads/${seriesSlug}/${p.slug}`}
              className={`progress-dot ${p.slug === partSlug ? "active" : ""}`}
              title={p.title}
            />
          ))}
        </div>
      </div>

      {/* Part header */}
      <div className="part-header">
        <div className="part-header-inner">
          <div className="part-header-meta">
            <span className="part-num-label">Part {part.part_number}</span>
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
          <h1 className="part-title">{part.title}</h1>
          {part.subtitle && <p className="part-subtitle">{part.subtitle}</p>}
        </div>
      </div>

      {/* Essay body */}
      <div className="part-body">
        <div className="part-body-inner">
          {part.content && <PartContent content={part.content} />}
          <RelatedLinks links={THREAD_RELATED_LINKS[part.slug] ?? []} />
        </div>
      </div>

      {/* Prev / Next */}
      <div className="part-nav">
        <div className="part-nav-inner">
          {prevPart ? (
            <Link
              to={`/threads/${seriesSlug}/${prevPart.slug}`}
              className="part-nav-link prev"
            >
              <span className="nav-direction">← Previous</span>
              <span className="nav-title">{prevPart.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextPart ? (
            <Link
              to={`/threads/${seriesSlug}/${nextPart.slug}`}
              className="part-nav-link next"
            >
              <span className="nav-direction">Next →</span>
              <span className="nav-title">{nextPart.title}</span>
            </Link>
          ) : (
            <Link to={`/threads/${seriesSlug}`} className="part-nav-link next">
              <span className="nav-direction">Series complete</span>
              <span className="nav-title">Back to {part.series?.title}</span>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .part-detail-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .part-loading, .part-not-found {
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

        .part-not-found a { color: #b43c2f; text-decoration: none; }

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

        .part-top-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e5e5e5;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .series-nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6b7280;
          transition: color 0.2s;
        }

        .series-nav-link:hover { color: #b43c2f; }

        .series-nav-subject { color: inherit; }
        .series-nav-arrow { color: #b43c2f; }

        .part-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e5e5e5;
          border: 1px solid #d1d5db;
          transition: background 0.2s, border-color 0.2s;
        }

        .progress-dot.active {
          background: #b43c2f;
          border-color: #b43c2f;
        }

        .progress-dot:hover {
          background: #000000;
          border-color: #000000;
        }

        .part-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 1.5rem 0;
        }

        .part-header-inner {
          max-width: 740px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .part-header-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .part-num-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #b43c2f;
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

        .part-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }

        .part-subtitle {
          font-size: 1rem;
          color: #6b7280;
          font-style: italic;
          margin: 0;
        }

        .part-body {
          padding: 4rem 2rem 3rem;
        }

        .part-body-inner {
          max-width: 680px;
          margin: 0 auto;
        }

        .part-content p {
          font-size: 1.15rem;
          line-height: 1.85;
          color: #4b5563;
          margin: 0 0 1.75rem;
        }

        .part-content p:first-child::first-letter {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 4.5rem;
          float: left;
          line-height: 0.75;
          margin: 0.1em 0.1em 0 0;
          color: #b43c2f;
        }

        .part-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 0;
          color: #b43c2f;
          font-size: 0.7rem;
          opacity: 0.6;
        }

        .part-nav {
          border-top: 1px solid #e5e5e5;
          padding: 3rem 2rem;
        }

        .part-nav-inner {
          max-width: 740px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          gap: 2rem;
        }

        .part-nav-link {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-decoration: none;
          max-width: 280px;
        }

        .part-nav-link.next {
          align-items: flex-end;
          text-align: right;
        }

        .nav-direction {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000000;
          transition: color 0.2s;
        }

        .part-nav-link:hover .nav-direction { color: #b43c2f; }

        .nav-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: #6b7280;
          transition: color 0.2s;
          line-height: 1.2;
        }

        .part-nav-link:hover .nav-title { color: #1f2328; }
      `}</style>
    </div>
  );
}
