export default function AdminTable({ columns, data, onRowClick, emptyMessage = 'No items found.' }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        padding: '48px', textAlign: 'center',
        background: 'white', borderRadius: '8px',
        border: '0.5px solid #E8E8E8',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', color: '#999999', fontSize: '14px', margin: 0 }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white', borderRadius: '8px',
      border: '0.5px solid #E8E8E8', overflow: 'hidden',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid #E8E8E8', background: '#FAFAF8' }}>
              {columns.map((col) => (
                <th key={col.key} style={{
                  textAlign: 'left', padding: '12px 16px',
                  fontFamily: 'var(--font-label)', fontSize: '10px',
                  color: '#999999', letterSpacing: '0.05em',
                  textTransform: 'uppercase', fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item._id || i}
                onClick={() => onRowClick && onRowClick(item)}
                style={{
                  borderBottom: i < data.length - 1 ? '0.5px solid #E8E8E8' : 'none',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.background = '#FAFAF8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{
                    padding: '14px 16px',
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    color: '#1C1C1C',
                  }}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
