import Link from 'next/link';

export default function Breadcrumb({ items = [] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" style={{ padding: '12px 0' }}>
        <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0, gap: 0 }}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                {!isLast ? (
                  <>
                    <Link
                      href={item.href || '/'}
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '11px',
                        letterSpacing: '0.03em',
                        color: 'var(--clr-text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 200ms ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1A4731'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--clr-text-secondary)'}
                    >
                      {item.label}
                    </Link>
                    <span style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: '11px',
                      color: 'var(--clr-text-muted)',
                      margin: '0 6px',
                    }}>
                      /
                    </span>
                  </>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '11px',
                    letterSpacing: '0.03em',
                    color: 'var(--clr-text-primary)',
                    fontWeight: 500,
                  }}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
