import Container from '@/components/layout/Container/Container';
import CTA from '@/components/common/CTA/CTA';
import AboutHero from './sections/AboutHero/AboutHero';
import AboutStory from './sections/AboutStory/AboutStory';
import AboutInspiration from './sections/AboutInspiration/AboutInspiration';
import AboutArtisans from './sections/AboutArtisans/AboutArtisans';
import AboutFiberQuality from './sections/AboutFiberQuality/AboutFiberQuality';
import AboutMission from './sections/AboutMission/AboutMission';
import AboutTimeline from './sections/AboutTimeline/AboutTimeline';
import AboutGallery from './sections/AboutGallery/AboutGallery';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      <AboutHero />
      <Container>
        <AboutStory />
      </Container>
      <AboutInspiration />
      <Container>
        <AboutArtisans />
      </Container>
      <AboutFiberQuality />
      <Container>
        <AboutMission />
      </Container>
      <AboutTimeline />
      <AboutGallery />
      <Container>
        <section className={styles.ctaSection}>
          <CTA
            title="Sienta la diferencia."
            description="Le invitamos a explorar nuestra coleccion actual, donde cada pieza cuenta una historia de miles de anos."
            buttonText="Explorar Boutique"
            variant="primary"
          />
        </section>
      </Container>
    </>
  );
}
