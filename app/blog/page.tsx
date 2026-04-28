import { Metadata } from 'next';

const SITE_URL = 'https://vault-50.co';

export const metadata: Metadata = {
  title: 'Horror Film Essays | VaultOf50',
  description:
    'Long-form writing on horror cinema from Italy, Japan, Britain, Spain and beyond.',
  openGraph: {
    title: 'Horror Film Essays | VaultOf50',
    description:
      'Long-form writing on horror cinema from Italy, Japan, Britain, Spain and beyond.',
    url: `${SITE_URL}/blog`,
  },
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-6 py-12">
        <h1 className="font-UnifrakturMaguntia text-5xl md:text-6xl text-gray-800 leading-none mb-4">
          The <span className="text-red-700">Vault</span> Journal
        </h1>
      </div>

      <div className="border-b border-gray-200 bg-white px-6 py-4 flex flex-wrap gap-2">
        <button className="font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border border-red-700 bg-red-700 text-white">
          Genre Deep Dives
        </button>
        <button className="font-mono text-[10px] uppercase tracking-[3px] px-4 py-2 border border-gray-200 text-gray-500 hover:border-red-700">
          Country Profiles
        </button>
      </div>

      <div className="px-6 py-12">
        <p className="font-garamond italic text-gray-500 text-center">
          Blog posts coming soon
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'VaultOf50 Journal',
            description: 'Horror film essays and analysis',
            url: `${SITE_URL}/blog`,
          }),
        }}
      />
    </div>
  );
}
