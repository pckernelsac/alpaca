import { lazy } from 'react';

const Login = lazy(() => import('@pages/Login/Login'));
const Dashboard = lazy(() => import('@pages/Dashboard/Dashboard'));
const CatalogDashboard = lazy(() => import('@pages/CatalogDashboard/CatalogDashboard'));
const ProductList = lazy(() => import('@pages/ProductList/ProductList'));
const ProductCreate = lazy(() => import('@pages/ProductCreate/ProductCreate'));
const ProductMedia = lazy(() => import('@pages/ProductMedia/ProductMedia'));
const VariantList = lazy(() => import('@pages/VariantList/VariantList'));
const VariantCreate = lazy(() => import('@pages/VariantCreate/VariantCreate'));
const OrderDashboard = lazy(() => import('@pages/OrderDashboard/OrderDashboard'));
const OrderList = lazy(() => import('@pages/OrderList/OrderList'));
const CrmDashboard = lazy(() => import('@pages/CrmDashboard/CrmDashboard'));
const ClientList = lazy(() => import('@pages/ClientList/ClientList'));
const ClientCreate = lazy(() => import('@pages/ClientCreate/ClientCreate'));
const ClientProfile = lazy(() => import('@pages/ClientProfile/ClientProfile'));
const PaymentDashboard = lazy(() => import('@pages/PaymentDashboard/PaymentDashboard'));
const TransactionList = lazy(() => import('@pages/TransactionList/TransactionList'));
const InventoryDashboard = lazy(() => import('@pages/InventoryDashboard/InventoryDashboard'));
const StockList = lazy(() => import('@pages/StockList/StockList'));
const KardexPage = lazy(() => import('@pages/KardexPage/KardexPage'));
const MovementList = lazy(() => import('@pages/MovementList/MovementList'));
const LogisticsDashboard = lazy(() => import('@pages/LogisticsDashboard/LogisticsDashboard'));
const ShipmentList = lazy(() => import('@pages/ShipmentList/ShipmentList'));
const MarketingDashboard = lazy(() => import('@pages/MarketingDashboard/MarketingDashboard'));
const CampaignList = lazy(() => import('@pages/CampaignList/CampaignList'));
const CmsDashboard = lazy(() => import('@pages/CmsDashboard/CmsDashboard'));
const ContentList = lazy(() => import('@pages/ContentList/ContentList'));
const TextileDashboard = lazy(() => import('@pages/TextileDashboard/TextileDashboard'));
const TransferList = lazy(() => import('@pages/TransferList/TransferList'));
const TextileVariantList = lazy(() => import('@pages/TextileVariantList/TextileVariantList'));
const UserList = lazy(() => import('@pages/UserList/UserList'));
const UserCreate = lazy(() => import('@pages/UserCreate/UserCreate'));
const RoleList = lazy(() => import('@pages/RoleList/RoleList'));
const PermissionMatrix = lazy(() => import('@pages/PermissionMatrix/PermissionMatrix'));
const MyProfile = lazy(() => import('@pages/MyProfile/MyProfile'));
const AnalyticsPage = lazy(() => import('@pages/AnalyticsPage/AnalyticsPage'));
const AuditLog = lazy(() => import('@pages/AuditLog/AuditLog'));
const SettingsPage = lazy(() => import('@pages/Settings/Settings'));
const MasterData = lazy(() => import('@pages/MasterData/MasterData'));
const OrderDetail = lazy(() => import('@pages/OrderDetail/OrderDetail'));
const OrderTimeline = lazy(() => import('@pages/OrderTimeline/OrderTimeline'));
const NotFound = lazy(() => import('@pages/NotFound/NotFound'));

export const routes = [
  { path: '/login', element: <Login />, layout: 'auth', protected: false },
  { path: '/', element: <Dashboard />, layout: 'admin', protected: true },
  { path: '/catalog', element: <CatalogDashboard />, layout: 'admin', protected: true },
  { path: '/catalog/productos', element: <ProductList />, layout: 'admin', protected: true },
  { path: '/catalog/productos/nuevo', element: <ProductCreate />, layout: 'admin', protected: true },
  { path: '/catalog/productos/multimedia', element: <ProductMedia />, layout: 'admin', protected: true },
  { path: '/catalog/variantes', element: <VariantList />, layout: 'admin', protected: true },
  { path: '/catalog/variantes/nueva', element: <VariantCreate />, layout: 'admin', protected: true },
  { path: '/orders', element: <OrderDashboard />, layout: 'admin', protected: true },
  { path: '/orders/list', element: <OrderList />, layout: 'admin', protected: true },
  { path: '/pedidos/detalle', element: <OrderDetail />, layout: 'admin', protected: true },
  { path: '/pedidos/seguimiento', element: <OrderTimeline />, layout: 'admin', protected: true },
  { path: '/crm', element: <CrmDashboard />, layout: 'admin', protected: true },
  { path: '/crm/clientes', element: <ClientList />, layout: 'admin', protected: true },
  { path: '/crm/clientes/nuevo', element: <ClientCreate />, layout: 'admin', protected: true },
  { path: '/crm/clientes/perfil', element: <ClientProfile />, layout: 'admin', protected: true },
  { path: '/payments', element: <PaymentDashboard />, layout: 'admin', protected: true },
  { path: '/payments/transactions', element: <TransactionList />, layout: 'admin', protected: true },
  { path: '/inventory', element: <InventoryDashboard />, layout: 'admin', protected: true },
  { path: '/inventory/stock', element: <StockList />, layout: 'admin', protected: true },
  { path: '/inventory/kardex', element: <KardexPage />, layout: 'admin', protected: true },
  { path: '/inventory/movements', element: <MovementList />, layout: 'admin', protected: true },
  { path: '/logistics', element: <LogisticsDashboard />, layout: 'admin', protected: true },
  { path: '/logistics/envios', element: <ShipmentList />, layout: 'admin', protected: true },
  { path: '/marketing', element: <MarketingDashboard />, layout: 'admin', protected: true },
  { path: '/marketing/campanas', element: <CampaignList />, layout: 'admin', protected: true },
  { path: '/cms', element: <CmsDashboard />, layout: 'admin', protected: true },
  { path: '/cms/contenido', element: <ContentList />, layout: 'admin', protected: true },
  { path: '/textile', element: <TextileDashboard />, layout: 'admin', protected: true },
  { path: '/textile/transferencias', element: <TransferList />, layout: 'admin', protected: true },
  { path: '/textil/variantes', element: <TextileVariantList />, layout: 'admin', protected: true },
  { path: '/usuarios', element: <UserList />, layout: 'admin', protected: true },
  { path: '/usuarios/nuevo', element: <UserCreate />, layout: 'admin', protected: true },
  { path: '/usuarios/roles', element: <RoleList />, layout: 'admin', protected: true },
  { path: '/usuarios/permisos', element: <PermissionMatrix />, layout: 'admin', protected: true },
  { path: '/mi-perfil', element: <MyProfile />, layout: 'admin', protected: true },
  { path: '/analytics', element: <AnalyticsPage />, layout: 'admin', protected: true },
  { path: '/audit', element: <AuditLog />, layout: 'admin', protected: true },
  { path: '/settings', element: <SettingsPage />, layout: 'admin', protected: true },
  { path: '/datos-maestros', element: <MasterData />, layout: 'admin', protected: true },
  { path: '*', element: <NotFound />, layout: 'main', protected: false },
];
