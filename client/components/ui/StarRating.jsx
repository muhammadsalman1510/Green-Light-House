function Star({ filled, size }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size}>
      <path
        d="M6 1l1.39 2.81L11 4.24l-2.5 2.43.59 3.43L6 8.5l-3.09 1.6.59-3.43L1 4.24l3.61-.43z"
        fill={filled ? '#C9A84C' : '#E0DDD5'}
        stroke={filled ? '#C9A84C' : '#E0DDD5'}
        strokeWidth="0.5"
      />
    </svg>
  );
}

export default function StarRating({ rating = 0, count, size = 'sm' }) {
  const starSize = size === 'md' ? 14 : 11;
  const rounded = Math.round(rating);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rounded} size={starSize} />
      ))}
      {count != null && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--clr-text-muted)',
          marginLeft: '4px',
          lineHeight: 1,
        }}>
          ({count})
        </span>
      )}
    </div>
  );
}
