const CONFIG = {
  new:        { bg: '#1A4731',              color: 'white',   text: 'NEW' },
  sale:       { bg: '#C9A84C',              color: '#111111', text: 'SALE' },
  featured:   { bg: 'rgba(255,255,255,0.15)', color: 'white', text: 'FEATURED', border: '0.5px solid rgba(255,255,255,0.30)' },
  limited:    { bg: '#B45309',              color: 'white',   text: 'LIMITED' },
  outofstock: { bg: '#6B6B6B',              color: 'white',   text: 'OUT OF STOCK' },
};

export default function Badge({ type }) {
  const cfg = CONFIG[type];
  if (!cfg) return null;

  return (
    <span style={{
      background: cfg.bg,
      color: cfg.color,
      border: cfg.border || 'none',
      fontFamily: 'var(--font-label)',
      fontSize: '7px',
      letterSpacing: '0.08em',
      fontWeight: 500,
      padding: '2px 7px',
      borderRadius: '2px',
      textTransform: 'uppercase',
      display: 'inline-block',
      lineHeight: '1.6',
    }}>
      {cfg.text}
    </span>
  );
}
