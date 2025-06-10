import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [],
      }
    ],
    sitemap: [
      'https://biswajitpanday.github.io/sitemap.xml',
      'https://biswajitpanday.github.io/sitemap-index.xml'
    ],
    host: 'https://biswajitpanday.github.io',
  }
} 