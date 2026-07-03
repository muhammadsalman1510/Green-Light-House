import { categoriesAPI, productsAPI } from '../lib/api';

const SITE_URL = 'https://greenlighthouse.pk';

function generateSiteMap(staticPages, categories, products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  ${staticPages.map((path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}

  ${categories.map((cat) => `
  <url>
    <loc>${SITE_URL}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

  ${products.map((product) => `
  <url>
    <loc>${SITE_URL}/product/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}

</urlset>`;
}

export async function getServerSideProps({ res }) {
  const staticPages = [
    '/',
    '/category',
    '/new-arrivals',
    '/about',
    '/faq',
    '/contact',
  ];

  let categories = [];
  let products = [];

  try {
    const [catData, prodData] = await Promise.all([
      categoriesAPI.getTopLevel(),
      productsAPI.getAll({ limit: 500 }),
    ]);
    categories = catData || [];
    products = prodData?.products || [];
  } catch {
    // sitemap still works with just static pages
  }

  const sitemap = generateSiteMap(staticPages, categories, products);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapPage() {
  return null;
}
