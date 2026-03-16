import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthMode = "login" | "signup" | "forgot";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const { signInWithEmail, signUpWithEmail, resetPasswordForEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEmailAuth = async (isSignUp: boolean) => {
    if (!email || !password) return setError("Enter email and password.");
    setLoading(true);
    setError("");
    const fn = isSignUp ? signUpWithEmail : signInWithEmail;
    const { error, data } = await fn(email, password);
    setLoading(false);
    if (error) return setError(error.message);
    
    if (isSignUp) {
      if (data?.session) {
        onClose();
        window.location.href = "/submit";
      } else {
        setEmailSent(true);
      }
    } else {
      onClose();
      window.location.href = "/submit";
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Enter your email address.");
    setLoading(true);
    setError("");
    const { error } = await resetPasswordForEmail(email);
    setLoading(false);
    if (error) return setError(error.message);
    setEmailSent(true);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setEmailSent(false);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal" ref={modalRef}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="auth-modal-eyebrow">The Vault</div>
        
        {emailSent ? (
          <div className="auth-modal-success">
            {mode === "signup" ? (
              <>
                <div className="auth-modal-success-icon">✦</div>
                <h3>Check your email</h3>
                <p>We've sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account, then come back and sign in.</p>
              </>
            ) : (
              <>
                <div className="auth-modal-success-icon">✦</div>
                <h3>Check your email</h3>
                <p>We've sent password reset instructions to <strong>{email}</strong>. Follow the link to reset your password.</p>
              </>
            )}
            <button className="auth-modal-back-btn" onClick={() => switchMode("login")}>
              ← Back to sign in
            </button>
          </div>
        ) : (
          <>
            <h2 className="auth-modal-title">
              {mode === "login" ? "Enter the Vault" : mode === "signup" ? "Join the Vault" : "Reset Password"}
            </h2>
            
            {mode !== "forgot" && (
              <>
                <button 
                  className="auth-modal-google" 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="auth-modal-divider">
                  <span>or</span>
                </div>
              </>
            )}

            <div className="auth-modal-form">
              <div className="auth-modal-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-modal-input"
                  autoComplete="email"
                />
              </div>

              {mode !== "forgot" && (
                <div className="auth-modal-field">
                  <div className="auth-modal-password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-modal-input"
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      className="auth-modal-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && <div className="auth-modal-error">{error}</div>}

              <button
                className="auth-modal-submit"
                onClick={() => {
                  if (mode === "login") handleEmailAuth(false);
                  else if (mode === "signup") handleEmailAuth(true);
                  else handleForgotPassword();
                }}
                disabled={loading}
              >
                {loading ? "..." : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
              </button>

              {mode === "login" && (
                <button 
                  className="auth-modal-forgot" 
                  onClick={() => switchMode("forgot")}
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="auth-modal-switch">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => switchMode("signup")}>Create one</button>
                </>
              ) : mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button onClick={() => switchMode("login")}>Sign in</button>
                </>
              ) : (
                <>
                  Remember your password?{" "}
                  <button onClick={() => switchMode("login")}>Sign in</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
