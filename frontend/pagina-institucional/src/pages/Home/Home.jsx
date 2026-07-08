import HomeHero from './sections/HomeHero/HomeHero';
import HomeFeatures from './sections/HomeFeatures/HomeFeatures';
import HomeCategories from './sections/HomeCategories/HomeCategories';
import HomeCTA from './sections/HomeCTA/HomeCTA';
import HomeTestimonials from './sections/HomeTestimonials/HomeTestimonials';
import HomeGallery from './sections/HomeGallery/HomeGallery';
import HomeNewsletter from './sections/HomeNewsletter/HomeNewsletter';

export default function Home() {
  return (
    <>
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
