import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { THEME_KEY } from '@/constants';

export const ThemeContext = createContext(null);

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(stored) {
  if (stored) return stored;
  return getSystemTheme();
}

export function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage(THEME_KEY, null);
  const [theme, setThemeState] = useState(() => getInitialTheme(storedTheme));

  const applyTheme = useCallback((t) => {
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const setTheme = useCallback(
    (next) => {
      const resolved = typeof next === 'function' ? next(theme) : next;
      setThemeState(resolved);
      setStoredTheme(resolved);
      applyTheme(resolved);
    },
    [theme, setStoredTheme, applyTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!storedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [storedTheme]);

  const value = { theme, setTheme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
