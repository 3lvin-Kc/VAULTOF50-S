import { Link } from "react-router-dom";
import { usePublishedContributions } from "../hooks/useContributions";
import { TYPE_LABELS } from "../services/contributions";
import type { Contribution } from "../services/contributions";

function ContributionCard({ c }: { c: Contribution }) {
  const date = new Date(c.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const preview = c.content.slice(0, 200).trim() + "...";

  return (
    <Link to={`/community/${c.slug}`} className="contrib-card">
      <div className="contrib-card-inner">
        <div className="contrib-card-top">
          <span className="contrib-type-badge">{TYPE_LABELS[c.type]}</span>
          <span className="contrib-date">{date}</span>
        </div>
        <h2 className="contrib-title">{c.title}</h2>
        <p className="contrib-preview">{preview}</p>
        <div className="contrib-footer">
          <span className="contrib-author">By {c.display_name}</span>
          <span className="contrib-read">Read →</span>
        </div>
      </div>
    </Link>
  );
}

export default function Community() {
  const { contributions, loading, error } = usePublishedContributions();

  return (
    <div className="community-page">
      <div className="community-header">
        <div className="community-header-inner">
          <div className="community-eyebrow">From the Community</div>
          <h1 className="community-title">
            Written by Horror Fans.
            <br />
            For Horror Fans.
          </h1>
          <p className="community-intro">
            These are not staff pieces. These are not official positions. These
            are horror fans who had something to say and said it. Essays,
            reviews, deep dives — everything submitted, everything reviewed,
            everything here because it earned its place.
          </p>
          <Link to="/submit" className="community-submit-cta">
            Write something <span>→</span>
          </Link>
        </div>
      </div>

      <div className="community-content">
        {loading && (
          <div className="community-loading">
            <div className="loading-bar" />
          </div>
        )}
        {error && (
          <div className="community-error">Failed to load. Try again.</div>
        )}
        {!loading && !error && contributions.length === 0 && (
          <div className="community-empty">
            <p>Nothing here yet.</p>
            <p>Be the first.</p>
            <Link to="/submit">Submit your writing →</Link>
          </div>
        )}
        <div className="contrib-grid">
          {contributions.map((c) => (
            <ContributionCard key={c.id} c={c} />
          ))}
        </div>
      </div>

      <style>{`
        .community-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .community-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 0.75rem 0;
        }

        .community-header-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .community-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #8B0000;
          margin-bottom: 1.5rem;
        }

        .community-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 1.05;
          color: #1f2328;
          margin: 0 0 1.5rem;
        }

        .community-intro {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #000000;
          max-width: 620px;
          margin: 0 0 2rem;
        }

        .community-submit-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1f2328;
          text-decoration: none;
          border: 1px solid #333;
          padding: 0.75rem 1.5rem;
          transition: border-color 0.2s, color 0.2s;
        }

        .community-submit-cta:hover {
          border-color: #8B0000;
          color: #cc0000;
        }

        .community-content {
          max-width: 100%;
          padding: 2rem 1.5rem 4rem;
        }

        .community-loading {
          display: flex;
          justify-content: center;
          padding: 4rem;
        }

        .loading-bar {
          width: 80px;
          height: 2px;
          background: #8B0000;
          animation: expand 1.5s ease-in-out infinite;
        }

        @keyframes expand {
          0%, 100% { transform: scaleX(0.2); opacity: 0.3; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        .community-error {
          text-align: center;
          padding: 4rem;
          color: #555;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
        }

        .community-empty {
          text-align: center;
          padding: 6rem 2rem;
          color: #444;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          line-height: 2;
        }

        .community-empty a {
          color: #8B0000;
          text-decoration: none;
          display: block;
          margin-top: 1rem;
        }

        .contrib-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .contrib-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          border: 1px solid #e5e5e5;
          min-height: 280px;
          transition: border-color 0.2s;
        }

        .contrib-card:hover {
          border-color: #000000;
        }

        .contrib-card:first-child {
          border-top: 1px solid #e5e5e5;
        }

        .contrib-card-inner {
          padding: 1.5rem;
          transition: background 0.2s;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .contrib-card:hover .contrib-card-inner {
          background: #0a0a0a;
          padding-left: 1rem;
          padding-right: 1rem;
          margin: 0 -1rem;
        }

        .contrib-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .contrib-type-badge {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8B0000;
          border: 1px solid #2a1a1a;
          padding: 0.2rem 0.6rem;
        }

        .contrib-date {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: #333;
          letter-spacing: 0.1em;
        }

        .contrib-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 0.75rem;
          line-height: 1.2;
          transition: color 0.2s;
        }

        .contrib-card:hover .contrib-title {
          color: #fff;
        }

        .contrib-preview {
          font-size: 1rem;
          line-height: 1.7;
          color: #666;
          margin: 0 0 1.25rem;
          max-width: 680px;
        }

        .contrib-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 680px;
        }

        .contrib-author {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: #444;
          letter-spacing: 0.1em;
        }

        .contrib-read {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: #8B0000;
          letter-spacing: 0.1em;
          transition: letter-spacing 0.2s;
        }

        .contrib-card:hover .contrib-read {
          letter-spacing: 0.2em;
        }
      `}</style>
    </div>
  );
}
