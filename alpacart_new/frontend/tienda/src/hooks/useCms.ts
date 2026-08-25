import { useEffect, useState } from 'react';

import { cmsApi } from '../lib/api';
import type { Benefit, FaqCategory, HeroSlide, Testimonial } from '../lib/types';

/** Contenido del home. Se pide en paralelo y falla en silencio: si el CMS no
 *  responde, la página igual se renderiza con sus textos por defecto. */
export function useCms() {
  const [hero, setHero] = useState<HeroSlide[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    Promise.allSettled([
      cmsApi.hero(controller.signal),
      cmsApi.benefits(controller.signal),
      cmsApi.testimonials(controller.signal),
    ]).then(([heroResult, benefitResult, testimonialResult]) => {
      if (controller.signal.aborted) return;
      if (heroResult.status === 'fulfilled') setHero(heroResult.value);
      if (benefitResult.status === 'fulfilled') setBenefits(benefitResult.value);
      if (testimonialResult.status === 'fulfilled') setTestimonials(testimonialResult.value);
      setLoading(false);
    });

    return () => controller.abort();
  }, []);

  return { hero, benefits, testimonials, loading };
}

export function useFaq() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    cmsApi
      .faq(controller.signal)
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return { categories, loading };
}
