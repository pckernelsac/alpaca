import hero01 from '@/assets/images/hero/hero-01.svg';
import hero02 from '@/assets/images/hero/hero-02.svg';
import hero03 from '@/assets/images/hero/hero-03.svg';
import hero04 from '@/assets/images/hero/hero-04.svg';
import hero05 from '@/assets/images/hero/hero-05.svg';

const slides = [
  {
    id: 1,
    image: hero01,
    title: 'Tradicion Alpaca del Peru',
    subtitle:
      'Prendas elaboradas con fibra de alpaca seleccionada, combinando tradicion artesanal y diseno contemporaneo.',
    primaryCta: { label: 'Explorar Coleccion', to: '/catalogo' },
    secondaryCta: { label: 'Conocer Nosotros', to: '/about' },
  },
  {
    id: 2,
    image: hero02,
    title: 'Elegancia Natural',
    subtitle:
      'Descubre prendas exclusivas disenadas para brindar confort, calidad y estilo en cualquier ocasion.',
    primaryCta: { label: 'Ver Catalogo', to: '/catalogo' },
  },
  {
    id: 3,
    image: hero03,
    title: 'Colecciones Exclusivas',
    subtitle:
      'Explora nuestras lineas de ponchos, chompas, bufandas y accesorios confeccionados con los mas altos estandares.',
    primaryCta: { label: 'Descubrir Productos', to: '/catalogo' },
  },
  {
    id: 4,
    image: hero04,
    title: 'Artesania que Trasciende',
    subtitle:
      'Cada prenda representa el trabajo de artesanos peruanos comprometidos con la excelencia y la tradicion textil.',
    primaryCta: { label: 'Nuestra Historia', to: '/about' },
  },
  {
    id: 5,
    image: hero05,
    title: 'Compra con Confianza',
    subtitle:
      'Calidad garantizada, envios seguros y atencion personalizada para cada cliente.',
    primaryCta: { label: 'Contactanos', to: '/contacto' },
  },
];

export default slides;
