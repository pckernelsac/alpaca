import SEO from '@/components/seo/SEO';
import HomeHero from './sections/HomeHero/HomeHero';
import HomeFeatures from './sections/HomeFeatures/HomeFeatures';
import HomeCategories from './sections/HomeCategories/HomeCategories';
import HomeCTA from './sections/HomeCTA/HomeCTA';
import HomeTestimonials from './sections/HomeTestimonials/HomeTestimonials';
import HomeGallery from './sections/HomeGallery/HomeGallery';
import HomeNewsletter from './sections/HomeNewsletter/HomeNewsletter';

export default function Home() {
  return (
    <><SEO title="Inicio" description="Alpaca peruana premium. Descubre nuestra colección de prendas de alpaca, vicuña y lana de los Andes." />
      <HomeHero />
      <HomeFeatures />
      <HomeCategories />
      <HomeCTA />
      <HomeTestimonials />
      <HomeGallery />
      <HomeNewsletter />
    </>
  );
}

