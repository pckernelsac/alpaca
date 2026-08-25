import SEO from '@/components/seo/SEO';
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
      <SEO title="Promociones" />
      <PromoHero />
      <PromoCampaigns />
      <PromoProducts />
      <PromoBanner />
      <PromoBenefits />
      <PromoNewsletter />
    </>
  );
}
