import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';
import { useDarkMode } from '../../context/DarkModeContext';

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

function CartBadge({ count, size }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <Link href="/cart" style={{ color: 'rgba(255,255,255,0.60)', display: 'flex', alignItems: 'center' }}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </Link>
      {count > 0 && (
        <div style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          width: '14px',
          height: '14px',
          background: '#C9A84C',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontFamily: 'var(--font-label)',
          fontWeight: 700,
          color: '#000',
          lineHeight: 1,
        }}>
          {count}
        </div>
      )}
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Shop', href: '/category' },
  { label: 'Categories', href: '/category' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'About', href: '/about' },
];

const DRAWER_LINKS = [
  { label: 'Shop', href: '/category' },
  { label: 'Categories', href: '/category' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const router = useRouter();
  const { count } = useCart();
  const { isDark, toggle } = useDarkMode();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHome = router.pathname === '/';
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerNav = (href) => {
    setDrawerOpen(false);
    router.push(href);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push('/search?q=' + encodeURIComponent(q));
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isTransparent ? 'transparent' : '#1A4731',
        boxShadow: isTransparent ? 'none' : '0 1px 12px rgba(0,0,0,0.18)',
        transition: 'background-color 400ms ease, box-shadow 400ms ease',
      }}>

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex" style={{
          height: '64px',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', letterSpacing: '0.28em', fontWeight: 400, lineHeight: 1 }}>
                GLH
              </span>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: '7px', color: 'rgba(255,255,255,0.40)', letterSpacing: '0.20em', textTransform: 'uppercase', lineHeight: 1 }}>
                Green Light House
              </span>
            </div>
          </Link>

          {/* Center links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'center' }}>
            {NAV_LINKS.map(link => (
              <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>

            {/* Search bar */}
            <div
              onClick={() => router.push('/search')}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '0.5px solid rgba(255,255,255,0.14)',
                borderRadius: '3px',
                padding: '6px 12px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>
                Search products...
              </span>
            </div>

            {/* Wishlist */}
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.60)', display: 'flex', transition: 'color 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.60)'}
              aria-label="Wishlist"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Cart */}
            <CartBadge count={count} size={17} />

            {/* WhatsApp */}
            <a
              href="https://wa.me/923234641691"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#25D366', display: 'flex', transition: 'opacity 200ms ease' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.80'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div style={{ width: '17px', height: '17px' }}>{WA_ICON}</div>
            </a>

            {/* Dark mode */}
            <button
              onClick={toggle}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.10)',
                border: '0.5px solid rgba(255,255,255,0.20)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                lineHeight: 1,
              }}
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="flex md:hidden" style={{
          height: '56px',
          padding: '0 16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(255,255,255,0.70)', display: 'flex' }}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#fff', letterSpacing: '0.28em', fontWeight: 400, lineHeight: 1 }}>GLH</span>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: '7px', color: 'rgba(255,255,255,0.40)', letterSpacing: '0.20em', textTransform: 'uppercase', lineHeight: 1 }}>Green Light House</span>
            </div>
          </Link>

          {/* Cart */}
          <CartBadge count={count} size={17} />
        </div>
      </nav>

      {/* Spacer for non-homepage pages */}
      {router.pathname !== '/' && <div style={{ height: '64px' }} />}

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.50)', zIndex: 60 }}
          />

          {/* Panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '80vw',
            maxWidth: '320px',
            background: 'var(--clr-surface)',
            zIndex: 70,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}>

            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: '0.5px solid var(--clr-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--clr-text-primary)', letterSpacing: '0.28em' }}>
                GLH
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-text-muted)', padding: '4px', display: 'flex' }}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div style={{ padding: '16px 20px', borderBottom: '0.5px solid var(--clr-border)' }}>
              <form onSubmit={handleSearch}>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--clr-page-bg)',
                    border: '0.5px solid var(--clr-border)',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--clr-text-primary)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </form>
            </div>

            {/* Links */}
            <div style={{ flex: 1 }}>
              {DRAWER_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleDrawerNav(link.href)}
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 20px',
                    background: 'none',
                    border: 'none',
                    borderBottom: '0.5px solid var(--clr-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-label)',
                    fontSize: '13px',
                    color: 'var(--clr-text-primary)',
                  }}
                >
                  {link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-text-muted)" strokeWidth="1.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Bottom */}
            <div style={{ padding: '20px' }}>
              <a
                href="https://wa.me/923234641691"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  background: '#1A4731',
                  color: 'white',
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  padding: '12px',
                  borderRadius: '3px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ width: '16px', height: '16px' }}>{WA_ICON}</div>
                Chat with Hassaan
              </a>

              <button
                onClick={toggle}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  color: 'var(--clr-text-muted)',
                  padding: '8px 0',
                }}
              >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-label)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.70)',
        textDecoration: 'none',
        letterSpacing: '0.04em',
        transition: 'color 200ms ease',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'white'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}
    >
      {children}
    </Link>
  );
}
