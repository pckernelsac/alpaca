import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useHero } from '@/hooks';
import styles from './HeroSlider.module.css';

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { slides, fetch } = useHero();

  useEffect(() => { fetch(); }, [fetch]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  useEffect(() => {
    const el = swiperRef.current?.el;
    if (!el) return;
    const onMouseEnter = () => { swiperRef.current?.autoplay?.stop(); setIsPaused(true); };
    const onMouseLeave = () => { swiperRef.current?.autoplay?.start(); setIsPaused(false); };
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        className={styles.swiper}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <div
                className={styles.bg}
                style={{ backgroundImage: 'url(' + slide.image + ')' }}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <div
                  className={[
                    styles.textBlock,
                    activeIndex === i ? styles.textVisible : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  <div className={styles.actions}>
                    <Link
                      to={slide.primaryCta.to}
                      className={styles.btnPrimary}
                    >
                      {slide.primaryCta.label}
                    </Link>
                    {slide.secondaryCta && (
                      <Link
                        to={slide.secondaryCta.to}
                        className={styles.btnSecondary}
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
