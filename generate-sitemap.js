import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'

const supabase = createClient(
  'https://vazaagmczfpeheachute.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhemFhZ21jemZwZWhlYWNodXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDc1MzEsImV4cCI6MjA4ODM4MzUzMX0.8PzXaTVWNMDLkcAldBkqGIzEqKMBKR3E8e0qDn2VMkQ'
)

const BASE_URL = 'https://vault-50.co'

async function generateSitemap() {
  // Fetch published blogs
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at')
    .eq('published', true)

  // Fetch published series and their parts
  const { data: series } = await supabase
    .from('series')
    .select('slug, series_parts(slug)')
    .eq('is_published', true)

  // Fetch all movies
  const { data: movies } = await supabase
    .from('movies')
    .select('id, updated_at')

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/browse', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/threads', priority: '0.9', changefreq: 'weekly' },
  ]

  const blogUrls = (blogs || []).map(b => ({
    url: `/blog/${b.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: b.updated_at?.split('T')[0]
  }))

  const threadUrls = (series || []).flatMap(s => [
    { url: `/threads/${s.slug}`, priority: '0.9', changefreq: 'monthly' },
    ...(s.series_parts || []).map(p => ({
      url: `/threads/${s.slug}/${p.slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    }))
  ])

  const movieUrls = (movies || []).map(m => ({
    url: `/movie/${m.id}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: m.updated_at?.split('T')[0]
  }))

  const allUrls = [...staticPages, ...blogUrls, ...threadUrls, ...movieUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${BASE_URL}${u.url}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync('./public/sitemap.xml', xml)
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs`)
}

generateSitemap()
