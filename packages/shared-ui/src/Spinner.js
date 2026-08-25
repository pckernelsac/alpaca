export function Spinner({ size = 24, color = '#8B4513', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spinner-rotate 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="10" stroke="#e0d5c1" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <style>{`@keyframes spinner-rotate{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}
