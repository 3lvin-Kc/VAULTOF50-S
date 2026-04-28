import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import '@/src/index.css';
import '@/src/App.css';

const SITE_NAME = 'VaultOf50';
const SITE_URL = 'https://vault-50.co';
const SITE_DESCRIPTION =
  '8,000+ horror films from 1950 to 2000. Every country. Every decade. Built by fans who take horror seriously.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: 'VaultOf50 — Horror Film Archive 1950–2000',
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'VaultOf50 — Horror Film Archive 1950–2000',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VaultOf50 — Horror Film Archive 1950–2000',
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

function BetaBanner() {
  return (
    <div className="bg-black px-6 py-2 flex items-center justify-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[3px] text-white">
        ⚠ Beta
      </span>
      <p className="font-garamond italic text-sm text-white text-center">
        We watch. We write. We archive. Come in...
      </p>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        <Navbar />
        <BetaBanner />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
