import styles from './CheckoutStepper.module.css';

const labels = ['Información', 'Envío', 'Pago'];

export default function CheckoutStepper({ currentStep = 1, className = '' }) {
  return (
    <div className={[styles.stepper, className].filter(Boolean).join(' ')}>
      {labels.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div key={i} className={[styles.step, isActive ? styles.active : '', isCompleted ? styles.completed : ''].filter(Boolean).join(' ')}>
            <div className={styles.circle}>{isCompleted ? '\u2713' : step}</div>
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}