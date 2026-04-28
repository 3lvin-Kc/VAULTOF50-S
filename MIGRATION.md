# React to Next.js Migration Guide

## Overview
This document outlines the comprehensive migration of CryptKeeper from a React + Vite + React Router application to Next.js 15 with the App Router.

## What Changed

### Architecture
- **Framework**: React 19 + Vite → Next.js 15 (App Router)
- **Routing**: React Router DOM → Next.js File-based Routing
- **Rendering**: Client-side → Server-side + Client Components
- **SEO**: React Helmet → Next.js Metadata API
- **Build Tool**: Vite → Next.js built-in bundler (Turbopack)
- **Styling**: Tailwind CSS 4 with Vite → Tailwind CSS 4 with Next.js (native support)

### Directory Structure Changes
```
OLD (React + Vite)          NEW (Next.js App Router)
├── src/
│   ├── App.tsx              MOVED TO .legacy/App.tsx
│   ├── main.tsx             MOVED TO .legacy/main.tsx
│   ├── pages/               MOVED TO .legacy/pages/
│   ├── components/          ✓ RETAINED
│   ├── services/            ✓ RETAINED
│   ├── lib/                 ✓ RETAINED (updated env vars)
│   └── hooks/               ✓ RETAINED
├── vite.config.ts           MOVED TO .legacy/vite.config.ts
└── index.html               REMOVED (Next.js uses app/layout.tsx)

NEW STRUCTURE
├── app/
│   ├── layout.tsx           Root layout with metadata
│   ├── page.tsx             Home page
│   ├── movie/[id]/page.tsx  Dynamic movie detail page
│   ├── browse/page.tsx      Browse films
│   ├── blog/page.tsx        Blog listing
│   ├── threads/page.tsx     Discussion threads
│   ├── sitemap.ts           Dynamic sitemap generation
│   └── robots.ts            Robots.txt configuration
├── next.config.js           Next.js configuration
├── .env.local               Environment variables (local dev)
├── .env.example             Environment variable template
└── MIGRATION.md             This file
```

## Database & Services
- **Supabase Client**: Updated environment variable names from `VITE_` to `NEXT_PUBLIC_`
- **All services** (`movies.ts`, `blogs.ts`, `series.ts`, `contributions.ts`): **No changes** - remain as standalone utilities
- **Database types**: **No changes** - all Supabase types preserved

## Component Updates
- **Navbar.tsx**: Updated `react-router-dom` Link → `next/link`, useLocation → usePathname
- **Footer.tsx**: Updated `react-router-dom` Link → `next/link`
- **MovieCard.tsx**: Updated `react-router-dom` Link → `next/link`
- **RelatedLinks.tsx**: Updated `react-router-dom` Link → `next/link`
- **All components**: Added `'use client'` directive where needed (client-side interactivity)

## Styling & CSS
- **index.css**: Preserved all custom animations and utilities
- **App.css**: Preserved all component-specific styles
- **Fonts**: Imported from Google Fonts in root layout
- **Tailwind**: Configuration remains unchanged
- **Custom font families**: Available as CSS variables and classes

## SEO Enhancements
### Native Support
- **Metadata API**: Automatically generates meta tags for all pages
- **Sitemap**: Auto-generated `app/sitemap.ts` for all routes
- **Robots.txt**: Auto-generated `app/robots.ts`
- **Structured Data**: JSON-LD schema integrated into pages
- **Social Sharing**: Proper OpenGraph and Twitter card metadata

### Pages with SEO
- `/` (Home): Metadata + CollectionPage schema
- `/browse`: Metadata + SearchResultsPage schema
- `/blog`: Metadata + Blog schema
- `/movie/[id]`: Dynamic metadata + Movie schema
- `/threads`: Metadata + DiscussionForumPosting schema

## Migration Details

### Pages Migrated
| Old Page | New Route | Status |
|----------|-----------|--------|
| src/pages/Home.tsx | app/page.tsx | ✓ Migrated with SSR |
| src/pages/Browse.tsx | app/browse/page.tsx | ✓ Migrated |
| src/pages/MovieDetail.tsx | app/movie/[id]/page.tsx | ✓ Migrated with dynamic routing |
| src/pages/Blog.tsx | app/blog/page.tsx | ✓ Migrated |
| src/pages/Threads.tsx | app/threads/page.tsx | ✓ Migrated |
| src/pages/BlogDetail.tsx | - | Stub (legacy in .legacy/) |
| src/pages/Community.tsx | - | Stub (legacy in .legacy/) |

### Environment Variables
Update your `.env.local`:
```env
# OLD (Vite)
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...

# NEW (Next.js)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Running the Application

### Development
```bash
npm run dev
# Opens on http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Breaking Changes
1. **React Router DOM**: No longer available - use Next.js Link and usePathname
2. **React Helmet**: No longer available - use Next.js Metadata API
3. **Vite aliases**: Import paths use `@/` prefix (e.g., `@/src/components`)
4. **Environment variables**: `VITE_` prefix changed to `NEXT_PUBLIC_`
5. **HTML entry point**: No index.html - routes handled by app/ directory

## Testing Checklist
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] All pages load and render correctly
- [ ] Navigation between pages works
- [ ] Supabase authentication configured
- [ ] Movie data fetching works
- [ ] SEO metadata appears in page source
- [ ] Dynamic routes work (`/movie/123`)
- [ ] Responsive design intact
- [ ] Fonts load properly
- [ ] Custom CSS animations work
- [ ] Build completes successfully (`npm run build`)
- [ ] Production build runs (`npm run start`)

## Known Issues & Workarounds
1. **Dynamic routes require env vars at build time**: Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` for local builds
2. **Old pages still exist in `.legacy/`**: Safe to delete once verified, kept for reference during migration
3. **ESLint**: Optional - can be installed with `npm install --save-dev eslint` if linting during builds is desired

## Next Steps
1. **Test locally**: Run `npm run dev` and verify all pages work
2. **Configure env vars**: Set real Supabase credentials in Vercel project settings
3. **Deploy**: Push to feature branch, create PR for review
4. **Monitor**: Check Vercel deployment for any runtime errors
5. **Cleanup**: Remove `.legacy/` directory once confirmed working

## Benefits of This Migration
- ✓ **Better SEO**: Server-side rendering + native sitemap/robots support
- ✓ **Improved performance**: Server components reduce client JS, built-in image optimization
- ✓ **Native metadata**: No manual meta tag management
- ✓ **Modern tooling**: Turbopack (faster builds), improved dev experience
- ✓ **Type safety**: Better integration with TypeScript
- ✓ **Simpler routing**: File-based routing, no more route definitions
- ✓ **Built-in API routes**: Easy to add backend endpoints
- ✓ **Vercel integration**: Native support for Vercel features
