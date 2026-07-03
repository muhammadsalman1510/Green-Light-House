import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton';
import { productsAPI, categoriesAPI } from '../lib/api';
import { filterAndSortProducts } from '../lib/categoryUtils';

export default function SearchPage() {
  const router = useRouter();
  const query = router.query.q || '';

  const [inputValue, setInputValue] = useState(query);
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      setCategories([]);
      return;
    }

    const doSearch = async () => {
      setLoading(true);
      try {
        const [productData, catData] = await Promise.all([
          productsAPI.getAll({ q: query, limit: 24 }),
          categoriesAPI.getTopLevel(),
        ]);

        setProducts(productData?.products || []);

        const matchedCats = (catData || []).filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );
        setCategories(matchedCats);
      } catch (err) {
        console.error('[Search] API error:', err.message);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/search');
    }
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: null },
  ];

  const filteredProducts = filterAndSortProducts(products, { sortBy, inStockOnly });

  const tooShort = query.length > 0 && query.trim().length < 2;
  const noResults =
    !loading &&
    query.trim().length >= 2 &&
    products.length === 0 &&
    categories.length === 0;
  const hasResults =
    !loading &&
    query.trim().length >= 2 &&
    (products.length > 0 || categories.length > 0);

  return (
    <>
      <SEO title={query ? `"${query}" — Search Results` : 'Search'} noindex={true} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <Breadcrumb items={breadcrumbs} />

        {/* ── Big search bar ── */}
        <form
          onSubmit={handleSubmit}
          style={{ position: 'relative', maxWidth: '600px', margin: '24px auto 40px' }}
        >
          <button
            type="submit"
            aria-label="Search"
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for lights, chandeliers, pendants..."
            autoFocus={!query}
            style={{
              width: '100%',
              height: '52px',
              background: 'var(--clr-surface)',
              border: '1px solid var(--clr-border)',
              borderRadius: '4px',
              padding: '0 20px 0 48px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--clr-text-primary)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 200ms ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1A4731')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--clr-border)')}
          />
        </form>

        {/* ── No query ── */}
        {!query && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--clr-border)"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ marginBottom: '20px' }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--clr-text-secondary)',
              }}
            >
              Type a product name, category, or SKU to search.
            </p>
          </div>
        )}

        {/* ── Too short ── */}
        {tooShort && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--clr-text-secondary)',
              }}
            >
              Please enter at least 2 characters.
            </p>
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── No results ── */}
        {noResults && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 400,
                color: 'var(--clr-text-primary)',
                marginBottom: '12px',
              }}
            >
              No results for &ldquo;{query}&rdquo;
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--clr-text-secondary)',
                marginBottom: '28px',
              }}
            >
              Try a different spelling, or browse our categories.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/category"
                style={{
                  background: '#1A4731',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Browse Categories
              </Link>
              <a
                href="https://wa.me/923234641691?text=Hi!%20I%20need%20help%20finding%20a%20product."
                target="_blank"
                rel="noreferrer"
                style={{
                  border: '1px solid #1A4731',
                  color: '#1A4731',
                  padding: '12px 28px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ── Has results ── */}
        {hasResults && (
          <>
            {/* Category chips */}
            {categories.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '11px',
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    marginBottom: '12px',
                  }}
                >
                  Categories
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {categories.map((cat) => (
                    <CategoryChip key={cat._id} cat={cat} />
                  ))}
                </div>
              </div>
            )}

            {/* Product results */}
            {products.length > 0 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    borderBottom: '0.5px solid var(--clr-border)',
                    padding: '12px 0',
                    marginBottom: '24px',
                  }}
                >
                  <h1
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: 'var(--clr-text-primary)',
                      margin: 0,
                    }}
                  >
                    Products ({filteredProducts.length})
                  </h1>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-label)',
                        fontSize: '11px',
                        color: 'var(--clr-text-secondary)',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        style={{ accentColor: '#1A4731', width: '14px', height: '14px' }}
                      />
                      In stock only
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label
                        htmlFor="search-sort"
                        style={{
                          fontFamily: 'var(--font-label)',
                          fontSize: '11px',
                          color: 'var(--clr-text-secondary)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Sort by
                      </label>
                      <select
                        id="search-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                          fontFamily: 'var(--font-label)',
                          fontSize: '11px',
                          color: 'var(--clr-text-primary)',
                          background: 'var(--clr-surface)',
                          border: '0.5px solid var(--clr-border)',
                          borderRadius: '3px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && inStockOnly && (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--clr-text-secondary)',
                      }}
                    >
                      No in-stock products match your search. Try removing the in-stock filter.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

function CategoryChip({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/category/${cat.slug}`}
      style={{
        background: hovered ? '#1A4731' : 'rgba(26,71,49,0.08)',
        border: '0.5px solid rgba(26,71,49,0.20)',
        borderRadius: '20px',
        padding: '6px 14px',
        fontFamily: 'var(--font-label)',
        fontSize: '11px',
        color: hovered ? 'white' : '#1A4731',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textDecoration: 'none',
        transition: 'background 200ms ease, color 200ms ease',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cat.name}
    </Link>
  );
}
