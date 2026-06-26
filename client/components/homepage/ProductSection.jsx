import Link from 'next/link';
import ProductCard from '../ui/ProductCard';

export default function ProductSection({
  eyebrow,
  title,
  products,
  showRating = false,
  viewAllHref = '/category',
}) {
  if (!products || products.length === 0) return null;

  return (
    <section style={{ background: 'var(--clr-surface)', padding: '48px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-label)',
              fontSize: '9px',
              color: '#C9A84C',
              letterSpacing: '0.30em',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontWeight: 500,
              margin: '0 0 4px',
            }}>
              {eyebrow}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              color: 'var(--clr-text-primary)',
              fontWeight: 400,
              margin: 0,
            }}>
              {title}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: '#1A4731',
              letterSpacing: '0.03em',
              borderBottom: '1px solid #1A4731',
              paddingBottom: '2px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              marginLeft: '16px',
            }}
          >
            View All →
          </Link>
        </div>

        {/* Mobile: horizontal scroll (hidden on md+) */}
        <div
          className="md:hidden"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '8px',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                minWidth: 'calc(50vw - 28px)',
                maxWidth: '200px',
                scrollSnapAlign: 'start',
                flexShrink: 0,
              }}
            >
              <ProductCard product={product} showRating={showRating} />
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid (hidden on mobile) */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showRating={showRating}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
