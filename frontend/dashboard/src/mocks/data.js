// Mock data centralizado para todo el Dashboard
// Todas las páginas deben importar desde aquí, nunca declarar datos inline

export const dashboardKpis = {
  dailySales: '$12,540', monthlySales: '$340,200', newCustomers: 42,
  unitsSold: 1248, pendingOrders: 15, completedOrders: 128,
  criticalItems: 8, revenueYTD: '$2.4M',
};

export const recentOrders = [
  { id: '#ORD-0092', client: 'Boutique Textiles Lima', amount: 1840.50, status: 'shipped', date: '2024-01-15' },
  { id: '#ORD-0091', client: 'Andean Textiles Ltd.', amount: 4250, status: 'processing', date: '2024-01-14' },
  { id: '#ORD-0090', client: 'Luxe Modas Paris', amount: 12400, status: 'delivered', date: '2024-01-12' },
  { id: '#ORD-0089', client: 'Sartorial Design NY', amount: 3100, status: 'delivered', date: '2024-01-10' },
  { id: '#ORD-0088', client: 'Karl Völler Knitwear', amount: 890, status: 'cancelled', date: '2024-01-08' },
];

export const dashboardAlerts = [
  { type: 'stock', message: 'Stock crítico: Manta Imperial Gold (3 unidades)', severity: 'high' },
  { type: 'logistics', message: 'Envío DHL-88492-ALP retrasado en aduana', severity: 'medium' },
  { type: 'promotion', message: 'Promoción "Colección Invierno" vence en 7 días', severity: 'low' },
];

export const products = [
  { id: 'P001', name: 'Manta Imperial Gold', sku: 'ALP-INV-24-001', category: 'Hogar', status: 'active', stock: 428, price: 450 },
  { id: 'P002', name: 'Bufanda de Vicuña', sku: 'ALP-INV-24-002', category: 'Accesorios', status: 'active', stock: 50, price: 850 },
  { id: 'P003', name: 'Chompa de Alpaca Real', sku: 'ALP-SWT-001', category: 'Indumentaria', status: 'active', stock: 120, price: 420 },
  { id: 'P004', name: 'Poncho Andino Bruma', sku: 'ALP-PNC-001', category: 'Indumentaria', status: 'active', stock: 25, price: 1250 },
  { id: 'P005', name: 'Abrigo Heritage', sku: 'ALP-ABR-001', category: 'Abrigos', status: 'active', stock: 15, price: 8450 },
  { id: 'P006', name: 'Gorro Montana de Alpaca', sku: 'ALP-ACC-001', category: 'Accesorios', status: 'active', stock: 200, price: 120 },
  { id: 'P007', name: 'Chalina de Alpaca Real', sku: 'ALP-CHL-001', category: 'Accesorios', status: 'active', stock: 85, price: 320 },
  { id: 'P008', name: 'Poncho Tradicional', sku: 'ALP-PNC-002', category: 'Indumentaria', status: 'draft', stock: 0, price: 680 },
];

export const users = [
  { id: 1, name: 'Mateo Quispe', email: 'mateo.q@alpacart.com', role: 'Super Administrador', department: 'Producción', status: 'active' },
  { id: 2, name: 'Sofía Mendoza', email: 'sofia.m@alpacart.com', role: 'Super Administrador', department: 'Logística', status: 'active' },
  { id: 3, name: 'Carlos Huamán', email: 'carlos.h@alpacart.com', role: 'Analista Financiero', department: 'Ventas', status: 'suspended' },
  { id: 4, name: 'Elena Arrieta', email: 'elena.a@alpacart.com', role: 'Editor', department: 'Marketing', status: 'inactive' },
  { id: 5, name: 'Roberto Paredes', email: 'r.paredes@alpacart.com', role: 'Analista Financiero', department: 'Finanzas', status: 'active' },
];

export const roles = [
  { id: 1, name: 'Super Administrador', category: 'critical', users: 2, permissions: 12, status: 'active' },
  { id: 2, name: 'Gestor de Producción', category: 'operational', users: 1, permissions: 8, status: 'active' },
  { id: 3, name: 'Analista Financiero', category: 'administrative', users: 2, permissions: 6, status: 'active' },
  { id: 4, name: 'Consultor Temporal', category: 'external', users: 1, permissions: 3, status: 'inactive' },
];

