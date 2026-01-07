
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, 'src/routes');
const srcDir = path.join(__dirname, 'src/lib/data/blog');
const destDir = path.join(__dirname, 'static/raw-blog');
const sitemapPath = path.join(__dirname, 'static/sitemap.xml');

const BASE_URL = 'https://etashj.github.io';

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

console.log('Starting build pre-processing...');

try {
  // 1. Copy blog posts
  console.log(`Copying blog posts from ${srcDir} to ${destDir}...`);
  fs.cpSync(srcDir, destDir, { recursive: true, force: true });
  console.log('Successfully copied blog posts.');

  // 2. Generate sitemap
  console.log('Generating sitemap...');

  // Scan for static routes in src/routes
  const routes = findRoutes(routesDir, '');

  // Get blog posts for dynamic routes
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    const blogRoutes = files
      .filter(file => file.endsWith('.md'))
      .map(file => `/blog/${path.basename(file, '.md')}`);

    routes.push(...blogRoutes);
  }

  // Sort for consistent output
  routes.sort();

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

} catch (err) {
  console.error('Error during build tasks:', err);
  process.exit(1);
}
