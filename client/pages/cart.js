import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CustomerForm from '../components/cart/CustomerForm';
import OrderPopup from '../components/cart/OrderPopup';
import { orderLink } from '../lib/whatsapp';
import { ordersAPI } from '../lib/api';

const WA_SVG_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

function validateForm(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 3) {
    errors.name = 'Please enter your full name (at least 3 characters).';
  }
  if (!values.phone || values.phone.trim().length < 10) {
    errors.phone = 'Please enter a valid Pakistani phone number.';
  }
  if (!values.city || values.city.trim().length < 2) {
    errors.city = 'Please enter your city.';
  }
  return errors;
}

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, total, count } = useCart();

  const [formValues, setFormValues] = useState({ name: '', phone: '', city: '', notes: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [waLink, setWaLink] = useState('');

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePlaceOrder = () => {
    const errors = validateForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const link = orderLink({ customer: formValues, items, total });
    setWaLink(link);
    setShowPopup(true);
  };

  const handleConfirmOrder = async () => {
    window.open(waLink, '_blank', 'noopener,noreferrer');

    try {
      await ordersAPI.create({
        customer: formValues,
        items: items.map((item) => ({
          product:   item._id,
          name:      item.name,
          sku:       item.sku || '',
          price:     item.price,
          salePrice: item.salePrice || null,
          qty:       item.qty,
          image:     item.images?.[0] || '',
        })),
        total,
      });
    } catch (err) {
      console.error('[Cart] Order record failed:', err.message);
    }

    clearCart();
    setShowPopup(false);
    setOrderSent(true);
  };

  // ── EMPTY CART STATE ──
  if (items.length === 0 && !orderSent) {
    return (
      <>
        <SEO title="Cart" noindex={true} />
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '64px 24px',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24"
               fill="none" stroke="var(--clr-border)" strokeWidth="1.2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
          </svg>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 400,
              color: 'var(--clr-text-primary)',
              margin: '24px 0 8px',
            }}
          >
            Your cart is empty
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--clr-text-secondary)',
              marginBottom: '32px',
              maxWidth: '360px',
              lineHeight: 1.6,
            }}
          >
            Browse our lighting collection and add products you love.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/category"
              style={{
                background: '#1A4731',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '2px',
                fontFamily: 'var(--font-label)',
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Browse Categories
            </Link>
            <Link
              href="/"
              style={{
                border: '1px solid #1A4731',
                color: '#1A4731',
                padding: '12px 28px',
                borderRadius: '2px',
                fontFamily: 'var(--font-label)',
                fontSize: '11px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  // ── ORDER SUCCESS STATE ──
  if (orderSent) {
    return (
      <>
        <SEO title="Order Sent" noindex={true} />
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '64px 24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(26,71,49,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24"
                 fill="none" stroke="#1A4731" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '10px',
              color: '#C9A84C',
              letterSpacing: '0.30em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Order Sent
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 400,
              color: 'var(--clr-text-primary)',
              margin: '0 0 12px',
            }}
          >
            Thank you, {formValues.name.split(' ')[0]}!
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--clr-text-secondary)',
              marginBottom: '12px',
              maxWidth: '440px',
              lineHeight: 1.7,
            }}
          >
            Your order details have been sent to Green Light House via WhatsApp.
            Hassaan will be in touch shortly to confirm your order and arrange delivery.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--clr-text-muted)',
              marginBottom: '32px',
            }}
          >
            Didn&apos;t open?{' '}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1A4731', borderBottom: '1px solid #1A4731' }}
            >
              Click here to open WhatsApp
            </a>
          </p>

          <Link
            href="/"
            style={{
              background: '#1A4731',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '2px',
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  // ── MAIN CART STATE ──
  return (
    <>
      <SEO title={`Cart (${count})`} noindex={true} />

      <OrderPopup
        isOpen={showPopup}
        onConfirm={handleConfirmOrder}
        onCancel={() => setShowPopup(false)}
        waLink={waLink}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 80px' }}>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            marginBottom: '8px',
          }}
        >
          Your Cart
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--clr-text-secondary)',
            marginBottom: '32px',
          }}
        >
          {count} item{count !== 1 ? 's' : ''} in your cart
        </p>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12"
          style={{ alignItems: 'start' }}
        >

          {/* LEFT — Cart items */}
          <div>
            <div style={{ borderTop: '0.5px solid var(--clr-border)', marginBottom: '8px' }}>
              {items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--clr-text-muted)',
                padding: '4px 0',
                textDecoration: 'underline',
              }}
            >
              Clear cart
            </button>
          </div>

          {/* RIGHT — Summary + Form */}
          <div>

            {/* Order summary card */}
            <div
              style={{
                background: 'var(--clr-page-bg)',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '24px',
                border: '0.5px solid var(--clr-border)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: 'var(--clr-text-primary)',
                  marginBottom: '16px',
                }}
              >
                Order Summary
              </h2>

              {items.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                    gap: '12px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--clr-text-secondary)',
                      flex: 1,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {item.name}{' '}
                    <span style={{ color: 'var(--clr-text-muted)' }}>×{item.qty}</span>
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--clr-text-primary)',
                      whiteSpace: 'nowrap',
                      margin: 0,
                    }}
                  >
                    PKR {((item.salePrice || item.price) * item.qty).toLocaleString('en-PK')}
                  </p>
                </div>
              ))}

              <div style={{ height: '0.5px', background: 'var(--clr-border)', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--clr-text-primary)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Total
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1A4731',
                    margin: 0,
                  }}
                >
                  PKR {total.toLocaleString('en-PK')}
                </p>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--clr-text-muted)',
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                Delivery charges are not included. See delivery details at checkout.
              </p>
            </div>

            {/* Customer info form */}
            <div
              style={{
                background: 'var(--clr-surface)',
                borderRadius: '8px',
                padding: '24px',
                border: '0.5px solid var(--clr-border)',
                marginBottom: '16px',
              }}
            >
              <CustomerForm
                values={formValues}
                onChange={handleFormChange}
                errors={formErrors}
              />
            </div>

            {/* Place Order button */}
            <button
              onClick={handlePlaceOrder}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#1A4731',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '2px',
                border: 'none',
                fontFamily: 'var(--font-label)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#122F21')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1A4731')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d={WA_SVG_PATH} />
              </svg>
              Place Order via WhatsApp
            </button>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--clr-text-muted)',
                textAlign: 'center',
                marginTop: '10px',
                lineHeight: 1.5,
              }}
            >
              Clicking Place Order will show delivery details before opening WhatsApp.
              No payment is taken online.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
