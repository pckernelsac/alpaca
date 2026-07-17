'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Fiber Materials
    await queryInterface.bulkInsert('fiber_materials', [
      { name: 'Baby Alpaca', category: 'Natural', micron_rating: '16.5', origin: 'Puno, Perú', certification: 'WPA 100%', description: 'Fibra premium de alpaca baby de calidad superior.', active: true },
      { name: 'Vicuña', category: 'Premium', micron_rating: '12.5', origin: 'Cusco, Perú', certification: 'CITES Certified', description: 'La fibra más fina y exclusiva del mundo.', active: true },
      { name: 'Royal Alpaca', category: 'Natural', micron_rating: '18.5', origin: 'Arequipa, Perú', certification: 'WPA', description: 'Alpaca real de alta calidad con suavidad excepcional.', active: true },
      { name: 'Suri', category: 'Natural', micron_rating: '22', origin: 'Puno, Perú', certification: 'WPA', description: 'Fibra sedosa de alpaca Suri con caída única.', active: true },
      { name: 'Alpaca / Seda Mix', category: 'Blend', micron_rating: '19', origin: 'Cusco, Perú', certification: '', description: 'Mezcla de alpaca con seda para mayor brillo.', active: true },
      { name: '100% Baby Alpaca', category: 'Natural', micron_rating: '16.5', origin: 'Puno, Perú', certification: 'WPA 100%', description: 'Baby alpaca pura con certificación de trazabilidad.', active: true },
    ]);

    // Colors
    await queryInterface.bulkInsert('textile_colors', [
      { name: 'Dorado Inca', hex: '#D4AF37', pantone: 'PMS-871C', active: true },
      { name: 'Marrón Tierra', hex: '#8B6B3F', pantone: 'PMS-465C', active: true },
      { name: 'Crema Natural', hex: '#F5F1EC', pantone: '', active: true },
      { name: 'Gris Carbón', hex: '#2F2A25', pantone: 'PMS-426C', active: true },
      { name: 'Oro Antiguo', hex: '#C79A4B', pantone: 'PMS-4655C', active: true },
      { name: 'Blanco Nube', hex: '#FAF8F5', pantone: '', active: true },
      { name: 'Terracota', hex: '#B86F52', pantone: 'PMS-7526C', active: true },
      { name: 'Azul Profundo', hex: '#1B3A5C', pantone: 'PMS-296C', active: true },
      { name: 'Verde Bosque', hex: '#2D5A3F', pantone: 'PMS-3435C', active: true },
      { name: 'Borgoña', hex: '#722F37', pantone: 'PMS-7420C', active: true },
    ]);

    // Sizes
    await queryInterface.bulkInsert('textile_sizes', [
      { name: 'XS', category: 'adult', order: 1 },
      { name: 'S', category: 'adult', order: 2 },
      { name: 'M', category: 'adult', order: 3 },
      { name: 'L', category: 'adult', order: 4 },
      { name: 'XL', category: 'adult', order: 5 },
      { name: 'XXL', category: 'adult', order: 6 },
      { name: 'OS', category: 'one-size', order: 7 },
      { name: 'KING', category: 'home', order: 8 },
    ]);

    // Seasons
    await queryInterface.bulkInsert('seasons', [
      { name: 'Invierno 2024', start_month: 3, end_month: 9, active: true },
      { name: 'Primavera 2024', start_month: 9, end_month: 12, active: true },
      { name: 'Verano 2024', start_month: 12, end_month: 3, active: false },
      { name: 'Otoño 2024', start_month: 3, end_month: 6, active: false },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('seasons', null, {});
    await queryInterface.bulkDelete('textile_sizes', null, {});
    await queryInterface.bulkDelete('textile_colors', null, {});
    await queryInterface.bulkDelete('fiber_materials', null, {});
  },
};
