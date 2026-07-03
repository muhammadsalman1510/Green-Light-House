export default function ConfirmDialog({
  isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Delete',
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.50)',
        zIndex: 9500, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'white', borderRadius: '10px', padding: '28px',
          width: 'min(400px, 90vw)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontSize: '18px',
          color: '#1C1C1C', marginBottom: '10px',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '14px',
          color: '#6B6B6B', lineHeight: 1.6,
          marginBottom: '24px',
        }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '11px', borderRadius: '4px',
            border: '1px solid #E8E8E8', background: 'white',
            color: '#6B6B6B', fontFamily: 'var(--font-label)',
            fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '11px', borderRadius: '4px', border: 'none',
            background: '#D94040', color: 'white', fontFamily: 'var(--font-label)',
            fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
