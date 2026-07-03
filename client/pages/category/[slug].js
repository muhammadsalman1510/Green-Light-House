import { useState } from 'react';
import Head from 'next/head';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CategoryCard from '../../components/ui/CategoryCard';
import ProductCard from '../../components/ui/ProductCard';
import ProductFilters from '../../components/category/ProductFilters';
import { categoriesAPI, productsAPI } from '../../lib/api';
import { filterAndSortProducts } from '../../lib/categoryUtils';

export default function CategoryPage({
  category,
  subcategories,
  products,
  isLeaf,
  breadcrumbs,
}) {
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = isLeaf
    ? filterAndSortProducts(products, { sortBy, inStockOnly })
    : [];

  return (
    <>
      <Head>
        <title>{`${category.name} | Green Light House`}</title>
        <meta
          name="description"
          content={
            category.description ||
            `Browse ${category.name} at Green Light House — premium lighting store in Lahore, Pakistan.`
          }
        />
        <link
          rel="canonical"
          href={`https://greenlighthouse.pk/category/${category.slug}`}
        />
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
            letterSpacing: '0.02em',
          }}
        >
          {category.name}
        </h1>

        {category.description && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--clr-text-secondary)',
              marginBottom: '32px',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
          >
            {category.description}
          </p>
        )}

        {/* ── CASE A: Has subcategories → 2-column card grid ── */}
        {!isLeaf && (
          <>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--clr-text-secondary)',
                marginBottom: '24px',
              }}
            >
              {subcategories.length} subcategories
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
              }}
            >
              {subcategories.map((sub) => (
                <CategoryCard
                  key={sub._id}
                  category={sub}
                  size="subcategory"
                />
              ))}
            </div>
          </>
        )}

        {/* ── CASE B: Leaf category → product grid + filters ── */}
        {isLeaf && (
          <>
            <ProductFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              productCount={filteredProducts.length}
            />

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    color: 'var(--clr-text-secondary)',
                  }}
                >
                  No products found
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--clr-text-muted)',
                    marginTop: '8px',
                  }}
                >
                  Try adjusting your filters or browse another category.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    showRating={true}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const category = await categoriesAPI.getBySlug(slug);
    if (!category) return { notFound: true };

    const subcategories = await categoriesAPI.getChildren(slug);
    const isLeaf = subcategories.length === 0;

    let products = [];
    if (isLeaf) {
      const data = await productsAPI.getAll({ category: slug, limit: 50 });
      products = data?.products || [];
    }

    const breadcrumbs = [{ label: 'Home', href: '/' }];

    if (category.parent) {
      breadcrumbs.push({
        label: category.parent.name,
        href: `/category/${category.parent.slug}`,
      });
    }

    breadcrumbs.push({ label: category.name, href: null });

    return {
      props: {
        category,
        subcategories,
        products,
        isLeaf,
        breadcrumbs,
      },
    };
  } catch (err) {
    console.error(`[/category/${slug}] API error:`, err.message);
    return { notFound: true };
  }
}
