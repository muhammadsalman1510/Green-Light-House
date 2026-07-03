import Image from 'next/image';

const LIGHTBULB_PATH = 'M9 2C6.24 2 4 4.24 4 7c0 1.86.98 3.48 2.44 4.41V13h5.12v-1.59C13.02 10.48 14 8.86 14 7c0-2.76-2.24-5-5-5zm1.5 10H7.5v1h3v-1zM9 0C4.03 0 0 4.03 0 9';

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const unitPrice = item.salePrice || item.price;
  const lineTotal = unitPrice * item.qty;
  const hasImage = item.images && item.images.length > 0;

  const handleMinus = () => {
    if (item.qty === 1) {
      onRemove(item._id);
    } else {
      onUpdateQty(item._id, item.qty - 1);
    }
  };

  const handlePlus = () => {
    onUpdateQty(item._id, item.qty + 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 0',
        borderBottom: '0.5px solid var(--clr-border)',
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '64px',
          height: '64px',
          flexShrink: 0,
          background: '#E8E4DC',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasImage ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="#C4C0B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3l6 6m0 0h6m-6 0l6 6m-6-6l-6 6"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        )}
      </div>

      {/* Middle info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {item.category?.name && (
          <p
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '9px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 2px',
            }}
          >
            {item.category.name}
          </p>
        )}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            color: 'var(--clr-text-primary)',
            margin: '0 0 4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--clr-text-secondary)',
            margin: 0,
          }}
        >
          PKR {unitPrice.toLocaleString('en-PK')} per unit
        </p>
      </div>

      {/* Right: stepper + total + remove */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {/* Qty stepper */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={handleMinus}
            aria-label="Decrease quantity"
            style={{
              width: '26px',
              height: '26px',
              border: '0.5px solid var(--clr-border)',
              background: 'var(--clr-surface)',
              color: 'var(--clr-text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--clr-page-bg)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--clr-surface)')}
          >
            −
          </button>
          <span
            style={{
              width: '32px',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--clr-text-primary)',
            }}
          >
            {item.qty}
          </span>
          <button
            onClick={handlePlus}
            aria-label="Increase quantity"
            style={{
              width: '26px',
              height: '26px',
              border: '0.5px solid var(--clr-border)',
              background: 'var(--clr-surface)',
              color: 'var(--clr-text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--clr-page-bg)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--clr-surface)')}
          >
            +
          </button>
        </div>

        {/* Line total */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#1A4731',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          PKR {lineTotal.toLocaleString('en-PK')}
        </p>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item._id)}
          aria-label={`Remove ${item.name} from cart`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D94040')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
