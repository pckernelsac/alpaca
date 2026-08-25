'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Categories
    await queryInterface.bulkInsert('categories', [
      { name: 'Ponchos', slug: 'ponchos', description: 'Ponchos elaborados con la mejor fibra de alpaca peruana.' },
      { name: 'Chompas', slug: 'chompas', description: 'Chompas y cardigans de alpaca para todas las temporadas.' },
      { name: 'Bufandas', slug: 'bufandas', description: 'Bufandas y chalinas de alpaca con diseños exclusivos.' },
      { name: 'Accesorios', slug: 'accesorios', description: 'Accesorios de alpaca: gorros, mitones y más.' },
      { name: 'Abrigos', slug: 'abrigos', description: 'Abrigos y overcoats de vicuña y alpaca real.' },
      { name: 'Mantas', slug: 'mantas', description: 'Mantas y throws de alpaca para el hogar.' },
      { name: 'Chalinas', slug: 'chalinas', description: 'Chalinas de alpaca tejidas a mano.' },
      { name: 'Materiales', slug: 'materials', description: 'Fibras y materiales textiles de alpaca.' },
      { name: 'Nuevos Ingresos', slug: 'nuevos', description: 'Últimos lanzamientos de la temporada.' },
      { name: 'Ofertas', slug: 'ofertas', description: 'Productos con descuento por cambio de temporada.' },
      { name: 'Mujer', slug: 'women', description: 'Prendas de alpaca para mujer.' },
      { name: 'Hombre', slug: 'men', description: 'Prendas de alpaca para hombre.' },
    ]);

    // Collections
    await queryInterface.bulkInsert('collections', [
      { id: 'AG-2024', name: 'Oro de los Andes', piece_count: 42, description: 'Inspirada en la primera luz que toca los picos del Cusco. Colección de tejidos exclusivos mezclados con vicuña.', season_id: 1, active: true },
      { id: 'HE-BASE', name: 'Esenciales Heritage', piece_count: 28, description: 'La base de un guardarropa exigente. Siluetas atemporales diseñadas para perdurar generaciones.', season_id: 1, active: true },
      { id: 'AS-HAND', name: 'La Serie Artesanal', piece_count: 15, description: 'Un homenaje al telar manual. Cada pieza lleva la firma única del tejedor.', season_id: 2, active: true },
      { id: 'SS-ECO', name: 'Alma Sostenible', piece_count: 22, description: 'Fibras puras sin teñir que respetan la tierra. Espectro natural de la alpaca.', season_id: 2, active: true },
    ]);

    // Products
    const products = [
      { id: 'a0000001-0000-0000-0000-000000000001', sku: 'ALP-INV-24-001', name: 'Manta Imperial Gold', material: '100% Baby Alpaca', category_id: 6, collection_id: 'AG-2024', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000002', sku: 'ALP-INV-24-002', name: 'Bufanda de Vicuña', material: '100% Vicuña', category_id: 3, collection_id: 'AG-2024', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000003', sku: 'ALP-SWT-001', name: 'Chompa de Alpaca Real', material: 'Royal Alpaca', category_id: 2, collection_id: 'HE-BASE', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000004', sku: 'ALP-PNC-001', name: 'Poncho Andino Bruma', material: 'Mezcla de Vicuña', category_id: 1, collection_id: 'AS-HAND', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000005', sku: 'ALP-ABR-001', name: 'Abrigo Heritage', material: '100% Vicuña', category_id: 5, collection_id: 'HE-BASE', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000006', sku: 'ALP-ACC-001', name: 'Gorro Montana de Alpaca', material: 'Baby Alpaca', category_id: 4, collection_id: 'SS-ECO', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000007', sku: 'ALP-CHL-001', name: 'Chalina de Alpaca Real', material: '100% Alpaca Real', category_id: 7, collection_id: 'AS-HAND', status: 'active' },
      { id: 'a0000001-0000-0000-0000-000000000008', sku: 'ALP-MNT-002', name: 'Manta de Baby Alpaca', material: '100% Baby Alpaca', category_id: 6, collection_id: 'SS-ECO', status: 'active' },
    ];
    await queryInterface.bulkInsert('products', products);

    // Product Variants
    const variants = [];
    const sizeIds = { XS: 1, S: 2, M: 3, L: 4, XL: 5 };
    const colors = [
      { hex: '#D4AF37', name: 'Dorado Inca' },
      { hex: '#2F2A25', name: 'Gris Carbón' },
      { hex: '#F5F1EC', name: 'Crema Natural' },
      { hex: '#8B6B3F', name: 'Marrón Tierra' },
    ];
    let vSku = 1;
    for (const p of products) {
      const color = colors[(vSku - 1) % colors.length];
      const size = ['OS', 'OS', 'M', 'L', 'M', 'OS', 'OS', 'OS'][vSku - 1] || 'M';
      const sid = sizeIds[size] || 7;
      variants.push({
        id: `b0000001-0000-0000-0000-${String(vSku).padStart(12, '0')}`,
        product_id: p.id,
        sku: `${p.sku}-${color.name.substring(0, 3).toUpperCase()}-${size}`,
        color_hex: color.hex,
        color_name: color.name,
        size_id: sid,
        material_id: Math.min(vSku, 6),
        price: [450, 850, 420, 1250, 8450, 120, 320, 450][vSku - 1],
        stock: [428, 50, 120, 25, 15, 200, 80, 150][vSku - 1],
        status: 'active',
      });
      vSku++;
    }
    await queryInterface.bulkInsert('product_variants', variants);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('product_variants', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('collections', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};
