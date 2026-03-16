import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMyContributions, useDeleteContribution } from "../hooks/useContributions";
import { submitContribution, TYPE_LABELS } from "../services/contributions";
import type { ContributionType } from "../services/contributions";
import { Helmet } from "react-helmet-async";
import { STATIC_SEO } from "../utils/seo";

const SUBMIT_STYLES = `
  .submit-page {
    min-height: 100vh;
    background: white;
    color: #1f2328;
    font-family: 'EB Garamond', Georgia, serif;
    position: relative;
  }

  /* ── Loading ── */
  .submit-loading {
    min-height: 100vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-bar {
    width: 80px;
    height: 2px;
    background: #b43c2f;
    animation: expand 1.5s ease-in-out infinite;
  }

  @keyframes expand {
    0%, 100% { transform: scaleX(0.2); opacity: 0.3; }
    50%       { transform: scaleX(1);   opacity: 1;   }
  }

  .submit-back-btn {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
    text-decoration: none;
    z-index: 10;
  }

  .submit-back-btn:hover {
    color: #b43c2f;
  }

  /* ── Form page ── */
  .submit-form-header {
    border-bottom: 1px solid #e5e5e5;
    padding: 1rem 0;
  }

  .submit-form-header-inner {
    max-width: 740px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: flex-end;
  }

  .submit-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #b43c2f;
    margin-bottom: 1rem;
  }

  .submit-title {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 400;
    color: #1f2328;
    margin: 0 0 1rem;
  }

  .submit-desc {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #000000;
    margin: 0 0 1.5rem;
    max-width: 580px;
  }

  .submit-user-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .submit-user-email {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #000000;
  }

  .submit-signout {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: #000000;
    background: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0;
    transition: color 0.2s;
  }

  .submit-signout:hover { color: #b43c2f; }

  .submit-pending-notice {
    background: #fef2f2;
    border-bottom: 1px solid #fecaca;
  }

  .submit-pending-inner {
    max-width: 740px;
    margin: 0 auto;
    padding: 0.75rem 2rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #b43c2f;
    letter-spacing: 0.05em;
  }

  .submit-form-body {
    position: relative;
    padding: 3rem 2rem 6rem;
  }

  .submit-form-inner {
    max-width: 740px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .form-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #555;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form-label-hint {
    color: #333;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    text-transform: none;
  }

  .form-input {
    background: #ffffff;
    border: 1px solid #d1d5db;
    color: #1f2328;
    padding: 0.85rem 1rem;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .form-input:focus { border-color: #b43c2f; }

  .medium-types {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .medium-type-btn {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.4rem 0.75rem;
    border: 1px solid #e5e5e5;
    background: white;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }

  .medium-type-btn:hover {
    border-color: #b43c2f;
    color: #1f2328;
  }

  .medium-type-btn.active {
    background: #1f2328;
    border-color: #1f2328;
    color: white;
  }

  .medium-title {
    width: 100%;
    border: none;
    background: transparent;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 2rem;
    font-weight: 600;
    color: #1f2328;
    outline: none;
    margin-bottom: 1.5rem;
  }

  .medium-title::placeholder {
    color: #000000;
  }

  .medium-content {
    width: 100%;
    border: none;
    background: transparent;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #1f2328;
    outline: none;
    resize: none;
    min-height: 400px;
  }

  .medium-content::placeholder {
    color: #000000;
    font-style: italic;
  }

  .form-textarea {
    background: #ffffff;
    border: 1px solid #d1d5db;
    color: #1f2328;
    padding: 1rem;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 1rem;
    line-height: 1.8;
    outline: none;
    resize: vertical;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .form-textarea:focus { border-color: #b43c2f; }

  .char-count {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: #333;
    text-align: right;
  }

  .char-warning { color: #b43c2f; }

  .type-picker {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .type-option {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    background: #f9fafb;
    border: 1px solid #1e1e1e;
    padding: 1rem 1.25rem;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.2s, background 0.2s;
  }

  .type-option:hover { border-color: #d1d5db; }
  .type-option.active { border-color: #b43c2f; background: #f9fafb; }

  .type-option-name {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f2328;
  }

  .type-option.active .type-option-name { color: #b43c2f; }

  .type-option-desc {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 0.9rem;
    color: #000000;
  }

  .submit-error {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: #b43c2f;
    border: 1px solid #2a0000;
    padding: 0.75rem 1rem;
    background: #0f0505;
  }

  .submit-btn {
    background: #b43c2f;
    color: #1f2328;
    border: none;
    padding: 1rem 2rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    align-self: flex-start;
  }

  .submit-btn:hover:not(:disabled) { background: #b43c2f; }
  .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .submit-note {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: #333;
    letter-spacing: 0.05em;
    margin: 0;
  }

  /* ── Success ── */
  .submit-success {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .submit-success-inner {
    max-width: 480px;
    text-align: center;
  }

  .success-icon {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1.5rem;
  }

  .success-title {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 3rem;
    font-weight: 400;
    color: #1f2328;
    margin: 0 0 1rem;
  }

  .success-desc {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #000000;
    margin: 0 0 2rem;
  }

  .success-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .success-link {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #555;
    text-decoration: none;
    letter-spacing: 0.1em;
    transition: color 0.2s;
  }

  .success-link:hover { color: #aaa; }

  .success-again {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #b43c2f;
    background: none;
    border: 1px solid #2a1a1a;
    padding: 0.5rem 1rem;
    cursor: pointer;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s;
  }

  .success-again:hover { border-color: #b43c2f; color: #b43c2f; }

  /* ── My Contributions ── */
  .contrib-my-card {
    border: 1px solid #1a1a1a;
    padding: 0.5rem;
    margin-bottom: 0.35rem;
    background: #0d0d0d;
  }

  .contrib-my-card-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .contrib-status {
    font-family: 'Space Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border: 1px solid;
  }

  .contrib-status--pending  { color: #fff;    border-color: #333; }
  .contrib-status--rejected { color: #8B0000; border-color: #2a1a1a; }

  .contrib-my-title {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 0.9rem;
    color: #fff;
    margin: 0 0 0.5rem;
  }

  .contrib-delete-btn {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #444;
    background: none;
    border: 1px solid #1a1a1a;
    padding: 0.4rem 0.9rem;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }

  .contrib-delete-btn:hover { color: #8B0000; border-color: #8B0000; }

  .contrib-confirm {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #888;
  }

  .contrib-confirm-yes {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F0E8;
    background: #8B0000;
    border: none;
    padding: 0.4rem 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .contrib-confirm-yes:hover:not(:disabled) { background: #cc0000; }
  .contrib-confirm-yes:disabled { opacity: 0.4; }

  .contrib-confirm-no {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    background: none;
    border: 1px solid #222;
    padding: 0.4rem 0.9rem;
    cursor: pointer;
    transition: color 0.2s;
  }

  .contrib-confirm-no:hover { color: #aaa; }
`;

