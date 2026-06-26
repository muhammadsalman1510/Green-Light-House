export default function ProductFilters({
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockChange,
  productCount,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '14px 0',
        borderBottom: '0.5px solid var(--clr-border)',
        marginBottom: '24px',
      }}
    >
      {/* Left: product count */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--clr-text-secondary)',
          margin: 0,
        }}
      >
        {productCount} product{productCount !== 1 ? 's' : ''}
      </p>

      {/* Right: sort + in stock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* In stock toggle */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            cursor: 'pointer',
            fontFamily: 'var(--font-label)',
            fontSize: '11px',
            color: 'var(--clr-text-secondary)',
          }}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            style={{ accentColor: '#1A4731', width: '14px', height: '14px' }}
          />
          In stock only
        </label>

        {/* Sort dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label
            htmlFor="sort-select"
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: 'var(--clr-text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '11px',
              color: 'var(--clr-text-primary)',
              background: 'var(--clr-surface)',
              border: '0.5px solid var(--clr-border)',
              borderRadius: '3px',
              padding: '6px 10px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
