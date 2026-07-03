import CategoryCard from '../ui/CategoryCard';

export default function CategorySection({ categories }) {
  return (
    <section style={{ background: 'var(--clr-page-bg)', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{
            fontFamily: 'var(--font-label)',
            fontSize: '9px',
            color: '#C9A84C',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            fontWeight: 500,
          }}>
            Explore Our Range
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: 'var(--clr-text-primary)',
            fontWeight: 400,
            letterSpacing: '0.03em',
            margin: 0,
          }}>
            Browse by Category
          </h1>
        </div>

        {/* One card per row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category._id}
              category={category}
              size="homepage"
              isPriority={index === 0}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
