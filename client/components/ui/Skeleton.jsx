export default function Skeleton({ width = '100%', height = '16px', className = '', rounded = false, style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: rounded ? '9999px' : '4px',
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
