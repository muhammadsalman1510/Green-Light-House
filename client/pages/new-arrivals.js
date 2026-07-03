import { useState } from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import ProductFilters from '../components/category/ProductFilters';
import { productsAPI } from '../lib/api';
import { filterAndSortProducts } from '../lib/categoryUtils';

export default function NewArrivalsPage({ initialProducts }) {
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = filterAndSortProducts(initialProducts, { sortBy, inStockOnly });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'New Arrivals', href: null },
  ];

  return (
    <>
      <SEO
        title="New Arrivals"
        description="Shop the latest lighting arrivals at Green Light House. New stock added regularly."
        canonical="/new-arrivals"
      />

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

export async function getServerSideProps() {
  try {
    const data = await productsAPI.getAll({ newArrival: 'true', limit: 50 });
    return { props: { initialProducts: data?.products || [] } };
  } catch (err) {
    return { props: { initialProducts: [] } };
  }
}
