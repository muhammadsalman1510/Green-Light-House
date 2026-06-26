import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Green Light House</title>
      </Head>

      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '48px 24px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            color: '#C9A84C',
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          404 — Page Not Found
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400,
            color: 'var(--clr-text-primary)',
            marginBottom: '16px',
          }}
        >
          This page does not exist
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--clr-text-secondary)',
            marginBottom: '36px',
            maxWidth: '420px',
            lineHeight: 1.7,
          }}
        >
          The page you are looking for may have been moved or deleted.
          Browse our categories to find what you need.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
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
            Back to Home
          </Link>
          <Link
            href="/category"
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
            Browse Categories
          </Link>
        </div>
      </div>
    </>
  );
}
