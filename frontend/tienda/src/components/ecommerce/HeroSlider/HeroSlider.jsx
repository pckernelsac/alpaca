import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './HeroSlider.module.css';

const slides = [
  { id: 1, image: '', title: 'Coleccion Verano', subtitle: 'Descubre los nuevos ingresos de temporada.', cta: 'Explorar', link: '/collection' },
  { id: 2, image: '', title: 'Alpaca Baby Premium', subtitle: 'La suavidad mas exclusiva del Peru.', cta: 'Comprar Ahora', link: '/category/alpaca' },
  { id: 3, image: '', title: 'Envio Gratis', subtitle: 'En pedidos superiores a S/500.', cta: 'Ver Condiciones', link: '/category/ofertas' },
];

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleSlideChange = useCallback((swiper) => setActiveIndex(swiper.realIndex), []);

  useEffect(() => {
    const el = swiperRef.current?.el;
    if (!el) return;
    const onEnter = () => { swiperRef.current?.autoplay?.stop(); setPaused(true); };
    const onLeave = () => { swiperRef.current?.autoplay?.start(); setPaused(false); };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <section className={styles.wrapper}>
      <Swiper ref={swiperRef} modules={[Autoplay, Navigation, Pagination, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={800} loop autoplay={{ delay: 5000, disableOnInteraction: false }} navigation pagination={{ clickable: true }} onSlideChange={handleSlideChange} className={styles.swiper}>
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <div className={styles.bg} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <div className={[styles.textBlock, activeIndex === i ? styles.textVisible : ''].filter(Boolean).join(' ')}>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  <Link to={slide.link} className={styles.btn}>{slide.cta}</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}