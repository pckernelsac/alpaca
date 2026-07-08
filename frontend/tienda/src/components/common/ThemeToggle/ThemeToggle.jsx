import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={[styles.toggle, className].filter(Boolean).join(' ')}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
    >
      <span className={[styles.icon, theme === 'light' ? '' : styles.hidden].filter(Boolean).join(' ')}>
        <span className="material-symbols-outlined">light_mode</span>
      </span>
      <span className={[styles.icon, theme === 'dark' ? '' : styles.hidden].filter(Boolean).join(' ')}>
        <span className="material-symbols-outlined">dark_mode</span>
      </span>
    </button>
  );
}
