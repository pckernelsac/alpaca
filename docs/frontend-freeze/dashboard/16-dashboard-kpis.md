# Dashboard KPIs Audit

## Resumen
El Dashboard principal muestra un grid de 8 KPIs, gráfico de barras de ventas semanales, categorías top con progress bars, métodos de pago (donut visual), tabla de últimos pedidos, feed de actividad reciente y accesos rápidos. Todos los datos son hardcodeados desde `dashboardData.js`.

## Hallazgos
- MetricCard.jsx: componente genérico con icono, valor, título y subtítulo opcional
- KPICard.jsx: componente con acento de color, icono, label, valor, TrendIndicator y subtítulo
- TrendIndicator.jsx: indicador de tendencia hacia arriba/abajo con color
- ProgressCard.jsx: componente adicional de métricas con barra de progreso
- 8 KPIs en grid: Daily Sales, Monthly Sales, New Customers, Units Sold, Pending Orders, Completed Orders, Critical Items, Revenue YTD
- Bar chart "Histórico de Ventas" con 7 días, CSS heights hardcodeadas (50, 66, 75, 50, 100, 66, 83)
- Categorías Top con progress bars (52%, 28%, 20%)
- Métodos de Pago: donut visual con iconos (Stripe 74%, Transfer 26%)
- Tabla "Últimos Pedidos" con 5 filas hardcodeadas
- Actividad Reciente con 5 eventos hardcodeados
- Accesos Rápidos: 4 enlaces a páginas clave
- Selector de período (Hoy/Semana/Mes) visual, sin cambio real de datos

## Score: 80/100
