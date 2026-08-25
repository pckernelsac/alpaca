import { Spinner } from './Spinner';

export function Loading({ text = 'Cargando...', size = 32 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 }}>
      <Spinner size={size} />
      {text && <span style={{ color: '#888', fontSize: 14 }}>{text}</span>}
    </div>
  );
}
