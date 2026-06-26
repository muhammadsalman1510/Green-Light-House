import Head from 'next/head';
import { mockCategories, mockProducts, mockReviews } from '../lib/mockData';
import CategorySection from '../components/homepage/CategorySection';
import ProductSection from '../components/homepage/ProductSection';
import ReviewsSection from '../components/homepage/ReviewsSection';
import WhatsAppCTASection from '../components/homepage/WhatsAppCTASection';

export default function Home() {
  const newArrivals = mockProducts.filter((p) => p.isNewArrival);
  const featured = mockProducts.filter((p) => p.isFeatured);
  const sale = mockProducts.filter((p) => p.salePrice);

  return (
    <>
      <Head>
        <title>Green Light House | Premium Lighting Store in Lahore, Pakistan</title>
        <meta
          name="description"
          content="Shop premium indoor and outdoor lighting at Green Light House, Lahore. Chandeliers, pendants, wall lights, LED panels and more. Order via WhatsApp: 0323-4641691."
        />
        <meta name="keywords" content="lights Lahore, ceiling lights Pakistan, chandeliers, pendant lights, LED lights, outdoor lights" />
        <meta property="og:title" content="Green Light House | Premium Lighting" />
        <meta property="og:description" content="Premium lighting for Pakistani homes and offices." />
        <meta property="og:url" content="https://greenlighthouse.pk" />
        <link rel="canonical" href="https://greenlighthouse.pk" />
      </Head>

      <CategorySection categories={mockCategories} />

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

      <ReviewsSection reviews={mockReviews} />

      <WhatsAppCTASection />
    </>
  );
}
