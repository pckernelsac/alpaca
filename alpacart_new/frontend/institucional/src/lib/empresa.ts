/**
 * Datos de la casa.
 *
 * El backend los tiene en `/settings/company`, pero ese endpoint exige staff:
 * una web pública no puede leerlo. Se copian acá los mismos valores que siembra
 * `COMPANY` en el backend, para que la dirección y el teléfono del sitio no
 * contradigan lo que ve el panel.
 */
export const EMPRESA = {
  nombre: 'Alpacart Textiles S.A.C.',
  ruc: '20601234567',
  correo: 'hola@alpacart.com',
  telefono: '+51 999 888 777',
  /** El mismo número sin separadores; wa.me no acepta espacios ni signos. */
  whatsapp: '51999888777',
  direccion: 'Av. Ejército 1010, Yanahuara',
  ciudad: 'Arequipa, Perú',
  horario: 'Lunes a viernes, 9:00 a 18:00',
  desde: 2018,
  talleres: ['Puno', 'Cusco', 'Arequipa'],
  familias: 140,
} as const;

export const REDES = [
  { label: 'Instagram', href: 'https://instagram.com/alpacart' },
  { label: 'Pinterest', href: 'https://pinterest.com/alpacart' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/alpacart' },
] as const;
