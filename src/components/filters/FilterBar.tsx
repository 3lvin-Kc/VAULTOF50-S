import type { MovieFilters } from "../../services/movies";

interface FilterBarProps {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
}

const LANGUAGES = [
  { code: "", label: "All Languages" },
  { code: "en", label: "English" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "fr", label: "French" },
];

const SORT_OPTIONS = [
  { value: "tmdb_rating", label: "Top Rated" },
  { value: "release_year", label: "Year" },
  { value: "tmdb_vote_count", label: "Most Voted" },
  { value: "title", label: "Title A-Z" },
];

const selectClass =
  "bg-white border border-gray-300 text-gray-700 font-mono text-[10px] uppercase tracking-[2px] px-3 py-2 outline-none hover:border-red-700 focus:border-red-700 transition-colors cursor-pointer";

export default function FilterBar({
  filters,
  onFiltersChange,
}: FilterBarProps) {
  const update = (patch: Partial<MovieFilters>) =>
    onFiltersChange({ ...filters, ...patch, page: 1 });

  return (
    <div className="border-y border-gray-200 bg-white px-6 py-4 flex flex-col gap-4">
      <div className="relative max-w-lg">
        <input
          type="text"
          placeholder="Search by title, director..."
          value={filters.search ?? ""}
          onChange={(e) => update({ search: e.target.value })}
          className="w-full bg-white border border-gray-300 text-gray-800 font-garamond italic text-base placeholder:text-gray-400 px-4 py-2.5 outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          min={1950}
          max={2000}
          value={filters.yearFrom ?? 1950}
          onChange={(e) => update({ yearFrom: Number(e.target.value) })}
          className={`${selectClass} w-24`}
        />
        <span className="font-mono text-[10px] text-gray-400">to</span>
        <input
          type="number"
          min={1950}
          max={2000}
          value={filters.yearTo ?? 2000}
          onChange={(e) => update({ yearTo: Number(e.target.value) })}
          className={`${selectClass} w-24`}
        />

        <select
          value={filters.language ?? ""}
          onChange={(e) => update({ language: e.target.value || undefined })}
          className={selectClass}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy ?? "tmdb_rating"}
          onChange={(e) =>
            update({ sortBy: e.target.value as MovieFilters["sortBy"] })
          }
          className={selectClass}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sortOrder ?? "desc"}
          onChange={(e) =>
            update({ sortOrder: e.target.value as "asc" | "desc" })
          }
          className={selectClass}
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>
  );
}
