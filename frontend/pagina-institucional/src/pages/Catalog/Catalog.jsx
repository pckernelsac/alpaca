import SEO from '@/components/seo/SEO';
import Container from '@/components/layout/Container/Container';
import CTA from '@/components/common/CTA/CTA';
import CatalogHero from './sections/CatalogHero/CatalogHero';
import CatalogIntro from './sections/CatalogIntro/CatalogIntro';
import CatalogFilters from './sections/CatalogFilters/CatalogFilters';
import CatalogBento from './sections/CatalogBento/CatalogBento';
import CatalogProducts from './sections/CatalogProducts/CatalogProducts';
import CatalogTechSpecs from './sections/CatalogTechSpecs/CatalogTechSpecs';
import CatalogGallery from './sections/CatalogGallery/CatalogGallery';

export default function Catalog() {
  return (
    <>
      <SEO title="Catalogo" />
      <CatalogHero />
      <CatalogIntro />
      <CatalogFilters />
      <CatalogBento />
      <CatalogProducts />
      <CatalogTechSpecs />
      <Container>
        <section style={{ padding: 'var(--spacing-xl) 0' }}>
          <CTA
            title="Lleve el Lujo a su Espacio"
            description="Nuestra plataforma institucional es una ventana al arte textil. Si desea adquirir estas piezas para su coleccion personal o boutique, le invitamos a visitar nuestra tienda digital curada."
            buttonText="Explorar Boutique Online"
            variant="primary"
          />
        </section>
      </Container>
    </>
  );
}


