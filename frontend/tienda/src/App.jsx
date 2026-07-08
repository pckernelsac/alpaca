import { AppProvider } from '@/providers/AppProvider';
import AppRouter from '@/routes/AppRouter';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}