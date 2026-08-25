import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Alpacart';
const DEFAULT_DESC = 'Alpaca peruana premium. Descubre nuestra colección de prendas de alpaca, vicuña y lana de los Andes. Lujo ancestral, diseño contemporáneo.';

export default function SEO({ title, description = DEFAULT_DESC, image, path = '' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Lujo Ancestral, Diseño Contemporáneo`;
  const url = `https://alpacart.com${path}`;
  const img = image || '/og-default.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
