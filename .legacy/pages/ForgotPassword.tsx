import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const FORGOT_STYLES = `
  .forgot-page {
    min-height: 100vh;
    background: white;
    color: #1f2328;
    font-family: 'EB Garamond', Georgia, serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .forgot-inner {
    max-width: 480px;
    width: 100%;
  }

  .forgot-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #b43c2f;
    margin-bottom: 1.25rem;
  }

  .forgot-title {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 400;
    color: #1f2328;
    margin: 0 0 1rem;
  }

  .forgot-desc {
    font-size: 1.05rem;
    line-height: 1.75;
    color: #000000;
    margin: 0 0 2rem;
  }

  .forgot-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .forgot-input {
    background: #f9fafb;
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

  .forgot-input:focus { border-color: #b43c2f; }

  .forgot-error {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: #b43c2f;
    padding: 0.5rem 0;
  }

  .forgot-btn {
    background: #b43c2f;
    color: #1f2328;
    border: none;
    padding: 0.9rem 1.5rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }

  .forgot-btn:hover:not(:disabled) { background: #a33326; }
  .forgot-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .forgot-back {
    background: none;
    border: none;
    color: #000000;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    cursor: pointer;
    padding: 0.5rem 0;
    text-align: left;
    transition: color 0.2s;
    text-decoration: none;
  }

  .forgot-back:hover { color: #b43c2f; }

  .forgot-success {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: #059669;
    border: 1px solid #059669;
    padding: 1.25rem;
    background: #f0fdf4;
    line-height: 1.7;
  }
`;

export default function ForgotPassword() {
  const { resetPasswordForEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) return setError("Enter your email address.");
    setLoading(true);
    setError("");
    
    const { error } = await resetPasswordForEmail(email);
    setLoading(false);
    
    if (error) return setError(error.message);
    setSent(true);
  };

  return (
    <div className="forgot-page">
      <style>{FORGOT_STYLES}</style>
      <div className="forgot-inner">
        <div className="forgot-eyebrow">Account Recovery</div>
        
        {sent ? (
          <>
            <h2 className="forgot-title">Check your email</h2>
            <p className="forgot-success">
              We've sent password reset instructions to <strong>{email}</strong>.
              Follow the link in the email to reset your password.
            </p>
            <Link to="/submit" className="forgot-back">
              ← Back to sign in
            </Link>
          </>
        ) : (
          <>
            <h2 className="forgot-title">Reset your password</h2>
            <p className="forgot-desc">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
            
            <div className="forgot-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="forgot-input"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {error && <div className="forgot-error">{error}</div>}
              <button
                className="forgot-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Instructions"}
              </button>
              <Link to="/submit" className="forgot-back">
                ← Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
