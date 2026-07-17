export function Skeleton({ width = '100%', height = 20, borderRadius = 4, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        width, height, borderRadius,
        background: 'linear-gradient(90deg, #e8e0d0 25%, #f0e8d8 50%, #e8e0d0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
        ...style,
      }}
    >
      <style>{`@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}`}</style>
    </div>
  );
}
