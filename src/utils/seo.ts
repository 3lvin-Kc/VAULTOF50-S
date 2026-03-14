export const SITE_NAME = 'VaultOf50'

export function pageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`
}

export const DEFAULT_TITLE = 'VaultOf50 — Horror Film Archive 1950–2000'
export const DEFAULT_DESCRIPTION =
  '8,000+ horror films from 1950 to 2000. Every country. Every decade. Built by fans who take horror seriously.'

export const STATIC_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  browse: {
    title: pageTitle('Browse Horror Films 1950–2000'),
    description: 'Search and filter 8,000+ horror films by country, decade, genre and language.',
  },
  blogs: {
    title: pageTitle('Horror Film Essays'),
    description: 'Long-form writing on horror cinema from Italy, Japan, Britain, Spain and beyond.',
  },
  threads: {
    title: pageTitle('Horror Film Threads'),
    description:
      'Deep dives into Frankenstein, Dracula, The Mummy, and the haunted house tradition across world cinema.',
  },
  community: {
    title: pageTitle('Community'),
    description: 'Essays, reviews and deep dives written by horror fans for horror fans.',
  },
  submit: {
    title: pageTitle('Submit Your Writing'),
    description: 'Share your horror film writing with the VaultOf50 community.',
  },
}
