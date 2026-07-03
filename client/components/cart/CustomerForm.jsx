const labelStyle = {
  fontFamily: 'var(--font-label)',
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--clr-text-secondary)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  marginBottom: '6px',
  display: 'block',
};

const errorStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  color: '#D94040',
  marginTop: '4px',
};

function Field({ label, error, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default function CustomerForm({ values, onChange, errors }) {
  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '10px 14px',
    border: `0.5px solid ${errors[fieldName] ? '#D94040' : 'var(--clr-border)'}`,
    borderRadius: '3px',
    background: 'var(--clr-surface)',
    color: 'var(--clr-text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 200ms ease',
    boxSizing: 'border-box',
  });

  const handleFocus = (e) => {
    if (!e.target.style.borderColor.includes('D94040')) {
      e.target.style.borderColor = '#1A4731';
    }
  };
  const handleBlur = (e, fieldName) => {
    if (!errors[fieldName]) {
      e.target.style.borderColor = 'var(--clr-border)';
    }
  };

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--clr-text-primary)',
          marginBottom: '20px',
        }}
      >
        Customer Information
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field label="Full Name *" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Ahmed Khan"
            style={inputStyle('name')}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'name')}
          />
        </Field>

        <Field label="Phone Number *" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="e.g. 0323-4641691"
            style={inputStyle('phone')}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'phone')}
          />
        </Field>

        <Field label="City *" error={errors.city}>
          <input
            type="text"
            value={values.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="e.g. Lahore"
            style={inputStyle('city')}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'city')}
          />
        </Field>

        <Field label="Special Instructions">
          <textarea
            rows={3}
            value={values.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Any specific delivery instructions or product notes..."
            style={{
              ...inputStyle('notes'),
              resize: 'vertical',
              minHeight: '80px',
            }}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'notes')}
          />
        </Field>
      </div>
    </div>
  );
}