export const orders = [
  { id: 'ORD-2024-0892', customer: 'Luxe Modas Paris', date: '2024-01-15', status: 'shipped', total: 4250, items: 3, channel: 'showroom' },
  { id: 'ORD-2024-0891', customer: 'Boutique Textiles Lima', date: '2024-01-14', status: 'processing', total: 1840.50, items: 2, channel: 'online' },
  { id: 'ORD-2024-0890', customer: 'Sartorial Design NY', date: '2024-01-12', status: 'delivered', total: 12400, items: 1, channel: 'wholesale' },
  { id: 'ORD-2024-0889', customer: 'Andean Textiles Ltd.', date: '2024-01-10', status: 'delivered', total: 3100, items: 1, channel: 'online' },
  { id: 'ORD-2024-0888', customer: 'Karl Völler Knitwear', date: '2024-01-08', status: 'cancelled', total: 890, items: 1, channel: 'wholesale' },
  { id: 'ORD-2024-0887', customer: 'Boutique Textiles Lima', date: '2024-01-07', status: 'pending', total: 2150, items: 2, channel: 'online' },
];

export const clients = [
  { id: 'CLI-001', name: 'Andean Textiles Ltd.', company: 'Exportaciones Peruanas S.A.C.', type: 'wholesale', status: 'active', orders: 12, spent: 28500 },
  { id: 'CLI-002', name: 'Boutique Textiles Lima', company: 'Boutique Textiles E.I.R.L.', type: 'retail', status: 'active', orders: 8, spent: 12400 },
  { id: 'CLI-003', name: 'Sartorial Design NY', company: 'Sartorial Design Inc.', type: 'wholesale', status: 'vip', orders: 24, spent: 89200 },
  { id: 'CLI-004', name: 'Luxe Modas Paris', company: 'Luxe Modas S.A.S.', type: 'corporate', status: 'active', orders: 6, spent: 32100 },
  { id: 'CLI-005', name: 'Karl Völler Knitwear', company: 'Karl Völler GmbH', type: 'wholesale', status: 'active', orders: 15, spent: 45600 },
];

export const transactions = [
  { id: 'TXN-001', order: '#ORD-0892', client: 'Luxe Modas Paris', method: 'Transferencia', amount: 4250, status: 'completed', date: '2024-01-15' },
  { id: 'TXN-002', order: '#ORD-0891', client: 'Boutique Textiles Lima', method: 'Visa', amount: 1840.50, status: 'completed', date: '2024-01-14' },
  { id: 'TXN-003', order: '#ORD-0890', client: 'Sartorial Design NY', method: 'Transferencia', amount: 12400, status: 'completed', date: '2024-01-12' },
  { id: 'TXN-004', order: '#ORD-0889', client: 'Andean Textiles Ltd.', method: 'Visa', amount: 3100, status: 'pending', date: '2024-01-10' },
  { id: 'TXN-005', order: '#ORD-0888', client: 'Karl Völler Knitwear', method: 'PayPal', amount: 890, status: 'failed', date: '2024-01-08' },
];

export const campaigns = [
  { id: 1, name: 'Lanzamiento Invierno 2024', status: 'activa', budget: 12400, roi: '4.2x', channel: 'EMAIL + WEB' },
  { id: 2, name: 'Campaña de Retención', status: 'activa', budget: 6500, roi: '2.8x', channel: 'SOCIAL ADS' },
  { id: 3, name: 'Lanzamiento Primavera', status: 'programada', budget: 8900, roi: '-', channel: 'EMAIL + WEB' },
  { id: 4, name: 'Reactivación Otoño', status: 'finalizada', budget: 3200, roi: '1.1x', channel: 'AUTOMATIZACIÓN' },
  { id: 5, name: 'Black Friday Textil', status: 'borrador', budget: 15000, roi: '-', channel: 'SOCIAL ADS' },
];

export const contents = [
  { id: 1, title: 'Winter Alpaca Essentials 2024', type: 'Colección', status: 'published', author: 'Admin', date: '2024-01-10' },
  { id: 2, title: 'Historia de la Fibra de Alpaca', type: 'Blog', status: 'published', author: 'Admin', date: '2024-01-08' },
  { id: 3, title: 'Cuidado de Prendas Premium', type: 'Página', status: 'published', author: 'Admin', date: '2024-01-05' },
  { id: 4, title: 'Banner Inicio Invierno 2024', type: 'Banner', status: 'draft', author: 'Admin', date: '2024-01-03' },
  { id: 5, title: 'Guía de Tallas de Alpaca', type: 'FAQ', status: 'draft', author: 'Admin', date: '2024-01-01' },
];

