export default function StatCard({ label, value, icon, accent = '#1A4731' }) {
  return (
    <div style={{
      background: 'white', borderRadius: '8px', padding: '20px',
      border: '0.5px solid #E8E8E8',
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '8px',
        background: `${accent}18`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: accent,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '26px',
          fontWeight: 600, color: '#1C1C1C', margin: 0,
          lineHeight: 1,
        }}>
          {value ?? '—'}
        </p>
        <p style={{
          fontFamily: 'var(--font-label)', fontSize: '10px',
          color: '#999999', letterSpacing: '0.05em',
          textTransform: 'uppercase', marginTop: '4px', marginBottom: 0,
        }}>
          {label}
        </p>
      </div>
    </div>
  );
}
