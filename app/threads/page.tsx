import { Metadata } from 'next';

const SITE_URL = 'https://vault-50.co';

export const metadata: Metadata = {
  title: 'Horror Film Threads | VaultOf50',
  description:
    'Deep dives into Frankenstein, Dracula, The Mummy, and the haunted house tradition across world cinema.',
  openGraph: {
    title: 'Horror Film Threads | VaultOf50',
    description:
      'Deep dives into Frankenstein, Dracula, The Mummy, and the haunted house tradition across world cinema.',
    url: `${SITE_URL}/threads`,
  },
};

export default function Threads() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-6 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[4px] text-red-700 mb-3">
          Discussion
        </p>
        <h1 className="font-UnifrakturMaguntia text-5xl md:text-7xl text-gray-800 leading-none mb-4">
          Horror <span className="text-red-700">Threads</span>
        </h1>
        <div className="w-12 h-px bg-red-700 mt-6" />
      </div>

      <div className="px-6 py-12">
        <p className="font-garamond italic text-gray-500 text-center">
          Threads coming soon
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DiscussionForumPosting',
            name: 'Horror Film Threads',
            description:
              'Deep dives into classic horror film characters and traditions',
            url: `${SITE_URL}/threads`,
          }),
        }}
      />
    </div>
  );
}
