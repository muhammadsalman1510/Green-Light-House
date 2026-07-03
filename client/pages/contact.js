import { useState } from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LightingStore',
  name: 'Green Light House',
  url: 'https://greenlighthouse.pk',
  telephone: '+923234641691',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop 7, 10-1-BII, Khokhar Chowk, College Road',
    addressLocality: 'Township, Lahore',
    addressCountry: 'PK',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '20:00',
  },
  sameAs: [
    'https://www.instagram.com/greenlight.lhr',
    'https://www.facebook.com/greeenlighthouse',
  ],
};

const STORE_DETAILS = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Shop 7, 10-1-BII, Khokhar Chowk\nCollege Road, Township, Lahore, Pakistan',
    link: null,
  },
  {
    icon: '📱',
    label: 'WhatsApp',
    value: '0323-4641691',
    link: 'https://wa.me/923234641691',
  },
  {
    icon: '🕐',
    label: 'Business Hours',
    value: 'Monday – Saturday\n10:00 AM – 8:00 PM',
    link: null,
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'greenlighthouse.pk',
    link: 'https://greenlighthouse.pk',
  },
];

const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    handle: '@greenlight.lhr',
    href: 'https://www.instagram.com/greenlight.lhr',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    platform: 'Facebook',
    handle: 'greeenlighthouse',
    href: 'https://www.facebook.com/greeenlighthouse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    handle: '@greeenlighthouse',
    href: 'https://www.tiktok.com/@greeenlighthouse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    handle: '@greeenlighthouse',
    href: 'https://www.youtube.com/@greeenlighthouse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: null },
  ];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Green Light House via WhatsApp 0323-4641691 or visit our store at Khokhar Chowk, Township, Lahore. Open Monday to Saturday 10am–8pm."
        canonical="/contact"
        jsonLd={localBusinessSchema}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <Breadcrumb items={breadcrumbs} />

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '20px 0 40px',
            lineHeight: 1.2,
          }}
        >
          Get in Touch
        </h1>

        {/* ── Two-column layout ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          style={{ alignItems: 'start' }}
        >
          {/* LEFT — Contact details */}
          <div>
            {/* WhatsApp block */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '9px',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  marginBottom: '10px',
                  fontWeight: 500,
                }}
              >
                Fastest Way to Reach Us
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: 'var(--clr-text-primary)',
                  marginBottom: '10px',
                }}
              >
                Chat on WhatsApp
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--clr-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '18px',
                }}
              >
                Send us a message and Hassaan will respond within minutes.
              </p>
              <a
                href="https://wa.me/923234641691"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  background: '#25D366',
                  color: 'white',
                  padding: '14px',
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
                {WA_ICON}
                Chat with Hassaan
              </a>
            </div>

            {/* Divider */}
            <div
              style={{ height: '0.5px', background: 'var(--clr-border)', margin: '28px 0' }}
            />

            {/* Store details grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '20px',
              }}
            >
              {STORE_DETAILS.map(({ icon, label, value, link }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: '9px',
                      color: '#C9A84C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.20em',
                      marginBottom: '6px',
                      fontWeight: 500,
                    }}
                  >
                    {icon} {label}
                  </p>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--clr-text-primary)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--clr-border)',
                        transition: 'color 200ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#1A4731')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-text-primary)')}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--clr-text-primary)',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-line',
                        margin: 0,
                      }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{ height: '0.5px', background: 'var(--clr-border)', margin: '28px 0' }}
            />

            {/* Social media */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '9px',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.20em',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SOCIAL_LINKS.map(({ platform, handle, href, icon }) => (
                  <SocialRow
                    key={platform}
                    platform={platform}
                    handle={handle}
                    href={href}
                    icon={icon}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Map */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '0.5px solid var(--clr-border)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.329!2d74.2755!3d31.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI4JzExLjAiTiA3NMKwMTYnMzEuOCJF!5e0!3m2!1sen!2spk!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                title="Green Light House location on Google Maps"
                allowFullScreen
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--clr-text-muted)',
                marginTop: '10px',
                lineHeight: 1.5,
              }}
            >
              Shop 7, 10-1-BII, Khokhar Chowk, College Road, Township, Lahore
            </p>
          </div>
        </div>

        {/* ── Delivery note ── */}
        <div
          style={{
            marginTop: '40px',
            background: 'rgba(201,168,76,0.08)',
            border: '0.5px solid rgba(201,168,76,0.25)',
            borderRadius: '6px',
            padding: '16px 20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--clr-text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            <strong style={{ color: 'var(--clr-text-primary)', fontWeight: 600 }}>Note:</strong>{' '}
            Green Light House does not provide delivery directly. Customers in Lahore may arrange
            their own rider or visit our store. Customers outside Lahore may use any courier of
            their choice.
          </p>
        </div>
      </div>
    </>
  );
}

function SocialRow({ platform, handle, href, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        color: hovered ? '#1A4731' : 'var(--clr-text-primary)',
        transition: 'color 200ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          color: hovered ? '#1A4731' : 'var(--clr-text-muted)',
          transition: 'color 200ms ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1 }}>
        {platform}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          color: 'var(--clr-text-muted)',
          letterSpacing: '0.02em',
        }}
      >
        {handle}
      </span>
    </a>
  );
}
