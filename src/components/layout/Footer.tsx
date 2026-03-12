import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-screen-xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-mono text-xs uppercase tracking-[4px] text-gray-600">
            Vault of
          </span>
          <span className="font-UnifrakturMaguntia text-4xl font-black text-red-700 leading-none">
            50
          </span>
        </Link>

        <div className="flex gap-8">
          <Link
            to="/browse"
            className="font-mono text-[10px] uppercase tracking-[3px] text-gray-500 hover:text-gray-800 transition-colors"
          >
            Browse
          </Link>
          <Link
            to="/browse?filter=directors"
            className="font-mono text-[10px] uppercase tracking-[3px] text-gray-500 hover:text-gray-800 transition-colors"
          >
            Directors
          </Link>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[2px] text-gray-400 text-center">
          Data sourced from TMDB - Not affiliated with any studio
        </p>
      </div>
    </footer>
  );
}