function SubmitForm({ userId }: { userId: string }) {
  const { contributions } = useMyContributions(userId);
  const { remove, deleting } = useDeleteContribution();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContributionType>("essay");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const pendingCount = contributions.filter(
    (c) => c.status === "pending",
  ).length;

  const authorName = "Anonymous";

  const handleSubmit = async () => {
    if (!title.trim()) return setError("Add a title.");
    if (content.trim().length < 500)
      return setError("Too short. Write more. Minimum 500 characters.");
    if (pendingCount >= 3)
      return setError(
        "You already have 3 pieces under review. Wait for those to be processed.",
      );

    setSubmitting(true);
    setError("");
    const { error } = await submitContribution(
      userId,
      authorName,
      title,
      content,
      type,
    );
    setSubmitting(false);
    if (error) return setError(error);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="submit-success">
        <div className="submit-success-inner">
          <div className="success-icon">✦</div>
          <h2 className="success-title">Submitted.</h2>
          <p className="success-desc">
            Your piece is under review. If it fits the vault it goes live on the
            Community page. No timeline promises — just honest reading.
          </p>
          <div className="success-actions">
            <Link to="/community" className="success-link">
              ← See what's live
            </Link>
            <button
              className="success-again"
              onClick={() => {
                setSubmitted(false);
                setTitle("");
                setContent("");
              }}
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{STATIC_SEO.submit.title}</title>
        <meta name="description" content={STATIC_SEO.submit.description} />
      </Helmet>
      {pendingCount > 0 && (
        <div className="submit-pending-notice">
          <div className="submit-pending-inner">
            You have {pendingCount} piece{pendingCount > 1 ? "s" : ""} under
            review.
            {pendingCount >= 3 &&
              " You cannot submit more until some are processed."}
          </div>
        </div>
      )}

      <Link to="/community" className="submit-back-btn">
        ← Community
      </Link>

      <div className="submit-form-body">
        <div className="submit-form-inner">
          {contributions
            .filter(c => c.status !== 'published')
            .map(c => (
              <div key={c.id} className="contrib-my-card">
                <div className="contrib-my-card-top">
                  <span className="contrib-type-badge">{TYPE_LABELS[c.type]}</span>
                  <span className={`contrib-status contrib-status--${c.status}`}>
                    {c.status}
                  </span>
                </div>
                <p className="contrib-my-title">{c.title}</p>

                {confirmDelete === c.id ? (
                  <div className="contrib-confirm">
                    <span>Delete this piece?</span>
                    <button
                      onClick={() => remove(c.id, () => {
                        setConfirmDelete(null)
                        window.location.reload()
                      })}
                      disabled={deleting === c.id}
                      className="contrib-confirm-yes"
                    >
                      {deleting === c.id ? 'Deleting...' : 'Yes, delete'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="contrib-confirm-no"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(c.id)}
                    className="contrib-delete-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}

          <div className="medium-types">
            {(Object.keys(TYPE_LABELS) as ContributionType[]).map((t) => (
              <button
                key={t}
                className={`medium-type-btn ${type === t ? "active" : ""}`}
                onClick={() => setType(t)}
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="medium-title"
          />

          <textarea
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="medium-content"
            rows={25}
          />

          {error && <div className="submit-error">{error}</div>}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={submitting || pendingCount >= 3}
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>

          <p className="submit-note">
            All submissions are reviewed before going live. No automated publishing.
          </p>
        </div>
      </div>
    </>
  );
}

export default function Submit() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="submit-page">
        <style>{SUBMIT_STYLES}</style>
        <div className="submit-loading">
          <div className="loading-bar" />
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="submit-page">
      <style>{SUBMIT_STYLES}</style>
      <SubmitForm userId={user.id} />
    </div>
  );
}
