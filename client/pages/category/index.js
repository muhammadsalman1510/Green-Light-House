import Head from 'next/head';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CategoryCard from '../../components/ui/CategoryCard';
import { categoriesAPI } from '../../lib/api';

export default function AllCategoriesPage({ categories }) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'All Categories', href: null },
  ];

  return (
    <>
      <Head>
        <title>All Categories | Green Light House</title>
        <meta
          name="description"
          content="Browse all lighting categories at Green Light House — Indoor, Outdoor, Chandeliers, Decorative, LED Panels and more."
        />
        <link rel="canonical" href="https://greenlighthouse.pk/category" />
      </Head>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 64px' }}>
        <Breadcrumb items={breadcrumbs} />

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '16px 0 8px',
          }}
        >
          All Categories
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--clr-text-secondary)',
            marginBottom: '32px',
          }}
        >
          {categories.length} categories available
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              size="subcategory"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const categories = await categoriesAPI.getTopLevel();
    return { props: { categories: categories || [] } };
  } catch (err) {
    console.error('[/category] API error:', err.message);
    return { props: { categories: [] } };
  }
}
