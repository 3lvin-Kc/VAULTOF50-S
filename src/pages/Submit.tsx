import { Link } from "react-router-dom";

const SUBMIT_STYLES = `
  .submit-page {
    min-height: 100vh;
    background: white;
    font-family: 'EB Garamond', Georgia, serif;
  }

  .submit-gate {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: #0d0d0d;
  }

  .submit-gate-inner {
    max-width: 480px;
    width: 100%;
    text-align: center;
    border: 1px solid #2a1a1a;
    padding: 3rem 2rem;
    background: #0d0d0d;
  }

  .submit-gate-icon {
    font-size: 2.5rem;
    color: #b43c2f;
    margin-bottom: 1.5rem;
  }

  .submit-gate-title {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 400;
    color: #f5f0e8;
    margin: 0 0 1rem;
  }

  .submit-gate-text {
    font-size: 1rem;
    line-height: 1.8;
    color: #888;
    margin: 0 0 2rem;
  }

  .submit-gate-contact {
    background: #1a1a1a;
    border: 1px solid #2a1a1a;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .submit-gate-contact-title {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #b43c2f;
    margin-bottom: 1rem;
  }

  .submit-gate-contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: #f5f0e8;
    margin-bottom: 0.5rem;
  }

  .submit-gate-contact-item:last-child {
    margin-bottom: 0;
  }

  .submit-gate-contact-label {
    color: #555;
  }

  .submit-gate-note {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: #555;
    letter-spacing: 0.05em;
  }

  .submit-gate-link {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #b43c2f;
    text-decoration: none;
    letter-spacing: 0.1em;
    transition: color 0.2s;
  }

  .submit-gate-link:hover {
    color: #f5f0e8;
  }
`;

export default function Submit() {
  return (
    <div className="submit-page">
      <style>{SUBMIT_STYLES}</style>
      <div className="submit-gate">
        <div className="submit-gate-inner">
          <div className="submit-gate-icon">✦</div>
          <h2 className="submit-gate-title">Access Restricted</h2>
          <p className="submit-gate-text">
            This page is for authorized contributors only. 
            To submit your work, you'll need an invitation from the admin.
          </p>
          
          <div className="submit-gate-contact">
            <div className="submit-gate-contact-title">Request an Invitation</div>
            <div className="submit-gate-contact-item">
              <span className="submit-gate-contact-label">Email:</span>
              <span>razdevra64@gmail.com</span>
            </div>
            <div className="submit-gate-contact-item">
              <span className="submit-gate-contact-label">Discord:</span>
              <span>raz3597</span>
            </div>
            <div className="submit-gate-contact-item">
              <span className="submit-gate-contact-label">Reddit:</span>
              <span>u/Fine_Factor_456</span>
            </div>
          </div>

          <p className="submit-gate-note">
            Send me a message with a brief intro about yourself and what you'd like to submit.
            I'll send you an invitation link.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <Link to="/community" className="submit-gate-link">
              ← Browse the vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
