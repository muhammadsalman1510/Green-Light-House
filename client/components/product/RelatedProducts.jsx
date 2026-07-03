import ProductCard from '../ui/ProductCard';

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section
      style={{
        padding: '48px 0',
        borderTop: '0.5px solid var(--clr-border)',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <p
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '9px',
            color: '#C9A84C',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 500,
            margin: '0 0 8px',
          }}
        >
          You May Also Like
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: 0,
          }}
        >
          Related Products
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} showRating={true} />
        ))}
      </div>
    </section>
  );
}
