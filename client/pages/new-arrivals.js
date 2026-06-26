import { useState } from 'react';
import Head from 'next/head';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import ProductFilters from '../components/category/ProductFilters';
import { mockProducts } from '../lib/mockData';
import { filterAndSortProducts } from '../lib/categoryUtils';

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);

  const newProducts = mockProducts.filter((p) => p.isNewArrival);
  const filtered = filterAndSortProducts(newProducts, { sortBy, inStockOnly });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'New Arrivals', href: null },
  ];

  return (
    <>
      <Head>
        <title>New Arrivals | Green Light House</title>
        <meta
          name="description"
          content="Shop the latest lighting arrivals at Green Light House, Lahore. Fresh stock updated regularly."
        />
        <link rel="canonical" href="https://greenlighthouse.pk/new-arrivals" />
      </Head>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 64px' }}>
        <Breadcrumb items={breadcrumbs} />

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '16px 0 8px',
          }}
        >
          New Arrivals
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--clr-text-secondary)',
            marginBottom: '32px',
          }}
        >
          Our latest additions — fresh stock, updated regularly.
        </p>

        <ProductFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          productCount={filtered.length}
        />

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} showRating={true} />
          ))}
        </div>
      </div>
    </>
  );
}
