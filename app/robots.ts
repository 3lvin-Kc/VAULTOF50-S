import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/.well-known/'],
    },
    sitemap: 'https://vault-50.co/sitemap.xml',
  };
}
