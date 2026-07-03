import Link from 'next/link';
import Image from 'next/image';

export default function CategoryCard({ category, size = 'homepage', isPriority = false }) {
  const isHomepage = size === 'homepage';

  return (
    <Link href={`/category/${category.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      {/* Responsive height wrapper */}
      <div className={isHomepage ? 'h-[280px] md:h-[340px]' : 'h-[240px]'}>
        <div
          className="category-card"
          style={{
            height: '100%',
            background: category.bgColor || '#0E1A0B',
          }}
        >
          {/* Real photo */}
          {category.image && (
            <Image
              src={category.image}
              alt={`${category.name} — Green Light House`}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover object-center"
              style={{ transition: 'transform 500ms ease' }}
              priority={isPriority}
            />
          )}

          {/* No-image placeholder: faint camera icon */}
          {!category.image && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.10,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="cat-overlay" />

          {/* Gold border */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '10px',
              border: '0.5px solid rgba(201,168,76,0.15)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* Category tag — top left */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 20,
              background: 'rgba(201,168,76,0.10)',
              border: '0.5px solid rgba(201,168,76,0.25)',
              padding: '3px 10px',
              borderRadius: '2px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '7.5px',
              letterSpacing: '1px',
              color: '#C9A84C',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}>
              {category.name}
            </span>
          </div>

          {/* Center content */}
          <div className="cat-content" style={{ zIndex: 20 }}>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: '#C9A84C',
              fontWeight: 500,
              textTransform: 'uppercase',
              display: 'block',
            }}>
              Explore
            </span>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isHomepage ? '30px' : '22px',
              color: 'white',
              letterSpacing: '0.05em',
              margin: 0,
              fontWeight: 400,
              textAlign: 'center',
            }}>
              {category.name}
            </h3>

            {/* Gold decorative line */}
            <div style={{
              width: '40px',
              height: '0.8px',
              background: 'rgba(201,168,76,0.55)',
              margin: '4px 0',
            }} />

            {/* Discover Collection → */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-label)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.48)',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              <span>Discover Collection</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
