import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://biswajitpanday.github.io';
const SITEMAP_OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_INDEX_OUTPUT_PATH = path.join(__dirname, '../public/sitemap-index.xml');

// Slugify function to convert project titles to URL-friendly slugs
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[@\/]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Define your site's pages
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/projects/', priority: '0.9', changefreq: 'weekly' },
  { url: '/skills/', priority: '0.8', changefreq: 'monthly' },
  { url: '/career/', priority: '0.8', changefreq: 'monthly' },
  { url: '/certifications/', priority: '0.7', changefreq: 'monthly' },
  { url: '/performance/', priority: '0.7', changefreq: 'monthly' },
  { url: '/activity/', priority: '0.7', changefreq: 'weekly' },
  { url: '/contact/', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  // Read project titles from portfolioData.ts and add to pages
  const projectsDataPath = path.join(__dirname, '../data/portfolioData.ts');
  const projectsData = fs.readFileSync(projectsDataPath, 'utf-8');
  const projectTitleMatches = projectsData.matchAll(/title:\s*["']([^"']+)["']/g);
  const projectTitles = Array.from(projectTitleMatches, m => m[1]);

  // Add project URLs to sitemap
  projectTitles.forEach(title => {
    const slug = slugify(title);
    pages.push({
      url: `/projects/${slug}/`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  console.log(`📁 Added ${projectTitles.length} project pages to sitemap`);

  // Read Medium blog posts and add to sitemap (if file exists)
  const mediumPostsPath = path.join(__dirname, '../public/data/medium-posts.json');
  if (fs.existsSync(mediumPostsPath)) {
    try {
      const mediumPosts = JSON.parse(fs.readFileSync(mediumPostsPath, 'utf-8'));
      // Note: Medium URLs are external, but we reference them for completeness
      // Search engines will understand these are external links
      mediumPosts.forEach(post => {
        pages.push({
          url: post.link,
          priority: '0.7',
          changefreq: 'monthly'
        });
      });
      console.log(`📝 Added ${mediumPosts.length} Medium blog posts to sitemap`);
    } catch (error) {
      console.warn('⚠️  Could not parse Medium posts JSON:', error.message);
    }
  } else {
    console.warn('⚠️  Medium posts file not found, skipping blog URLs in sitemap');
  }

  // Generate main sitemap.xml with proper XML formatting
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${page.url.startsWith('http') ? page.url : DOMAIN + page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate sitemap-index.xml with proper XML formatting
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  <sitemap>
    <loc>${DOMAIN}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Write both files
  fs.writeFileSync(SITEMAP_OUTPUT_PATH, sitemap);
  fs.writeFileSync(SITEMAP_INDEX_OUTPUT_PATH, sitemapIndex);

  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log('✅ Sitemap index generated successfully at public/sitemap-index.xml');
  console.log(`📊 Generated ${pages.length} URLs`);
  console.log(`🕒 Last modified: ${currentDate}`);
}

generateSitemap();
