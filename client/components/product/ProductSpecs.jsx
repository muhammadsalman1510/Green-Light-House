const specLabels = {
  wattage:   'Wattage',
  lumens:    'Lumen Output',
  colorTemp: 'Color Temperature',
  fitting:   'Fitting Type',
  ipRating:  'IP Rating',
  dimensions: 'Dimensions',
  material:  'Material',
  dimmable:  'Dimmable',
  warranty:  'Warranty',
};

const specOrder = ['wattage', 'lumens', 'colorTemp', 'fitting', 'ipRating', 'dimensions', 'material', 'dimmable', 'warranty'];

export default function ProductSpecs({ specs }) {
  if (!specs) return null;

  const rows = specOrder
    .filter((key) => specs[key] !== undefined && specs[key] !== null && specs[key] !== '')
    .map((key) => ({ key, label: specLabels[key], value: specs[key] }));

  if (rows.length === 0) return null;

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--clr-text-primary)',
          marginBottom: '16px',
        }}
      >
        Specifications
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            const cellBorder = isLast ? 'none' : '0.5px solid var(--clr-border)';

            let displayValue;
            if (row.key === 'dimmable') {
              displayValue = (
                <span style={{ color: row.value ? '#1A4731' : 'var(--clr-text-secondary)' }}>
                  {row.value ? 'Yes' : 'No'}
                </span>
              );
            } else {
              displayValue = row.value;
            }

            return (
              <tr key={row.key}>
                <td
                  style={{
                    width: '40%',
                    fontFamily: 'var(--font-label)',
                    fontSize: '12px',
                    color: 'var(--clr-text-secondary)',
                    padding: '10px 0',
                    borderBottom: cellBorder,
                    verticalAlign: 'top',
                  }}
                >
                  {row.label}
                </td>
                <td
                  style={{
                    width: '60%',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--clr-text-primary)',
                    padding: '10px 0 10px 16px',
                    borderBottom: cellBorder,
                  }}
                >
                  {displayValue}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
