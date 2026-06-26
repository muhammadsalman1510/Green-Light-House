import Link from 'next/link';

const HEADING_STYLE = {
  fontFamily: 'var(--font-label)',
  fontSize: '9px',
  color: '#C9A84C',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  marginBottom: '12px',
  display: 'block',
};

const LINK_STYLE = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  lineHeight: '2.2',
  display: 'block',
  transition: 'color 150ms ease',
};

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      style={LINK_STYLE}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.45)',
        textDecoration: 'none',
        lineHeight: '2.2',
        transition: 'color 150ms ease',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
    >
      {icon}
      {label}
    </a>
  );
}

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#111" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: 'white' }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 24px 24px',
      }}
        className="md:px-12 md:pt-16 md:pb-8"
      >

        {/* Brand block */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }} className="md:text-left">
          <div style={{ fontFamily: 'var(--font-label)', fontSize: '11px', color: 'white', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            GREEN LIGHT HOUSE
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.30)', marginTop: '6px' }}>
            Illuminating beautiful spaces since 2019.
          </div>
        </div>

        {/* Nav columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '0',
        }}
          className="md:grid-cols-4 md:gap-12"
        >
          {/* SHOP */}
          <div>
            <span style={HEADING_STYLE}>SHOP</span>
            <FooterLink href="/category">All Products</FooterLink>
            <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
            <FooterLink href="/deals">Deals</FooterLink>
            <FooterLink href="/category">Categories</FooterLink>
          </div>

          {/* HELP */}
          <div>
            <span style={HEADING_STYLE}>HELP</span>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>

          {/* CONTACT — desktop only */}
          <div className="hidden md:block">
            <span style={HEADING_STYLE}>CONTACT</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 2 }}>
              Shop 7, 10-1-BII Khokhar Chowk<br />
              College Road, Township, Lahore
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 2, marginTop: '8px' }}>
              WhatsApp:{' '}
              <a
                href="https://wa.me/923234641691"
                style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
              >
                0323-4641691
              </a>
            </p>
          </div>

          {/* FOLLOW US — desktop only */}
          <div className="hidden md:block">
            <span style={HEADING_STYLE}>FOLLOW US</span>
            <SocialLink href="https://www.instagram.com/greenlight.lhr" icon={<InstagramIcon />} label="Instagram" />
            <SocialLink href="https://www.facebook.com/greeenlighthouse" icon={<FacebookIcon />} label="Facebook" />
            <SocialLink href="https://www.tiktok.com/@greeenlighthouse" icon={<TikTokIcon />} label="TikTok" />
            <SocialLink href="https://www.youtube.com/@greeenlighthouse" icon={<YouTubeIcon />} label="YouTube" />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.10)',
          paddingTop: '20px',
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.20)' }}>
            © 2025 Green Light House. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.20)' }}>
            greenlighthouse.pk
          </span>
        </div>
      </div>
    </footer>
  );
}
