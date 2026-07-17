import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';
import PreviewProvider from '@/preview/PreviewProvider';

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PreviewProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </PreviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