export const auditLogs = [
  { id: 1, user: 'Mateo Quispe', action: 'create', module: 'IAM', description: 'Creó nuevo usuario: Elena Arrieta', severity: 'success', ip: '192.168.1.45', date: '2024-01-15' },
  { id: 2, user: 'Mateo Quispe', action: 'update', module: 'Inventario', description: 'Actualizó stock de Manta Imperial Gold', severity: 'info', ip: '192.168.1.45', date: '2024-01-14' },
  { id: 3, user: 'Sofía Mendoza', action: 'login', module: 'IAM', description: 'Inicio de sesión exitoso', severity: 'success', ip: '10.0.0.22', date: '2024-01-14' },
  { id: 4, user: 'Roberto Paredes', action: 'update', module: 'Finanzas', description: 'Generó reporte financiero Q3', severity: 'info', ip: '192.168.1.100', date: '2024-01-13' },
  { id: 5, user: 'Carlos Huamán', action: 'delete', module: 'Catálogo', description: 'Intento de eliminar producto bloqueado', severity: 'warning', ip: '10.0.0.50', date: '2024-01-12' },
];

export const shipments = [
  { id: 'SHP-001', waybill: 'DHL-88492-ALP', order: '#ORD-0892', carrier: 'DHL Express', origin: 'Lima, PE', destination: 'Paris, FR', status: 'in_transit', date: '2024-01-15' },
  { id: 'SHP-002', waybill: 'FEDEX-77123-ALP', order: '#ORD-0890', carrier: 'FedEx', origin: 'Cusco, PE', destination: 'New York, US', status: 'delivered', date: '2024-01-10' },
  { id: 'SHP-003', waybill: 'OLVA-66234-ALP', order: '#ORD-0889', carrier: 'Olva', origin: 'Lima, PE', destination: 'Lima, PE', status: 'delivered', date: '2024-01-08' },
];
export const carriers = [{ id: 1, name: 'DHL Express', code: 'DHL', active: true }, { id: 2, name: 'FedEx International', code: 'FEDEX', active: true }, { id: 3, name: 'Olva Courier', code: 'OLVA', active: true }];
export const textileVariants = [
  { id: 1, sku: 'ALP-INV-24-001-V1', product: 'Manta Imperial Gold', material: 'Alpaca Real', color: 'Dorado Imperial', size: '150x200', season: 'Invierno', status: 'active' },
  { id: 2, sku: 'ALP-SWT-001-V1', product: 'Chompa de Alpaca Real', material: 'Baby Alpaca', color: 'Café Oscuro', size: 'M', season: 'Invierno', status: 'active' },
  { id: 3, sku: 'ALP-ABR-001-V1', product: 'Abrigo Heritage', material: 'Vicuña', color: 'Noche', size: 'L', season: 'Otoño', status: 'active' },
];
export const warehouses = [
  { id: 1, name: 'Lima Central', code: 'LIM', city: 'Lima', type: 'principal', totalItems: 5000 },
  { id: 2, name: 'Cusco Hilados', code: 'CUZ', city: 'Cusco', type: 'production', totalItems: 1200 },
  { id: 3, name: 'Arequipa Tintorería', code: 'AQP', city: 'Arequipa', type: 'secondary', totalItems: 800 },
];

export const stockItems = [
  { id: 1, name: 'Manta Imperial Gold', sku: 'ALP-INV-24-001', category: 'Hogar', quantity: 428, reserved: 12, minStock: 50, warehouse: 'Lima', status: 'ok' },
  { id: 2, name: 'Bufanda de Vicuña', sku: 'ALP-INV-24-002', category: 'Accesorios', quantity: 50, reserved: 5, minStock: 20, warehouse: 'Lima', status: 'ok' },
  { id: 3, name: 'Chompa de Alpaca Real', sku: 'ALP-SWT-001', category: 'Indumentaria', quantity: 120, reserved: 8, minStock: 30, warehouse: 'Cusco', status: 'ok' },
  { id: 4, name: 'Abrigo Heritage', sku: 'ALP-ABR-001', category: 'Abrigos', quantity: 15, reserved: 2, minStock: 5, warehouse: 'Lima', status: 'low' },
  { id: 5, name: 'Gorro Montana', sku: 'ALP-ACC-001', category: 'Accesorios', quantity: 200, reserved: 15, minStock: 50, warehouse: 'Arequipa', status: 'ok' },
  { id: 6, name: 'Poncho Andino Bruma', sku: 'ALP-PNC-001', category: 'Indumentaria', quantity: 0, reserved: 0, minStock: 10, warehouse: 'Cusco', status: 'out' },
];
