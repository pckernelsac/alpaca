import styles from './TrackingTimeline.module.css';

const defaultSteps = [
  { label: 'Pedido Realizado', date: '18 oct, 10:24', completed: true },
  { label: 'Preparado', date: '19 oct, 14:15', completed: true },
  { label: 'En Tránsito', date: 'En Ruta al Centro', active: true },
  { label: 'Entregado', date: 'Estimado 24 oct', completed: false },
];

export default function TrackingTimeline({ steps = defaultSteps, className = '' }) {
  return (
    <div className={[styles.timeline, className].filter(Boolean).join(' ')}>
      {steps.map((step, i) => (
        <div key={i} className={styles.step}>
          <div className={[styles.dot, step.completed ? styles.done : '', step.active ? styles.active : ''].filter(Boolean).join(' ')}>
            {step.completed && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-text-inverse)', fontVariationSettings: "'FILL' 1" }}>check</span>}
            {step.active && <div className={styles.pulse} />}
          </div>
          <div className={styles.info}>
            <p className={[styles.label, step.active ? styles.labelActive : ''].filter(Boolean).join(' ')}>{step.label}</p>
            <p className={styles.date}>{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}