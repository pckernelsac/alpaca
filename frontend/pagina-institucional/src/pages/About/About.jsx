import SEO from '@/components/seo/SEO';
import AboutHero from './sections/AboutHero/AboutHero';
import AboutStory from './sections/AboutStory/AboutStory';
import AboutInspiration from './sections/AboutInspiration/AboutInspiration';
import AboutArtisans from './sections/AboutArtisans/AboutArtisans';
import AboutFiberQuality from './sections/AboutFiberQuality/AboutFiberQuality';
import AboutMission from './sections/AboutMission/AboutMission';
import AboutTimeline from './sections/AboutTimeline/AboutTimeline';
import AboutGallery from './sections/AboutGallery/AboutGallery';
import CTA from '@/components/common/CTA/CTA';

export default function About() {
  return (
    <><SEO title="Nosotros" description="Conoce la historia de Alpacart. Artesanos peruanos, fibras nobles de los Andes y lujo sostenible." path="/about" />
      <AboutHero />
      <AboutStory />
      <AboutInspiration />
      <AboutArtisans />
      <AboutFiberQuality />
      <AboutMission />
      <AboutTimeline />
      <AboutGallery />
      <CTA />
    </>
  );
}

