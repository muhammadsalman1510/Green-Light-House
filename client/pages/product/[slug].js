import { useState } from 'react';
import dynamic from 'next/dynamic';
import SEO from '../../components/SEO';
import { Toaster, toast } from 'react-hot-toast';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Badge from '../../components/ui/Badge';
import StarRating from '../../components/ui/StarRating';
import ProductSpecs from '../../components/product/ProductSpecs';
import RelatedProducts from '../../components/product/RelatedProducts';
import ProductReviews from '../../components/product/ProductReviews';
import { useCart } from '../../context/CartContext';
import { productsAPI } from '../../lib/api';

const ImageGallery = dynamic(
  () => import('../../components/product/ImageGallery'),
  { ssr: false }
);

const WA_SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

export default function ProductPage({ product, relatedProducts, breadcrumbs }) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (Ref: ${product.sku}). Please confirm availability and delivery details.`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const displayPrice = product.salePrice || product.price;
  const hasSale = !!product.salePrice;
  const isOutOfStock = product.stockStatus === 'outOfStock';
  const discountPct = hasSale
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product);
    setAddedToCart(true);
    toast.success('Added to cart', {
      style: {
        fontFamily: 'var(--font-label)',
        fontSize: '13px',
        background: '#1A4731',
        color: 'white',
      },
      iconTheme: { primary: '#C9A84C', secondary: 'white' },
      duration: 2000,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <SEO
        title={product.name}
        description={
          product.shortDesc ||
          `Buy ${product.name} at Green Light House, Lahore.${product.specs?.wattage ? ` ${product.specs.wattage}.` : ''} Premium quality. Order via WhatsApp: 0323-4641691.`
        }
        canonical={`/product/${product.slug}`}
        image={product.images?.[0] || undefined}
        type="product"
        jsonLd={{
          '@context':  'https://schema.org',
          '@type':     'Product',
          name:        product.name,
          description: product.description || product.shortDesc,
          sku:         product.sku,
          image:       product.images || [],
          brand: {
            '@type': 'Brand',
            name:    'Green Light House',
          },
          offers: {
            '@type':        'Offer',
            price:          displayPrice,
            priceCurrency:  'PKR',
            availability:   isOutOfStock
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'Green Light House' },
            url: `https://greenlighthouse.pk/product/${product.slug}`,
          },
          ...(product.reviewCount > 0 ? {
            aggregateRating: {
              '@type':      'AggregateRating',
              ratingValue:  product.avgRating,
              reviewCount:  product.reviewCount,
              bestRating:   5,
              worstRating:  1,
            },
          } : {}),
        }}
      />

      <Toaster position="top-right" />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 20px 64px' }}>

        <Breadcrumb items={breadcrumbs} />

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          style={{ marginTop: '24px' }}
        >
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {product.isNewArrival && !hasSale && <Badge type="new" />}
              {hasSale && <Badge type="sale" />}
              {product.isFeatured && <Badge type="featured" />}
              {product.stockStatus === 'limitedStock' && <Badge type="limited" />}
              {product.stockStatus === 'outOfStock' && <Badge type="outofstock" />}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 400,
                color: 'var(--clr-text-primary)',
                lineHeight: 1.25,
                marginBottom: '12px',
              }}
            >
              {product.name}
            </h1>

            {product.reviewCount > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <a href="#reviews" style={{ textDecoration: 'none' }}>
                  <StarRating rating={product.avgRating} count={product.reviewCount} size="md" />
                </a>
              </div>
            )}

            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#1A4731',
                }}
              >
                PKR {displayPrice.toLocaleString('en-PK')}
              </span>
              {hasSale && (
                <>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '18px',
                      color: '#BBBBBB',
                      textDecoration: 'line-through',
                    }}
                  >
                    PKR {product.price.toLocaleString('en-PK')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: '11px',
                      color: '#C9A84C',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </div>

            {product.shortDesc && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--clr-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                {product.shortDesc}
              </p>
            )}

            <div style={{ height: '0.5px', background: 'var(--clr-border)', marginBottom: '24px' }} />

            {product.stockStatus === 'limitedStock' && (
              <p
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  color: '#B45309',
                  marginBottom: '16px',
                  letterSpacing: '0.03em',
                }}
              >
                ⚡ Only a few pieces left in stock
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              <a
                href={isOutOfStock ? undefined : waLink}
                target={isOutOfStock ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: isOutOfStock ? '#CCCCCC' : '#1A4731',
                  color: 'white',
                  padding: '14px 24px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  opacity: isOutOfStock ? 0.6 : 1,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d={WA_SVG_PATH} />
                </svg>
                {isOutOfStock ? 'Out of Stock' : 'Order via WhatsApp'}
              </a>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: isOutOfStock ? '#CCCCCC' : '#1A4731',
                  border: `1px solid ${isOutOfStock ? '#CCCCCC' : '#1A4731'}`,
                  padding: '14px 24px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                </svg>
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  `Hi! I have a question about ${product.name} (Ref: ${product.sku}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--clr-text-secondary)',
                  textDecoration: 'none',
                  paddingTop: '4px',
                }}
              >
                Have a question?{' '}
                <span style={{ color: '#1A4731', borderBottom: '1px solid #1A4731' }}>
                  Ask on WhatsApp
                </span>
              </a>
            </div>

            {product.specs && (
              <div
                style={{
                  background: 'var(--clr-page-bg)',
                  borderRadius: '6px',
                  padding: '16px',
                  border: '0.5px solid var(--clr-border)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    ['Wattage', product.specs.wattage],
                    ['Fitting', product.specs.fitting],
                    ['Color Temp', product.specs.colorTemp],
                    ['Dimmable', product.specs.dimmable !== undefined ? (product.specs.dimmable ? 'Yes' : 'No') : null],
                  ]
                    .filter(([, v]) => v !== undefined && v !== null && v !== '')
                    .map(([label, value]) => (
                      <div key={label}>
                        <p style={{
                          fontFamily: 'var(--font-label)', fontSize: '9px',
                          color: 'var(--clr-text-muted)', textTransform: 'uppercase',
                          letterSpacing: '0.08em', margin: '0 0 2px',
                        }}>
                          {label}
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-body)', fontSize: '13px',
                          color: 'var(--clr-text-primary)', fontWeight: 500, margin: 0,
                        }}>
                          {value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {product.description && (
          <div style={{ padding: '48px 0', borderTop: '0.5px solid var(--clr-border)', marginTop: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: '22px',
              fontWeight: 400, color: 'var(--clr-text-primary)', marginBottom: '16px',
            }}>
              Product Description
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '15px',
              color: 'var(--clr-text-secondary)', lineHeight: 1.8, maxWidth: '720px',
            }}>
              {product.description}
            </p>
          </div>
        )}

        {product.specs && (
          <div style={{ paddingBottom: '48px', borderTop: '0.5px solid var(--clr-border)', paddingTop: '48px' }}>
            <ProductSpecs specs={product.specs} />
          </div>
        )}

        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}

        <div
          id="reviews"
          style={{ paddingTop: '48px', borderTop: '0.5px solid var(--clr-border)', scrollMarginTop: '80px' }}
        >
          <ProductReviews
            productId={product._id}
            avgRating={product.avgRating}
            reviewCount={product.reviewCount}
          />
        </div>

      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const product = await productsAPI.getBySlug(slug);
    if (!product) return { notFound: true };

    const relatedData = await productsAPI.getAll({
      category: product.category?.slug,
      limit: 5,
    });
    const relatedProducts = (relatedData?.products || [])
      .filter((p) => p._id !== product._id)
      .slice(0, 4);

    const breadcrumbs = [{ label: 'Home', href: '/' }];

    if (product.category) {
      breadcrumbs.push({
        label: product.category.name,
        href: `/category/${product.category.slug}`,
      });
    }

    breadcrumbs.push({ label: product.name, href: null });

    return {
      props: { product, relatedProducts, breadcrumbs },
    };
  } catch (err) {
    console.error(`[/product/${slug}] API error:`, err.message);
    return { notFound: true };
  }
}
