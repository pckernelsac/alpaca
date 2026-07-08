import Container from '@/components/layout/Container/Container';
import CTA from '@/components/common/CTA/CTA';
import PromoHero from './sections/PromoHero/PromoHero';
import PromoCampaigns from './sections/PromoCampaigns/PromoCampaigns';
import PromoProducts from './sections/PromoProducts/PromoProducts';
import PromoBanner from './sections/PromoBanner/PromoBanner';
import PromoBenefits from './sections/PromoBenefits/PromoBenefits';
import PromoNewsletter from './sections/PromoNewsletter/PromoNewsletter';

export default function Promotions() {
  return (
    <>
      <PromoHero />
      <PromoCampaigns />
      <PromoProducts />
      <PromoBanner />
      <PromoBenefits />
      <Container>
        <section style={{ padding: 'var(--spacing-xl) 0' }}>
          <CTA
            title="Redescubra el Valor de lo Eterno"
            description="La experiencia completa de Alpacart, donde cada pieza cuenta una historia."
            buttonText="Explorar la Boutique Online"
            variant="dark"
          />
        </section>
      </Container>
      <PromoNewsletter />
    </>
  );
}
