'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existing = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM hero_slides`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (existing[0]?.count > 0) return;

    const now = new Date();

    await queryInterface.bulkInsert('hero_slides', [
      { title: 'Tradición Alpaca del Perú', subtitle: 'Prendas elaboradas con fibra de alpaca seleccionada.', cta_text: 'Explorar Colección', cta_link: '/catalogo', image: '/images/hero/hero-01.jpg', order: 1, active: true, created_at: now, updated_at: now },
      { title: 'Elegancia Natural', subtitle: 'Descubre prendas exclusivas.', cta_text: 'Ver Catálogo', cta_link: '/catalogo', image: '/images/hero/hero-02.jpg', order: 2, active: true, created_at: now, updated_at: now },
      { title: 'Colecciones Exclusivas', subtitle: 'Explora nuestras líneas.', cta_text: 'Descubrir Productos', cta_link: '/catalogo', image: '/images/hero/hero-03.jpg', order: 3, active: true, created_at: now, updated_at: now },
      { title: 'Artesanía que Trasciende', subtitle: 'Cada prenda representa el trabajo de artesanos.', cta_text: 'Nuestra Historia', cta_link: '/about', image: '/images/hero/hero-04.jpg', order: 4, active: true, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('testimonials', [
      { author: 'Elena V.', role: 'Cliente', company: 'Milán', text: 'Cada prenda tiene una presencia que abraza.', rating: 5, featured: true, order: 1, active: true, created_at: now, updated_at: now },
      { author: 'Carlos M.', role: 'Diseñador', company: 'Lima', text: 'La calidad de la fibra de alpaca supera expectativas.', rating: 5, featured: true, order: 2, active: true, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('benefits', [
      { title: 'Baby Alpaca', description: 'Seleccionada por su finura extrema.', icon: 'spa', order: 1, active: true, created_at: now, updated_at: now },
      { title: 'Origen Trazable', description: 'Cada fibra rastreada desde los rebaños andinos.', icon: 'water_drop', order: 2, active: true, created_at: now, updated_at: now },
      { title: 'Paleta Natural', description: '22 tonos naturales de la alpaca.', icon: 'eco', order: 3, active: true, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('gallery_images', [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600', alt_text: 'Alpaca en los Andes', caption: 'Andes peruanos', category: 'naturaleza', order: 1, visible: true, created_at: now, updated_at: now },
      { url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600', alt_text: 'Tejido artesanal', caption: 'Telar tradicional', category: 'artesania', order: 2, visible: true, created_at: now, updated_at: now },
      { url: 'https://images.unsplash.com/photo-1605408499391-636e2c0d8e8a?w=600', alt_text: 'Prenda de alpaca', caption: 'Colección Esencia', category: 'productos', order: 3, visible: true, created_at: now, updated_at: now },
      { url: 'https://images.unsplash.com/photo-1596900779745-9e5c3e6f3c3d?w=600', alt_text: 'Artesana tejiendo', caption: 'Artesanía peruana', category: 'artesania', order: 4, visible: true, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('artisan_processes', [
      { title: 'Selección de Fibra', description: 'Seleccionamos las fibras más finas.', icon: 'search', step_order: 1, active: true, created_at: now, updated_at: now },
      { title: 'Lavado y Peinado', description: 'La fibra se lava con aguas de manantial.', icon: 'water_drop', step_order: 2, active: true, created_at: now, updated_at: now },
      { title: 'Teñido Natural', description: 'Pigmentos naturales de plantas andinas.', icon: 'palette', step_order: 3, active: true, created_at: now, updated_at: now },
      { title: 'Tejido Artesanal', description: 'Artesanos tejen en telares tradicionales.', icon: 'handyman', step_order: 4, active: true, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('faq_categories', [
      { id: 100, name: 'Productos', slug: 'productos', icon: 'inventory_2', order: 1, created_at: now, updated_at: now },
      { id: 101, name: 'Materiales y Cuidado', slug: 'materiales', icon: 'local_laundry_service', order: 2, created_at: now, updated_at: now },
      { id: 102, name: 'Envíos y Rastreo', slug: 'envios', icon: 'local_shipping', order: 3, created_at: now, updated_at: now },
      { id: 103, name: 'Cambios y Devoluciones', slug: 'cambios', icon: 'replay', order: 4, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('faq_items', [
      { category_id: 100, question: '¿Cómo elijo mi talla ideal?', answer: 'Consulte nuestra guía de tallas con medidas en centímetros.', order: 1, created_at: now, updated_at: now },
      { category_id: 100, question: '¿Sus colecciones son de edición limitada?', answer: 'Sí, producción consciente en cantidades limitadas.', order: 2, created_at: now, updated_at: now },
      { category_id: 101, question: '¿Diferencia entre Alpaca y Baby Alpaca?', answer: 'Baby Alpaca es la fibra más fina (19-22 micras).', order: 1, created_at: now, updated_at: now },
      { category_id: 101, question: '¿Cómo lavar mi prenda?', answer: 'Lavado a mano con agua fría y jabón neutro.', order: 2, created_at: now, updated_at: now },
      { category_id: 102, question: '¿Envíos internacionales?', answer: 'Sí, a más de 50 países. 5-12 días hábiles.', order: 1, created_at: now, updated_at: now },
      { category_id: 102, question: '¿Cómo rastrear mi pedido?', answer: 'Recibirá un correo con número de guía único.', order: 2, created_at: now, updated_at: now },
      { category_id: 103, question: '¿Política de devoluciones?', answer: '30 días posteriores a la recepción.', order: 1, created_at: now, updated_at: now },
      { category_id: 103, question: '¿Garantía?', answer: '6 meses contra defectos de fabricación.', order: 2, created_at: now, updated_at: now },
    ]);
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
