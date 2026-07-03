import { categoriesAPI, productsAPI } from '../lib/api';

const SITE_URL = 'https://greenlighthouse.pk';

function generateSiteMap(staticPages, categories, products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
  ${(categories || []).map((cat) => `
  <url>
    <loc>${SITE_URL}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${(products || []).map((p) => `
  <url>
    <loc>${SITE_URL}/product/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const staticPages = [
    { path: '/',             priority: '1.0', changefreq: 'daily'   },
    { path: '/category',     priority: '0.9', changefreq: 'weekly'  },
    { path: '/new-arrivals', priority: '0.8', changefreq: 'weekly'  },
    { path: '/about',        priority: '0.6', changefreq: 'monthly' },
    { path: '/faq',          priority: '0.6', changefreq: 'monthly' },
    { path: '/contact',      priority: '0.6', changefreq: 'monthly' },
  ];

  let categories = [];
  let products   = [];

  try {
    const [cats, prods] = await Promise.all([
      categoriesAPI.getTopLevel(),
      productsAPI.getAll({ limit: 1000 }),
    ]);
    categories = cats || [];
    products   = prods?.products || [];
  } catch {
    // sitemap still works with just static pages
  }

  const sitemap = generateSiteMap(staticPages, categories, products);
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SitemapPage() { return null; }
