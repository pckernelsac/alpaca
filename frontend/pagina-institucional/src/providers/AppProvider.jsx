import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UIProvider>{children}</UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
