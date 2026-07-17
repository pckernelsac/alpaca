export const kpiData = [
  { id: 1, icon: 'payments', label: 'Daily Sales', value: '$12,540', trend: { value: '+8.2%', isUp: true, label: 'vs ayer' }, color: 'primary' },
  { id: 2, icon: 'calendar_month', label: 'Monthly Sales', value: '$340,200', trend: { value: '+12.4%', isUp: true, label: 'vs prev. mes' }, color: 'primary' },
  { id: 3, icon: 'person_add', label: 'New Customers', value: '42', subtitle: 'High loyalty potential', color: 'primary' },
  { id: 4, icon: 'inventory', label: 'Units Sold', value: '1,248', subtitle: 'Aprox. 2.1 tons processed', color: 'primary' },
  { id: 5, icon: 'pending_actions', label: 'Pending Orders', value: '15', subtitle: 'Waiting for production', color: 'secondary' },
  { id: 6, icon: 'task_alt', label: 'Completed Orders', value: '128', subtitle: 'Fulfilled this month', color: 'tertiary' },
  { id: 7, icon: 'inventory_2', label: 'Critical Items', value: '8', subtitle: 'Action required', color: 'error' },
  { id: 8, icon: 'account_balance', label: 'Revenue YTD', value: '$2.4M', subtitle: 'Target: $3.0M', color: 'primary' },
];

export const alerts = [
  { id: 1, icon: 'warning', title: 'Stock crítico detectado', description: 'Fibra Premium Oro (2kg remaining)', color: 'error' },
  { id: 2, icon: 'local_shipping', title: 'Logística pendiente', description: '5 Pedidos listos para despacho', color: 'secondary' },
  { id: 3, icon: 'campaign', title: 'Promoción por vencer', description: 'Campaña Invierno expira en 48h', color: 'tertiary' },
];

export const chartDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const chartBarHeights = [50, 66, 75, 50, 100, 66, 83];

export const categories = [
  { name: 'Alpaca Premium', percent: 52, color: 'primary' },
  { name: 'Mezclas Orgánicas', percent: 28, color: 'secondary' },
  { name: 'Vicuña Exclusive', percent: 20, color: 'tertiary' },
];

export const paymentMethods = [
  { name: 'Stripe', percent: 74, icon: 'credit_card' },
  { name: 'Transfer', percent: 26, icon: 'account_balance' },
];

const initials = (name) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

export const recentOrders = [
  { id: '#ORD-4921', client: 'Luxe Modas Paris', amount: '$4,250.00', status: 'shipped', initials: initials('Luxe Modas') },
  { id: '#ORD-4920', client: 'Boutique Textiles Lima', amount: '$1,840.50', status: 'processing', initials: initials('Boutique Textiles') },
  { id: '#ORD-4919', client: 'Sartorial Design NY', amount: '$12,400.00', status: 'delivered', initials: initials('Sartorial Design') },
  { id: '#ORD-4918', client: 'Andean Heritage', amount: '$3,100.00', status: 'delivered', initials: initials('Andean Heritage') },
  { id: '#ORD-4917', client: 'Karl Völler Knitwear', amount: '$890.00', status: 'processing', initials: initials('Karl Völler') },
];

export const activities = [
  { icon: 'person_add', title: 'Nuevo cliente registrado:', highlight: 'Textile Corp Berlin', time: 'Hace 12 minutos', color: 'primary' },
  { icon: 'payments', title: 'Pago recibido de', highlight: '#ORD-4890 ($1,200)', time: 'Hace 45 minutos', color: 'tertiary' },
  { icon: 'local_shipping', title: 'Envío entregado a', highlight: 'Milano Fashions', time: 'Hace 2 horas', color: 'secondary' },
  { icon: 'inventory_2', title: 'Ajuste de inventario:', highlight: '+50kg Vicuña Natural', time: 'Ayer, 4:30 PM', color: 'primary' },
  { icon: 'history', title: 'Copia de seguridad del sistema completada', highlight: '', time: 'Ayer, 11:00 PM', color: 'muted' },
];

export const quickActions = [
  { icon: 'add_box', label: 'Nuevo Producto', desc: 'Catálogo textil', link: '/catalog/productos/nuevo' },
  { icon: 'receipt_long', label: 'Nuevo Pedido', desc: 'Venta mayorista', link: '/orders/nuevo' },
  { icon: 'person_add_alt', label: 'Nuevo Cliente', desc: 'Base de datos', link: '/crm/clientes/nuevo' },
  { icon: 'celebration', label: 'Nueva Promoción', desc: 'Campañas de mkt', link: '/marketing/campanas/nueva' },
];
