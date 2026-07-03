import Link from 'next/link';
import SEO from '../components/SEO';
import Breadcrumb from '../components/ui/Breadcrumb';

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: null },
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Green Light House is Lahore's premium lighting store in Township. Premium indoor and outdoor lighting since 2019."
        canonical="/about"
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px 80px' }}>
        <Breadcrumb items={breadcrumbs} />

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            margin: '20px 0 32px',
            lineHeight: 1.2,
          }}
        >
          Illuminating Beautiful Spaces Since 2019
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--clr-text-secondary)',
            lineHeight: 1.9,
          }}
        >
          <p style={{ marginBottom: '20px' }}>
            Green Light House is a premium lighting retailer based in Township, Lahore.
            We offer a carefully curated range of indoor and outdoor lighting for homes,
            offices, restaurants, and commercial spaces across Pakistan.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Every product in our catalog is hand-selected for build quality, finish, and
            durability. We stock international brands and premium fixtures that meet
            Pakistani electrical standards, ensuring safe and beautiful installations.
          </p>
          <p style={{ marginBottom: '40px' }}>
            Whether you are furnishing a new home, upgrading your office lighting, or
            looking for a statement chandelier, our team is ready to help you find the
            perfect fixture for your space.{' '}
            <Link href="/category" style={{ color: '#1A4731', borderBottom: '1px solid #1A4731', textDecoration: 'none' }}>
              Browse our lighting collection
            </Link>{' '}
            to explore what we carry.
          </p>
        </div>

        {/* Store info card */}
        <div
          style={{
            background: 'var(--clr-page-bg)',
            border: '0.5px solid var(--clr-border)',
            borderRadius: '8px',
            padding: '28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            { label: 'Location', value: 'Shop 7, 10-1-BII, Khokhar Chowk\nCollege Road, Township, Lahore' },
            { label: 'WhatsApp', value: '0323-4641691\n(Hassaan)' },
            { label: 'Hours', value: 'Monday – Saturday\n10:00 AM – 8:00 PM' },
            { label: 'Find us online', value: 'greenlighthouse.pk\n@greeenlighthouse' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '9px',
                  color: '#C9A84C',
                  letterSpacing: '0.20em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                {label}
              </p>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
