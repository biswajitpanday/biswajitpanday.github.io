import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://biswajitpanday.github.io';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Define your site's pages
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/projects/', priority: '0.9', changefreq: 'weekly' },
  { url: '/skills/', priority: '0.8', changefreq: 'monthly' },
  { url: '/career/', priority: '0.8', changefreq: 'monthly' },
  { url: '/certifications/', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log(`📊 Generated ${pages.length} URLs`);
}

generateSitemap(); 