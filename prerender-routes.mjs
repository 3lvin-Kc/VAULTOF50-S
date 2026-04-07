/**
 * Post-build prerender script for static routes.
 *
 * Reads the built dist/index.html and creates route-specific HTML files
 * with correct <title>, <meta>, and JSON-LD for each static route.
 * This lets crawlers that don't execute JS see meaningful content.
 *
 * Dynamic routes (e.g. /movie/:id) rely on react-helmet-async at runtime.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'

const DIST = './dist'
const BASE_URL = 'https://vault-50.co'
const SITE_NAME = 'VaultOf50'
const DEFAULT_DESC =
  '8,000+ horror films from 1950 to 2000. Every country. Every decade. Built by fans who take horror seriously.'

// ── Routes to prerender ─────────────────────────────────────
const routes = [
  {
    path: '/',
    title: 'VaultOf50 — Horror Film Archive 1950–2000',
    description: DEFAULT_DESC,
    ogType: 'website',
  },
  {
    path: '/browse',
    title: 'Browse Horror Films 1950–2000 | VaultOf50',
    description:
      'Search and filter 8,000+ horror films by country, decade, genre and language.',
    ogType: 'website',
  },
  {
    path: '/blog',
    title: 'Horror Film Essays | VaultOf50',
    description:
      'Long-form writing on horror cinema from Italy, Japan, Britain, Spain and beyond.',
    ogType: 'website',
  },
  {
    path: '/threads',
    title: 'Horror Film Threads | VaultOf50',
    description:
      'Deep dives into Frankenstein, Dracula, The Mummy, and the haunted house tradition across world cinema.',
    ogType: 'website',
  },
]

// ── Inject meta into HTML shell ─────────────────────────────
function injectMeta(html, route) {
  const url = `${BASE_URL}${route.path === '/' ? '' : route.path}`
  const ogImage = `${BASE_URL}/og-default.png`

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  )

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  )

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`
  )

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`
  )
  html = html.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${route.ogType}" />`
  )

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  )

  return html
}

// ── Main ────────────────────────────────────────────────────
function main() {
  const indexPath = join(DIST, 'index.html')
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found — run vite build first')
    process.exit(1)
  }

  const baseHtml = readFileSync(indexPath, 'utf-8')
  let count = 0

  for (const route of routes) {
    const html = injectMeta(baseHtml, route)

    if (route.path === '/') {
      // Overwrite the root index.html with injected meta
      writeFileSync(indexPath, html)
    } else {
      // Create /browse/index.html, /blog/index.html, etc.
      const dir = join(DIST, route.path)
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'index.html'), html)
    }
    count++
  }

  console.log(`✅ Prerendered ${count} static routes`)
}

main()
