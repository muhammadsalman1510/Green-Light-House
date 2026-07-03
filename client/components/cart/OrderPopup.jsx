import { useEffect } from 'react';

const WA_SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

export default function OrderPopup({ isOpen, onConfirm, onCancel }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.60)',
          zIndex: 9000,
        }}
      />

      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(520px, 90vw)',
          background: 'var(--clr-surface)',
          borderRadius: '10px',
          padding: '32px',
          zIndex: 9001,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Truck icon */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(26,71,49,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="#1A4731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1"/>
              <path d="M16 8h4l3 5v4h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            textAlign: 'center',
            marginTop: '16px',
            marginBottom: '0',
          }}
        >
          Before You Confirm
        </h2>

        {/* Divider */}
        <div
          style={{
            height: '0.5px',
            background: 'var(--clr-border)',
            margin: '20px 0',
          }}
        />

        {/* Policy block */}
        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '0.5px solid rgba(201,168,76,0.25)',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              textTransform: 'uppercase',
              color: '#C9A84C',
              letterSpacing: '0.10em',
              margin: '0 0 10px',
              fontWeight: 500,
            }}
          >
            📦 Delivery Information
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--clr-text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Green Light House does not provide delivery directly. Customers in
            Lahore are welcome to arrange their own rider or visit our store to
            collect their order.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: 'var(--clr-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: '10px',
              marginBottom: 0,
            }}
          >
            📍 Shop 7, 10-1-BII, Khokhar Chowk, College Road, Township, Lahore
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--clr-text-secondary)',
              lineHeight: 1.7,
              marginTop: '10px',
              marginBottom: 0,
            }}
          >
            Customers outside Lahore may choose any courier service of their
            preference. We will dispatch the order through that courier on your
            behalf.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid var(--clr-border)',
              color: 'var(--clr-text-secondary)',
              padding: '12px 24px',
              borderRadius: '2px',
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#1A4731',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '2px',
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#122F21')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#1A4731')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d={WA_SVG_PATH} />
            </svg>
            Confirm &amp; Send WhatsApp
          </button>
        </div>

        {/* Small note */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--clr-text-muted)',
            textAlign: 'center',
            marginTop: '14px',
            marginBottom: 0,
          }}
        >
          This will open WhatsApp with your order details pre-filled.
        </p>
      </div>
    </>
  );
}
