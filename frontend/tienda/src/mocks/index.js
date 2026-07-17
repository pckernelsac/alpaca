export const products = [
  { id: 1, title: 'Chompa de Alpaca Real', subtitle: '100% Baby Alpaca', price: 420, image: 'https://lh3.googleusercontent.com/aida-public/chompa-alpaca.jpg', badge: 'NUEVO', category: 'chompas', description: 'Chompa tejida con Baby Alpaca de primera calidad. Suavidad excepcional y calidez natural.', colors: ['#8B4513', '#2F4F4F', '#DEB887'], sizes: [{ label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }] },
  { id: 2, title: 'Bufanda de Vicuña', subtitle: 'Vicuña Premium', price: 850, image: 'https://lh3.googleusercontent.com/aida-public/bufanda-vicuna.jpg', badge: 'EDICIÓN LIMITADA', category: 'bufandas', description: 'La fibra más fina del mundo. Suavidad incomparable.', colors: ['#D2B48C', '#F5DEB3', '#8B7355'], sizes: [{ label: 'Único' }] },
  { id: 3, title: 'Poncho Andino Bruma', subtitle: 'Alpaca Suri', price: 1250, image: 'https://lh3.googleusercontent.com/aida-public/poncho-bruma.jpg', badge: undefined, category: 'ponchos', description: 'Poncho artesanal con diseño contemporáneo.', colors: ['#4682B4', '#708090', '#A0522D'], sizes: [{ label: 'Único' }] },
  { id: 4, title: 'Manta Imperial Gold', subtitle: 'Alpaca Real', price: 450, image: 'https://lh3.googleusercontent.com/aida-public/manta-gold.jpg', badge: 'MÁS VENDIDO', category: 'hogar', description: 'Manta decorativa de alpaca real. Tejido en telar manual.', colors: ['#DAA520', '#B8860B', '#F0E68C'], sizes: [{ label: '150x200' }, { label: '200x250' }] },
  { id: 5, title: 'Abrigo Heritage', subtitle: '100% Vicuña', price: 8450, image: 'https://lh3.googleusercontent.com/aida-public/abrigo-heritage.jpg', badge: 'COLECCIÓN', category: 'abrigos', description: 'Abrigo largo de vicuña. Edición limitada.', colors: ['#1a1a2e', '#3d3d5c'], sizes: [{ label: 'S' }, { label: 'M' }, { label: 'L' }] },
  { id: 6, title: 'Gorro Montana', subtitle: 'Alpaca Real', price: 120, image: 'https://lh3.googleusercontent.com/aida-public/gorro-montana.jpg', badge: undefined, category: 'accesorios', description: 'Gorro térmico de alpaca. Ideal para alta montaña.', colors: ['#CD853F', '#8B0000', '#2E8B57'], sizes: [{ label: 'Único' }] },
  { id: 7, title: 'Chalina de Alpaca Real', subtitle: 'Alpaca Suri', price: 320, image: 'https://lh3.googleusercontent.com/aida-public/chalina.jpg', badge: undefined, category: 'bufandas', description: 'Chalina ligera ideal para entretiempo.', colors: ['#DDA0DD', '#B0C4DE'], sizes: [{ label: 'Único' }] },
  { id: 8, title: 'Poncho Tradicional', subtitle: 'Alpaca Real', price: 680, image: 'https://lh3.googleusercontent.com/aida-public/poncho-tradicional.jpg', badge: undefined, category: 'ponchos', description: 'Poncho tradicional andino con diseño clásico.', colors: ['#800020', '#191970'], sizes: [{ label: 'Único' }] },
];

export const categoryNames = {
  ponchos: { name: 'Ponchos', desc: 'Ponchos de alpaca y vicuña tejidos en telar manual' },
  chompas: { name: 'Chompas', desc: 'Chompas y sweaters de alpaca real' },
  bufandas: { name: 'Bufandas y Chalinas', desc: 'Bufandas y chalinas de vicuña y alpaca' },
  accesorios: { name: 'Accesorios', desc: 'Gorros, guantes y accesorios de alpaca' },
  abrigos: { name: 'Abrigos', desc: 'Abrigos y overcoats de vicuña y alpaca' },
};

export const categoryProducts = (slug) => products.filter(p => p.category === slug || slug === 'all');

export const orders = [
  { id: 'APC-982341', date: '18 oct 2024', status: 'shipped', total: 1570, items: [{ image: products[0].image }] },
  { id: 'APC-982342', date: '15 oct 2024', status: 'delivered', total: 8450, items: [{ image: products[4].image }] },
  { id: 'APC-982343', date: '10 oct 2024', status: 'cancelled', total: 320, items: [{ image: products[6].image }] },
];

export const sampleUser = { firstName: 'Cliente', lastName: 'Alpacart', email: 'cliente@alpacart.com', phone: '+51 999 888 777', language: 'es', currency: 'USD', comms: true };

export const sampleAddresses = [
  { id: 1, name: 'Casa', street: 'Av. Larco 456, Dpto 301', city: 'Miraflores', state: 'Lima', zip: '15074', country: 'Perú', phone: '+51 999 888 777', isDefault: true },
  { id: 2, name: 'Oficina', street: 'Jr. Comercio 789, Of 502', city: 'San Isidro', state: 'Lima', zip: '15073', country: 'Perú', phone: '+51 999 888 777', isDefault: false },
];

export const trackingSteps = [
  { label: 'Pedido Realizado', date: '18 oct, 10:24', completed: true },
  { label: 'Preparación', date: '19 oct, 14:30', completed: true },
  { label: 'En Tránsito', date: 'En Ruta al Centro', active: true },
  { label: 'Entregado', date: '', completed: false },
];
