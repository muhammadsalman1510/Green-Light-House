import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';
import StarRating from './StarRating';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923234641691';

export default function ProductCard({ product, showRating = false }) {
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in ${product.name} (Ref: ${product.sku || product._id}). Please confirm availability and delivery details.`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const displayPrice = product.salePrice || product.price;
  const hasSale = !!product.salePrice;
  const isOutOfStock = product.stockStatus === 'outOfStock';

  return (
    <div className="product-card">
      {/* IMAGE AREA */}
      <div
        className="product-image"
        style={{ height: '200px', background: '#E8E4DC', position: 'relative' }}
      >
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4C0B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21h6m-6-3h6M12 3C8.686 3 6 5.686 6 9c0 2.21 1.148 4.148 2.876 5.264C9.497 14.685 9.75 15.3 9.75 16h4.5c0-.7.253-1.315.874-1.736C16.852 13.148 18 11.21 18 9c0-3.314-2.686-6-6-6z" />
            </svg>
          </div>
        )}

        {/* Badge — top left */}
        <div style={{ position: 'absolute', top: '6px', left: '6px', zIndex: 10 }}>
          {product.isNewArrival && !hasSale && <Badge type="new" />}
          {hasSale && <Badge type="sale" />}
        </div>

        {/* Wishlist — top right */}
        <button
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            zIndex: 10,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.90)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          onClick={(e) => e.preventDefault()}
          aria-label="Add to wishlist"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* INFO AREA */}
      <div style={{ padding: '10px 12px 12px' }}>
        {/* Category */}
        <p style={{
          fontFamily: 'var(--font-label)',
          fontSize: '8px',
          color: '#999999',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '3px',
          margin: '0 0 3px',
        }}>
          {product.category?.name || 'Lighting'}
        </p>

        {/* Product name */}
        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            color: 'var(--clr-text-primary)',
            margin: '0 0 4px',
            lineHeight: '1.35',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.name}
          </p>
        </Link>

        {/* Stars */}
        {showRating && product.reviewCount > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <StarRating rating={product.avgRating} count={product.reviewCount} size="sm" />
          </div>
        )}

        {/* Stock status text */}
        {product.stockStatus === 'limitedStock' && (
          <p style={{
            fontSize: '8px',
            color: '#B45309',
            fontFamily: 'var(--font-label)',
            margin: '0 0 4px',
            letterSpacing: '0.05em',
          }}>
            Limited Stock
          </p>
        )}
        {isOutOfStock && (
          <p style={{
            fontSize: '8px',
            color: '#6B6B6B',
            fontFamily: 'var(--font-label)',
            margin: '0 0 4px',
            letterSpacing: '0.05em',
          }}>
            Out of Stock
          </p>
        )}

        {/* Price row + WhatsApp button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#1A4731',
              fontFamily: 'var(--font-body)',
            }}>
              PKR {displayPrice.toLocaleString('en-PK')}
            </span>
            {hasSale && (
              <span style={{
                fontSize: '10px',
                color: '#BBBBBB',
                textDecoration: 'line-through',
                fontFamily: 'var(--font-body)',
              }}>
                {product.price.toLocaleString('en-PK')}
              </span>
            )}
          </div>

          {/* WhatsApp circle button */}
          <a
            href={isOutOfStock ? undefined : waLink}
            target={isOutOfStock ? undefined : '_blank'}
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (isOutOfStock) e.preventDefault();
            }}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: isOutOfStock ? '#6B6B6B' : '#1A4731',
              flexShrink: 0,
              transition: 'background 200ms ease, transform 200ms ease',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
            aria-label={`Order ${product.name} via WhatsApp`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
