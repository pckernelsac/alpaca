'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('hero_slides', [
      { title: 'Tradición Alpaca del Perú', subtitle: 'Prendas elaboradas con fibra de alpaca seleccionada, combinando tradición artesanal y diseño contemporáneo.', cta_text: 'Explorar Colección', cta_link: '/catalogo', image: '/images/hero/hero-01.jpg', order: 1, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Elegancia Natural', subtitle: 'Descubre prendas exclusivas diseñadas para brindar confort, calidad y estilo en cualquier ocasión.', cta_text: 'Ver Catálogo', cta_link: '/catalogo', image: '/images/hero/hero-02.jpg', order: 2, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Colecciones Exclusivas', subtitle: 'Explora nuestras líneas de ponchos, chompas, bufandas y accesorios.', cta_text: 'Descubrir Productos', cta_link: '/catalogo', image: '/images/hero/hero-03.jpg', order: 3, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Artesanía que Trasciende', subtitle: 'Cada prenda representa el trabajo de artesanos peruanos comprometidos con la excelencia.', cta_text: 'Nuestra Historia', cta_link: '/about', image: '/images/hero/hero-04.jpg', order: 4, active: true, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('testimonials', [
      { author: 'Elena V.', role: 'Cliente', company: 'Milán', text: 'Cada prenda tiene una presencia que abraza como la tierra misma. ALPACART no es solo moda; es alma.', rating: 5, featured: true, order: 1, active: true, created_at: new Date(), updated_at: new Date() },
      { author: 'Carlos M.', role: 'Diseñador', company: 'Lima', text: 'La calidad de la fibra de alpaca supera cualquier expectativa.', rating: 5, featured: true, order: 2, active: true, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('benefits', [
      { title: 'Baby Alpaca', description: 'Seleccionada por su finura extrema y propiedades térmicas, superando al cachemir.', icon: 'spa', order: 1, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Origen Trazable', description: 'Cada fibra es rastreada desde los remotos rebaños andinos hasta nuestro telar final.', icon: 'water_drop', order: 2, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Paleta Natural', description: 'Priorizamos las fibras sin teñir, celebrando los 22 tonos naturales de la alpaca.', icon: 'eco', order: 3, active: true, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('gallery_images', [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', alt_text: 'Alpaca en los Andes', caption: 'Andes peruanos', category: 'naturaleza', order: 1, visible: true, created_at: new Date(), updated_at: new Date() },
      { url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600', alt_text: 'Tejido artesanal', caption: 'Telar tradicional', category: 'artesania', order: 2, visible: true, created_at: new Date(), updated_at: new Date() },
      { url: 'https://images.unsplash.com/photo-1605408499391-636e2c0d8e8a?w=600', alt_text: 'Prenda de alpaca', caption: 'Colección Esencia', category: 'productos', order: 3, visible: true, created_at: new Date(), updated_at: new Date() },
      { url: 'https://images.unsplash.com/photo-1596900779745-9e5c3e6f3c3d?w=600', alt_text: 'Artesana tejiendo', caption: 'Artesanía peruana', category: 'artesania', order: 4, visible: true, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('artisan_processes', [
      { title: 'Selección de Fibra', description: 'Seleccionamos las fibras más finas de alpaca de criadores de los Andes peruanos.', icon: 'search', step_order: 1, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Lavado y Peinado', description: 'La fibra se lava con aguas de manantial y se peina suavemente para preservar sus propiedades.', icon: 'water_drop', step_order: 2, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Teñido Natural', description: 'Utilizamos pigmentos naturales extraídos de plantas andinas.', icon: 'palette', step_order: 3, active: true, created_at: new Date(), updated_at: new Date() },
      { title: 'Tejido Artesanal', description: 'Artesanos expertos tejen cada prenda en telares tradicionales.', icon: 'handyman', step_order: 4, active: true, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('faq_categories', [
      { id: 100, name: 'Productos', slug: 'productos', icon: 'inventory_2', order: 1, created_at: new Date(), updated_at: new Date() },
      { id: 101, name: 'Materiales y Cuidado', slug: 'materiales', icon: 'local_laundry_service', order: 2, created_at: new Date(), updated_at: new Date() },
      { id: 102, name: 'Envíos y Rastreo', slug: 'envios', icon: 'local_shipping', order: 3, created_at: new Date(), updated_at: new Date() },
      { id: 103, name: 'Cambios y Devoluciones', slug: 'cambios', icon: 'replay', order: 4, created_at: new Date(), updated_at: new Date() },
    ], {});

    await queryInterface.bulkInsert('faq_items', [
      { category_id: 100, question: '¿Cómo elijo mi talla ideal?', answer: 'Nuestras prendas están diseñadas para ofrecer una caída fluida y natural. Consulte nuestra guía de tallas detallada con medidas exactas en centímetros.', order: 1, created_at: new Date(), updated_at: new Date() },
      { category_id: 100, question: '¿Sus colecciones son de edición limitada?', answer: 'Sí, trabajamos bajo un modelo de producción consciente. Cada pieza se produce en cantidades limitadas para garantizar la máxima calidad.', order: 2, created_at: new Date(), updated_at: new Date() },
      { category_id: 101, question: '¿Cuál es la diferencia entre Alpaca y Baby Alpaca?', answer: 'La denominación "Baby Alpaca" se refiere a la finura de la fibra (entre 19 y 22 micras), resultando en una suavidad similar a la seda.', order: 1, created_at: new Date(), updated_at: new Date() },
      { category_id: 101, question: '¿Cómo debo lavar mi prenda Alpacart?', answer: 'Recomendamos lavado a mano con agua fría y jabón neutro, o limpieza en seco profesional. Nunca use secadora.', order: 2, created_at: new Date(), updated_at: new Date() },
      { category_id: 102, question: '¿Realizan envíos internacionales?', answer: 'Sí, realizamos envíos a más de 50 países. Los tiempos de entrega oscilan entre 5 y 12 días hábiles.', order: 1, created_at: new Date(), updated_at: new Date() },
      { category_id: 102, question: '¿Cómo puedo rastrear mi pedido?', answer: 'Recibirá un correo con un número de guía único y un enlace al portal de seguimiento.', order: 2, created_at: new Date(), updated_at: new Date() },
      { category_id: 103, question: '¿Cuál es su política de devoluciones?', answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la recepción, con la prenda en su estado original.', order: 1, created_at: new Date(), updated_at: new Date() },
      { category_id: 103, question: '¿Qué garantía ofrecen?', answer: 'Cada producto cuenta con una garantía de 6 meses contra defectos de fabricación.', order: 2, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('faq_items', null, {});
    await queryInterface.bulkDelete('faq_categories', null, {});
    await queryInterface.bulkDelete('artisan_processes', null, {});
    await queryInterface.bulkDelete('gallery_images', null, {});
    await queryInterface.bulkDelete('benefits', null, {});
    await queryInterface.bulkDelete('testimonials', null, {});
    await queryInterface.bulkDelete('hero_slides', null, {});
  },
};
