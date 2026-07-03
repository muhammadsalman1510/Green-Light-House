import { useState } from 'react';
import Head from 'next/head';
import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';

const faqs = [
  {
    id: 1,
    q: 'How do I place an order?',
    a: 'Browse our products and click "Order via WhatsApp" on any product page, or add items to your cart and place the order from the cart page. Your order details will be sent to us via WhatsApp and Hassaan will confirm your order shortly.',
  },
  {
    id: 2,
    q: 'Do you provide delivery across Pakistan?',
    a: 'Customers in Lahore are welcome to arrange their own rider to collect the order, or visit our store directly in Township. Customers outside Lahore may choose any courier service of their preference and we will dispatch the order through that courier on your behalf.',
  },
  {
    id: 3,
    q: 'Where is your store located?',
    a: 'We are located at Shop 7, 10-1-BII, Khokhar Chowk, College Road, Township, Lahore, Pakistan. You are welcome to visit us Monday through Saturday between 10:00 AM and 8:00 PM.',
  },
  {
    id: 4,
    q: 'What is the warranty on your products?',
    a: 'Most of our products come with a 1 to 2 year warranty depending on the product. The warranty period is listed in the product specifications on each product page. For warranty claims, contact us via WhatsApp with your order details.',
  },
  {
    id: 5,
    q: 'Can I return or exchange a product?',
    a: 'We accept returns and exchanges within 7 days of purchase, provided the product is unused, in its original packaging, and in the same condition as delivered. Contact us via WhatsApp to initiate a return or exchange.',
  },
  {
    id: 6,
    q: 'Are your products compatible with Pakistani electrical standards?',
    a: 'Yes. All products in our catalog are selected to be compatible with Pakistani voltage (220V, 50Hz) and use standard Pakistani fitting types such as E27, B22, and E14. Outdoor products carry appropriate IP ratings for local weather conditions.',
  },
  {
    id: 7,
    q: 'Do you offer bulk or commercial orders?',
    a: 'Yes, we regularly supply lighting for offices, restaurants, hotels, and housing projects. For bulk orders contact us on WhatsApp with your requirements and we will provide a special quote.',
  },
  {
    id: 8,
    q: 'Can I visit the store before placing an order?',
    a: 'Absolutely. You are welcome to visit our showroom in Township, Lahore. Our team will help you choose the right fixtures for your space. No appointment needed during business hours.',
  },
  {
    id: 9,
    q: 'What payment methods do you accept?',
    a: 'We currently accept cash on collection and bank transfer. Online card payments are not available at this time. Payment details will be shared by Hassaan when your order is confirmed via WhatsApp.',
  },
  {
    id: 10,
    q: 'Why is your website domain spelled GREEEN with three Es?',
    a: 'The domain greenlighthouse.pk (two Es, our correct store name) was unfortunately already registered. We secured greenlighthouse.pk as our official web address but our social media handles use greeenlighthouse (three Es) due to the same availability issue. Apologies for any confusion — we are the only Green Light House in Township, Lahore.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '0.5px solid var(--clr-border)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: '18px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '16px',
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            lineHeight: 1.5,
          }}
        >
          {faq.q}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 250ms ease',
          }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 300ms ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--clr-text-secondary)',
            lineHeight: 1.8,
            padding: '0 0 20px 0',
            maxWidth: '680px',
            margin: 0,
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState(null);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: null },
  ];

  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Green Light House — ordering, delivery, warranty, and returns."
        canonical="/faq"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <Breadcrumb items={breadcrumbs} />

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '20px 0 12px',
            lineHeight: 1.2,
          }}
        >
          Frequently Asked Questions
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--clr-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}
        >
          Everything you need to know about ordering from Green Light House.
        </p>

        <div style={{ height: '0.5px', background: 'var(--clr-border)', marginBottom: '0' }} />

        {/* Accordion */}
        <div>
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '32px',
            background: 'var(--clr-page-bg)',
            border: '0.5px solid var(--clr-border)',
            borderRadius: '8px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: '#C9A84C',
              textTransform: 'uppercase',
              letterSpacing: '0.20em',
              marginBottom: '8px',
            }}
          >
            Still have a question?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--clr-text-primary)',
              marginBottom: '16px',
            }}
          >
            We&apos;re happy to help
          </h2>
          <a
            href="https://wa.me/923234641691?text=Hi%20Hassaan!%20I%20have%20a%20question."
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#25D366',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '4px',
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1DA851')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#25D366')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
