import CollectionCard from '@/pages/Collection/sections/CollectionCard/CollectionCard';
import styles from './CollectionGrid.module.css';

const collections = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDerwZoE05kFygK4v522R0j9sQPTmrizg2gzcXgXYbvirRaP6hTElaOhWaxdMo_s-_4eJszjajodrSJxhfuDuIVun0Bo3_p3ybN1lcHLu1dKgrQxezuc8lFi9oICX9fnVKXkazIpsjWJthFdrHNrzWVtBuVURQUN5Uwmuaz3UGJdvRESiySQtkw1TOO_cjW35_vLliGQDtzuV0u-qMOdI4NvpIunbnMCWq1W0cqYy_UB1CrtMzWrGPf7-EOKwopiXV2dQUcsDLVkdff',
    title: 'Oro de los Andes',
    pieceCount: 42,
    description: 'Inspirada en la primera luz que acaricia los picos del Cusco. Tejidos exclusivos en vicuña que capturan los ocres de la tierra y los neutros del sol andino.',
    catalogId: 'AG-2024', to: '/category/ponchos',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnEAqQyheZ0e2nVY8gFWX_JGCbjx-rOyGBvYtEBmow4Wm0aUPUfM5cFpYNxUTjmrGa86QI0LZCN-w71gyi6PA2F87xyM3GzPc6fYmXy7CDthZD9_MV9dGwtU35COH4vmdt_hDH62vLCdEvj25OwReLPwBMkZIRKnm8UlZP2BHD4xP4NKIDNDttJkP4rqT1xQfJAWdCcjn7pQvc0vkiIWygTQrNRWYzTl6NumqzW2Pwps5B9OEo_WaNbGWO791ckjNudm0-znjSmwup',
    title: 'Esenciales Heritage',
    pieceCount: 28,
    description: 'La base de un guardarropa con carácter. Siluetas atemporales diseñadas para cruzar generaciones, tejidas en nuestra emblemática fibra de los Andes.',
    catalogId: 'HE-BASE', to: '/category/chompas',
    offset: true,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl2bLKl0xL0djWMXrbk5EISOl0U9-w_KnKBlIjihaZRi-An82AJSkFJAXTnLG80ZrXTRjwVh7LnIlKKTriACnbx6ml1sq-JbZ13OHP_a-BXPcP_Ledp9ZHJ_XvzK2a7OP6u-U6gXBW4gwRdaYcMmZeKAmYWFt0twEzokN0VTs7fXdD_Amtkpw-1LPv9HWTET-a19bgk39cmMhO3osKN94TbdXPOwiAVEPLkHuJ8-5pSaKtiGiceruEvqrxU4B61tUqWV3qUYpP9yx5',
    title: 'La Serie Artesanal',
    pieceCount: 15,
    description: 'Un homenaje al telar andino. Cada pieza lleva la firma única de su artesano, donde la imperfección celebrada se convierte en el sello del verdadero lujo.',
    catalogId: 'AS-HAND', to: '/category/bufandas',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR-rA904mzwqIqShfgaiC8GJMpFsdy6m5nAkDsQPOv5YyCb6HZryDHmsMsJKosY-uBOz-6PuybrKUyoxh0cjw9FfA55ZPKNpuoukTM0Px1feeOEy93tVKKy7HpjIdvws4Fu9Xv6mqbHfAiCrzwCWk8e12VuYBxl7wqky-2yFhZbgoRA-6CD1KbsutwHMGmA2nYZPM_agTvexT9wi76PsOCC8PJS7-tDSIZ9k-EOuNMSsu22fe8T7Xdrk07FcB1ot9KBNGAn9cnnps5',
    title: 'Alma Sostenible',
    pieceCount: 22,
    description: 'Fibras vírgenes sin teñir que honran la tierra. Esta cápsula recorre el espectro natural de la alpaca: del blanco nube al negro volcánico más profundo.',
    catalogId: 'SS-ECO', to: '/category/accesorios',
    offset: true,
  },
];

export default function CollectionGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {collections.map((col, i) => (
          <CollectionCard key={i} {...col} className={col.offset ? styles.offset : ''} />
        ))}
      </div>
    </section>
  );
}