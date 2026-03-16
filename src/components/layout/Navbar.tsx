import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthModal } from "../AuthModal";

const NAV_LINKS = [
  { label: "Browse", path: "/browse" },
  { label: "Blog", path: "/blog" },
  { label: "Threads", path: "/threads" },
  { label: "Community", path: "/community" },
  { label: "Submit", path: "/submit", requiresAuth: true },
];

function isActive(path: string, current: string): boolean {
  if (path === "/browse" || path === "/threads")
    return current.startsWith(path);
  return current === path;
}

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const current = `${location.pathname}${location.search}`;

  const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[0]) => {
    if (link.requiresAuth && !user) {
      e.preventDefault();
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-1 group">
            <span
              style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
              className="text-2xl text-red-700"
            >
              Vault of
            </span>
            <span
              style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}
              className="text-4xl text-red-700"
            >
              50
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                {link.requiresAuth ? (
                  <Link
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`font-mono text-[11px] uppercase tracking-[3px] transition-colors duration-200 ${
                      isActive(link.path, current)
                        ? "text-gray-800"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-mono text-[11px] uppercase tracking-[3px] transition-colors duration-200 ${
                      isActive(link.path, current)
                        ? "text-gray-800"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:block font-mono text-[11px] text-gray-500 border border-gray-200 bg-gray-50 px-3 py-1.5 tracking-widest">
            1950 - 2000
          </div>

          <button
            className="md:hidden text-gray-500 hover:text-gray-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-6 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-6 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              link.requiresAuth ? (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setMenuOpen(false);
                  }}
                  className="font-mono text-[11px] uppercase tracking-[3px] text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-[11px] uppercase tracking-[3px] text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
