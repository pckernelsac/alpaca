import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LoadingBlock } from './components/ui/Primitives';
import { Inicio } from './pages/Inicio';

// Solo la portada entra en el paquete inicial; el resto se parte por ruta.
const Nosotros = lazy(() => import('./pages/Nosotros').then((m) => ({ default: m.Nosotros })));
const Colecciones = lazy(() =>
  import('./pages/Colecciones').then((m) => ({ default: m.Colecciones })),
);
const Proceso = lazy(() => import('./pages/Proceso').then((m) => ({ default: m.Proceso })));
const Sostenibilidad = lazy(() =>
  import('./pages/Sostenibilidad').then((m) => ({ default: m.Sostenibilidad })),
);
const Servicios = lazy(() => import('./pages/Servicios').then((m) => ({ default: m.Servicios })));
const Diario = lazy(() => import('./pages/Diario').then((m) => ({ default: m.Diario })));
const DiarioNota = lazy(() => import('./pages/Diario').then((m) => ({ default: m.DiarioNota })));
const Preguntas = lazy(() => import('./pages/Preguntas').then((m) => ({ default: m.Preguntas })));
const Contacto = lazy(() => import('./pages/Contacto').then((m) => ({ default: m.Contacto })));
const Contenido = lazy(() => import('./pages/Contenido').then((m) => ({ default: m.Contenido })));
const NoEncontrada = lazy(() =>
  import('./pages/Contenido').then((m) => ({ default: m.NoEncontrada })),
);

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Header />

      <main id="main" style={{ flex: 1 }}>
        <Suspense fallback={<LoadingBlock />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/colecciones" element={<Colecciones />} />
            <Route path="/proceso" element={<Proceso />} />
            <Route path="/sostenibilidad" element={<Sostenibilidad />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/diario/:slug" element={<DiarioNota />} />
            <Route path="/preguntas" element={<Preguntas />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* El texto de estas cuatro vive en el CMS: cambiarlo no debería
                pedir un despliegue. */}
            <Route path="/envios" element={<Contenido slug="envios" eyebrow="Ayuda" />} />
            <Route
              path="/devoluciones"
              element={<Contenido slug="devoluciones" eyebrow="Ayuda" />}
            />
            <Route path="/terminos" element={<Contenido slug="terminos" />} />
            <Route path="/privacidad" element={<Contenido slug="privacidad" />} />

            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
