import { ButtonLink } from '../components/ui/Button';
import { EmptyState } from '../components/ui/Primitives';
import { usePageTitle } from '../hooks/usePageTitle';

export function NotFound() {
  usePageTitle('Página no encontrada');

  return (
    <EmptyState
      title="Esta pantalla no existe"
      description="El enlace puede estar viejo o mal escrito."
      actions={<ButtonLink to="/">Volver al panel</ButtonLink>}
    />
  );
}
