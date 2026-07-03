import Skeleton from './Skeleton';

export default function ProductCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: '4px',
        overflow: 'hidden',
        background: 'var(--clr-surface)',
        border: '0.5px solid var(--clr-border)',
      }}
    >
      <Skeleton height="200px" style={{ borderRadius: 0 }} />

      <div style={{ padding: '10px 12px 12px' }}>
        <Skeleton width="60%" height="10px" style={{ marginBottom: '8px' }} />
        <Skeleton width="90%" height="14px" style={{ marginBottom: '4px' }} />
        <Skeleton width="70%" height="14px" style={{ marginBottom: '12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width="80px" height="14px" />
          <Skeleton width="26px" height="26px" rounded />
        </div>
      </div>
    </div>
  );
}
