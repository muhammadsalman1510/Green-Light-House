import { categoriesAPI, productsAPI } from '../lib/api';
import CategorySection from '../components/homepage/CategorySection';
import ProductSection from '../components/homepage/ProductSection';
import ReviewsSection from '../components/homepage/ReviewsSection';
import WhatsAppCTASection from '../components/homepage/WhatsAppCTASection';
import SEO from '../components/SEO';

export default function Home({ categories, newArrivals, featured, sale }) {
  return (
    <>
      <SEO canonical="/" />

      <CategorySection categories={categories} />

      <ProductSection
        eyebrow="Just Landed"
        title="New Arrivals"
        products={newArrivals}
        viewAllHref="/category"
      />

      <ProductSection
        eyebrow="Hand Picked"
        title="Featured Products"
        products={featured}
        showRating={true}
        viewAllHref="/category"
      />

      {sale.length > 0 && (
        <ProductSection
          eyebrow="Limited Time"
          title="On Sale Now"
          products={sale}
          viewAllHref="/category"
        />
      )}

      <ReviewsSection reviews={[]} />

      <WhatsAppCTASection />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [categoriesData, newArrivalsData, featuredData, saleData] =
      await Promise.all([
        categoriesAPI.getTopLevel(),
        productsAPI.getAll({ newArrival: 'true', limit: 8 }),
        productsAPI.getAll({ featured: 'true', limit: 8 }),
        productsAPI.getAll({ sale: 'true', limit: 8 }),
      ]);

    return {
      props: {
        categories:  categoriesData || [],
        newArrivals: newArrivalsData?.products || [],
        featured:    featuredData?.products || [],
        sale:        saleData?.products || [],
      },
    };
  } catch (err) {
    console.error('[Homepage] API error:', err.message);
    return {
      props: {
        categories:  [],
        newArrivals: [],
        featured:    [],
        sale:        [],
      },
    };
  }
}
