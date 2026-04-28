import { Metadata } from 'next';

const SITE_URL = 'https://vault-50.co';

export const metadata: Metadata = {
  title: 'Browse Horror Films 1950–2000 | VaultOf50',
  description:
    'Search and filter 8,000+ horror films by country, decade, genre and language.',
  openGraph: {
    title: 'Browse Horror Films 1950–2000 | VaultOf50',
    description:
      'Search and filter 8,000+ horror films by country, decade, genre and language.',
    url: `${SITE_URL}/browse`,
  },
};

export default function Browse() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="border-b border-gray-200 px-6 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-red-700 mb-3">
          The Archive
        </p>
        <h1 className="font-UnifrakturMaguntia text-5xl md:text-7xl text-gray-800 leading-none mb-4">
          Browse <span className="text-red-700">All Films</span>
        </h1>
        <div className="w-12 h-px bg-red-700 mt-6" />
      </div>

      <div className="border-b border-gray-200 bg-white px-6 py-4 flex flex-wrap gap-2">
        <button className="font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border border-red-700 bg-red-700 text-white">
          All Eras
        </button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SearchResultsPage',
            name: 'Browse Horror Films',
            description: 'Search and filter horror films from 1950-2000',
            url: `${SITE_URL}/browse`,
          }),
        }}
      />
    </div>
  );
}
