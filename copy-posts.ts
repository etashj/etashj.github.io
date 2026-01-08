import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, 'src/routes');
const srcDir = path.join(__dirname, 'src/lib/data/blog');
const destDir = path.join(__dirname, 'static/raw-blog');
const sitemapPath = path.join(__dirname, 'static/sitemap.xml');
const rssPath = path.join(__dirname, 'static/rss.xml');

const BASE_URL = 'https://etashj.github.io';
const SITE_TITLE = 'Etash Jhanji';
const SITE_DESCRIPTION = 'Personal website and blog of Etash Jhanji';

// Recursive function to find static routes based on folder structure
function findRoutes(currentPath: string, routePrefix: string): string[] {
  const routes: string[] = [];

  if (!fs.existsSync(currentPath)) return routes;

  const items = fs.readdirSync(currentPath, { withFileTypes: true });

  // Check for +page.svelte to confirm this directory is a route
  // (ignoring pure API routes or layout-only directories for sitemap)
  const isRoute = items.some(item =>
    item.isFile() && item.name === '+page.svelte'
  );

  if (isRoute) {
    // If routePrefix is empty, it's the root '/'
    routes.push(routePrefix || '/');
  }

  for (const item of items) {
    if (item.isDirectory()) {
      // Skip hidden directories, node_modules, or dynamic route parameters (e.g., [slug])
      // We handle specific dynamic content (like blog posts) separately
      if (item.name.startsWith('.') || item.name.startsWith('[')) {
        continue;
      }

      const nextPath = path.join(currentPath, item.name);

      // Handle route groups (folders like (group)) - they don't affect the URL
      const isRouteGroup = item.name.startsWith('(') && item.name.endsWith(')');
      const nextRoutePrefix = isRouteGroup
        ? routePrefix
        : `${routePrefix}/${item.name}`;

      routes.push(...findRoutes(nextPath, nextRoutePrefix));
    }
  }

  return routes;
}

// Helper to extract frontmatter from markdown
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatterBlock = match[1];
  const metadata: Record<string, string> = {};

  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      // Remove quotes and whitespace
      const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
      metadata[key.trim()] = value;
    }
  });

  return metadata;
}

console.log('Starting build pre-processing...');

try {
  // 1. Copy blog posts
  console.log(`Copying blog posts from ${srcDir} to ${destDir}...`);
  fs.cpSync(srcDir, destDir, { recursive: true, force: true });
  console.log('Successfully copied blog posts.');

  // 2. Generate sitemap and RSS
  console.log('Generating sitemap and RSS...');

  // Scan for static routes in src/routes
  const routes = findRoutes(routesDir, '');
  const blogPosts: { url: string; title: string; date: string; description: string }[] = [];

  // Get blog posts for dynamic routes
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);

    files
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadata = parseFrontmatter(content);
        const slug = path.basename(file, '.md');
        const url = `/blog/${slug}`;

        routes.push(url);

        if (metadata.title && metadata.date) {
          blogPosts.push({
            url: `${BASE_URL}${url}`,
            title: metadata.title,
            date: metadata.date,
            description: metadata.description || ''
          });
        }
      });
  }

  // Sort routes for sitemap consistency
  routes.sort();

  // Sort blog posts by date (newest first) for RSS
  blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // --- Generate Sitemap ---
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
    const url = `${BASE_URL}${route}`;
    return `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`Successfully generated sitemap at ${sitemapPath}`);

  // --- Generate RSS Feed ---
  const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${SITE_TITLE}</title>
  <link>${BASE_URL}</link>
  <description>${SITE_DESCRIPTION}</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <ttl>1800</ttl>
  ${blogPosts.map(post => `
  <item>
    <title>${post.title}</title>
    <link>${post.url}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <guid>${post.url}</guid>
  </item>`).join('')}
</channel>
</rss>`;

  fs.writeFileSync(rssPath, rssContent);
  console.log(`Successfully generated RSS feed at ${rssPath}`);

} catch (err) {
  console.error('Error during build tasks:', err);
  process.exit(1);
}
