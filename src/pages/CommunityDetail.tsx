import { useParams, Link } from "react-router-dom";
import { useContribution } from "../hooks/useContributions";
import { TYPE_LABELS } from "../services/contributions";

function ContributionBody({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  return (
    <div className="contrib-body">
      {paragraphs.map((para, i) => {
        if (para.trim() === "---") {
          return (
            <div key={i} className="contrib-divider">
              <span>✦</span>
            </div>
          );
        }
        return <p key={i}>{para.trim()}</p>;
      })}
    </div>
  );
}

export default function CommunityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { contribution, loading, error } = useContribution(slug || "");

  if (loading)
    return (
      <div className="contrib-detail-loading">
        <div className="loading-bar" />
      </div>
    );

  if (error || !contribution)
    return (
      <div className="contrib-detail-missing">
        <p>Piece not found.</p>
        <Link to="/community">← Back to Community</Link>
      </div>
    );

  const date = new Date(contribution.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="contrib-detail-page">
      <div className="contrib-detail-header">
        <div className="contrib-detail-header-inner">
          <Link to="/community" className="back-link">
            ← Community
          </Link>
          <div className="contrib-detail-meta">
            <span className="contrib-type-badge">
              {TYPE_LABELS[contribution.type]}
            </span>
            <span className="contrib-detail-date">{date}</span>
          </div>
          <h1 className="contrib-detail-title">{contribution.title}</h1>
          <div className="contrib-detail-byline">
            <span className="byline-label">Written by</span>
            <span className="byline-name">{contribution.display_name}</span>
            <span className="byline-tag">Community</span>
          </div>
        </div>
      </div>

      <div className="contrib-detail-content">
        <div className="contrib-detail-content-inner">
          <ContributionBody content={contribution.content} />
        </div>
      </div>

      <div className="contrib-detail-footer">
        <div className="contrib-detail-footer-inner">
          <Link to="/community" className="footer-back">
            ← Back to Community
          </Link>
          <Link to="/submit" className="footer-submit">
            Write something too →
          </Link>
        </div>
      </div>

      <style>{`
        .contrib-detail-page {
          min-height: 100vh;
          background: white;
          color: #1f2328;
          font-family: 'EB Garamond', Georgia, serif;
        }

        .contrib-detail-loading, .contrib-detail-missing {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #555;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
        }

        .contrib-detail-missing a { color: #8B0000; text-decoration: none; }

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

        .contrib-detail-header {
          border-bottom: 1px solid #e5e5e5;
          padding: 4rem 0 3rem;
        }

        .contrib-detail-header-inner {
          max-width: 740px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .back-link {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #444;
          text-decoration: none;
          margin-bottom: 2.5rem;
          transition: color 0.2s;
        }

        .back-link:hover { color: #8B0000; }

        .contrib-detail-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
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

        .contrib-detail-date {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: #333;
          letter-spacing: 0.1em;
        }

        .contrib-detail-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          color: #1f2328;
          margin: 0 0 1.5rem;
          line-height: 1.1;
        }

        .contrib-detail-byline {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .byline-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: #333;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .byline-name {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: #000000;
          letter-spacing: 0.05em;
        }

        .byline-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: #555;
          border: 1px solid #222;
          padding: 0.15rem 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contrib-detail-content {
          padding: 4rem 2rem 3rem;
        }

        .contrib-detail-content-inner {
          max-width: 680px;
          margin: 0 auto;
        }

        .contrib-body p {
          font-size: 1.15rem;
          line-height: 1.85;
          color: #4b5563;
          margin: 0 0 1.75rem;
        }

        .contrib-body p:first-child::first-letter {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 4.5rem;
          float: left;
          line-height: 0.75;
          margin: 0.1em 0.1em 0 0;
          color: #8B0000;
        }

        .contrib-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 0;
          color: #8B0000;
          font-size: 0.7rem;
          opacity: 0.5;
        }

        .contrib-detail-footer {
          border-top: 1px solid #e5e5e5;
          padding: 2.5rem 2rem;
        }

        .contrib-detail-footer-inner {
          max-width: 740px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-back, .footer-submit {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-back { color: #444; }
        .footer-back:hover { color: #000000; }
        .footer-submit { color: #8B0000; }
        .footer-submit:hover { color: #cc0000; }
      `}</style>
    </div>
  );
}
