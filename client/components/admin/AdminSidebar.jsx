import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAdmin } from '../../context/AdminContext';

const navItems = [
  { label: 'Dashboard',   href: '/admin',            icon: 'dashboard' },
  { label: 'Products',    href: '/admin/products',   icon: 'box' },
  { label: 'Categories',  href: '/admin/categories', icon: 'category' },
  { label: 'Orders',      href: '/admin/orders',     icon: 'order' },
  { label: 'Reviews',     href: '/admin/reviews',    icon: 'star' },
  { label: 'Settings',    href: '/admin/settings',   icon: 'settings' },
];

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
    </svg>
  ),
  box: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  ),
  category: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  order: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 5a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09A1.65 1.65 0 0019.4 15z"/>
    </svg>
  ),
};

export default function AdminSidebar() {
  const router = useRouter();
  const { admin, logout } = useAdmin();

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0E0E0E',
      borderRight: '0.5px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <p style={{
          fontFamily: 'var(--font-heading)', fontSize: '18px',
          color: 'white', letterSpacing: '0.20em', margin: 0,
        }}>
          GLH
        </p>
        <p style={{
          fontFamily: 'var(--font-label)', fontSize: '9px',
          color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em',
          marginTop: '2px', textTransform: 'uppercase',
        }}>
          Admin Panel
        </p>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {navItems.map((item) => {
          const isActive = router.pathname === item.href ||
            (item.href !== '/admin' && router.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '6px',
                marginBottom: '4px',
                textDecoration: 'none',
                background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
                color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.55)',
                fontFamily: 'var(--font-label)',
                fontSize: '13px',
                transition: 'all 150ms ease',
              }}
            >
              {icons[item.icon]}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '12px',
          color: 'rgba(255,255,255,0.40)', marginBottom: '10px',
        }}>
          Logged in as{' '}
          <strong style={{ color: 'rgba(255,255,255,0.70)' }}>{admin?.username}</strong>
        </p>
        <button
          onClick={logout}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.65)',
            padding: '9px',
            borderRadius: '4px',
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
