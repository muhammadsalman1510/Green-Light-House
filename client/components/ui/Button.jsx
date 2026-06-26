import { useState } from 'react';
import Link from 'next/link';

const BASE = {
  fontFamily: 'var(--font-label)',
  fontSize: '10px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  padding: '10px 24px',
  borderRadius: '2px',
  transition: 'all 200ms ease',
  cursor: 'pointer',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  textDecoration: 'none',
};

const VARIANTS = {
  primary: {
    normal: { background: '#C9A84C', color: '#111111' },
    hover:  { background: '#A8893A', transform: 'translateY(-1px)' },
    active: { background: '#8A7030', transform: 'translateY(0)' },
  },
  outline: {
    normal: { background: 'transparent', border: '1px solid #1A4731', color: '#1A4731' },
    hover:  { background: '#1A4731', color: 'white', transform: 'translateY(-1px)' },
  },
  whatsapp: {
    normal: { background: '#25D366', color: 'white', borderRadius: '4px' },
    hover:  { background: '#1DA851', transform: 'translateY(-2px)' },
  },
  text: {
    normal: {
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #1A4731',
      color: '#1A4731',
      padding: '0 0 2px 0',
      borderRadius: 0,
      minHeight: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
    },
    hover: { color: '#C9A84C', borderBottom: '1px solid #C9A84C' },
  },
};

export default function Button({
  variant = 'primary',
  children,
  onClick,
  href,
  className = '',
  disabled = false,
  icon,
  fullWidth = false,
}) {
  const [hovered, setHovered] = useState(false);

  const v = VARIANTS[variant] || VARIANTS.primary;
  const style = {
    ...BASE,
    ...v.normal,
    ...(hovered && !disabled ? v.hover : {}),
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed', transform: 'none' } : {}),
    ...(icon ? { gap: '8px' } : {}),
  };

  const handlers = disabled
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onMouseDown: () => {},
        onMouseUp: () => {},
      };

  const content = (
    <>
      {icon && icon}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} style={style} className={className} {...handlers}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={style}
      className={className}
      disabled={disabled}
      {...handlers}
    >
      {content}
    </button>
  );
}
