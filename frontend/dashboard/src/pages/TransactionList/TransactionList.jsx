import { useState } from 'react';
import styles from './TransactionList.module.css';

const kpiCards = [
  { label: 'Total Volume (MTD)', value: '$1.2M', trend: '12%', trendUp: true },
  { label: 'Success Rate', value: '98.4%', trend: '0.2%', trendUp: true },
  { label: 'Pending Payouts', value: '42', trend: 'Action Required', trendUp: null },
  { label: 'Avg. Transaction', value: '$4.5k', trend: 'Stable', trendUp: null },
];

const transactions = [
  { payId: '#PAY-9921', order: '#ORD-5542', initials: 'TC', client: 'Textiles Cusco S.A.C', bgColor: 'var(--color-secondary-fixed)', stripeId: 'pi_3N9xJ2L9e1Wz', method: 'Visa', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: 'Today, 10:45 AM', amount: '12,450.00', currency: 'USD' },
  { payId: '#PAY-9920', order: '#ORD-5541', initials: 'AL', client: 'Andean Luxury Fibers', bgColor: 'var(--color-primary-fixed)', stripeId: 'pi_3K1vA7L2d0Rt', method: 'Transfer', methodIcon: 'account_balance', status: 'Pendiente', statusClass: 'pending', statusColors: { bg: '#fef9c3', fg: '#854d0e' }, date: 'Today, 09:12 AM', amount: '8,200.50', currency: 'EUR' },
  { payId: '#PAY-9919', order: '#ORD-5540', initials: 'IV', client: 'Inca Valley Textiles', bgColor: 'var(--color-tertiary-fixed)', stripeId: 'pi_9Z4rD1P0f5Xm', method: 'PayPal', methodIcon: 'payments', status: 'Fallido', statusClass: 'failed', statusColors: { bg: '#fee2e2', fg: '#991b1b' }, date: 'Yesterday, 04:55 PM', amount: '45,000.00', currency: 'PEN' },
  { payId: '#PAY-9918', order: '#ORD-5539', initials: 'WW', client: 'World Wool Corp', bgColor: 'var(--color-secondary-fixed-dim)', stripeId: 'pi_1L0qH3S4a8Qz', method: 'Mastercard', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: 'Yesterday, 02:30 PM', amount: '18,120.00', currency: 'USD' },
  { payId: '#PAY-9917', order: '#ORD-5538', initials: 'PQ', client: 'Puna Quality Alpaca', bgColor: 'var(--color-primary-fixed-dim)', stripeId: 'pi_5G8vF9O1n3Bb', method: 'Amex', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: 'Yesterday, 11:15 AM', amount: '5,400.00', currency: 'USD' },
  { payId: '#PAY-9916', order: '#ORD-5537', initials: 'ST', client: 'Sierra Textiles', bgColor: 'var(--color-outline-variant)', stripeId: 'pi_4N2mK8J6v1Ll', method: 'Bank Transfer', methodIcon: 'account_balance', status: 'Reembolsado', statusClass: 'refunded', statusColors: { bg: 'var(--color-surface-variant)', fg: 'var(--color-on-surface-variant)' }, date: '2 days ago', amount: '1,250.00', currency: 'EUR' },
  { payId: '#PAY-9915', order: '#ORD-5536', initials: 'KF', client: 'Kuna Fabrics Ltd', bgColor: 'var(--color-secondary-fixed)', stripeId: 'pi_7X3pM0N4r9Ty', method: 'Visa', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: '2 days ago', amount: '22,900.00', currency: 'USD' },
  { payId: '#PAY-9914', order: '#ORD-5535', initials: 'MM', client: 'Misti Mill S.A.', bgColor: 'var(--color-tertiary-fixed)', stripeId: 'pi_2W8oH1F4d6Sn', method: 'PayPal', methodIcon: 'payments', status: 'Pendiente', statusClass: 'pending', statusColors: { bg: '#fef9c3', fg: '#854d0e' }, date: '3 days ago', amount: '3,140.00', currency: 'USD' },
  { payId: '#PAY-9913', order: '#ORD-5534', initials: 'AT', client: 'Altiplano Trading', bgColor: 'var(--color-primary-fixed)', stripeId: 'pi_0L4kK1J2h9Wq', method: 'Visa', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: '3 days ago', amount: '15,600.00', currency: 'PEN' },
  { payId: '#PAY-9912', order: '#ORD-5533', initials: 'SC', client: 'Soft Camelid Co.', bgColor: 'var(--color-secondary-fixed-dim)', stripeId: 'pi_8F2mS9X0v4Tt', method: 'Visa', methodIcon: 'credit_card', status: 'Completado', statusClass: 'succeeded', statusColors: { bg: '#dcfce7', fg: '#166534' }, date: '4 days ago', amount: '2,850.00', currency: 'USD' },
];

const methodBadgeMap = {
  Visa: { bg: '#dbeafe', fg: '#1e40af' },
  Mastercard: { bg: '#dbeafe', fg: '#1e40af' },
  Amex: { bg: '#dbeafe', fg: '#1e40af' },
  Transfer: { bg: '#e9d5ff', fg: '#7c3aed' },
  'Bank Transfer': { bg: '#e9d5ff', fg: '#7c3aed' },
  PayPal: { bg: '#fef9c3', fg: '#854d0e' },
};

export default function TransactionList() {
  const [page] = useState(1);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Gestión de Pagos</h2>
          <p className={styles.pageDesc}>Manage and audit all financial transactions across global channels</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnOutline}>
            <span className="material-symbols-outlined">download</span>
            Export CSV
          </button>
          <button className={styles.btnPrimary}>
            <span className="material-symbols-outlined">task_alt</span>
            Batch Approval
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className={styles.kpiCard}>
            <div className={styles.kpiAccent} />
            <div className={styles.kpiContent}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <h3 className={styles.kpiValue}>{kpi.value}</h3>
              {kpi.trendUp !== null ? (
                <div className={styles.kpiTrend} style={{ color: kpi.trendUp ? '#22c55e' : 'var(--color-on-surface-variant)' }}>
                  {kpi.trendUp ? (
                    <span className="material-symbols-outlined" style={{ fontSize: 14, marginRight: 2 }}>trending_up</span>
                  ) : null}
                  {kpi.trend}
                </div>
              ) : (
                <div className={styles.kpiTrend} style={{ color: 'var(--color-on-surface-variant)' }}>
                  {kpi.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date Range</label>
          <select className={styles.filterSelect}>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Fiscal Year 2024</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <select className={styles.filterSelect}>
            <option>All Statuses</option>
            <option>Succeeded</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Method</label>
          <select className={styles.filterSelect}>
            <option>All Methods</option>
            <option>Credit Card</option>
            <option>Bank Transfer</option>
            <option>PayPal</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Currency</label>
          <select className={styles.filterSelect}>
            <option>All Currencies</option>
            <option>USD - Dollars</option>
            <option>PEN - Soles</option>
            <option>EUR - Euros</option>
          </select>
        </div>
        <div className={styles.filterActions}>
          <button className={styles.filterClear}>Clear Filters</button>
          <button className={styles.filterApply}>Apply</button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Transacción</th>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Método</th>
                <th>Monto</th>
                <th>Moneda</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.payId} className={styles.tableRow}>
                  <td className={styles.tdId}>{tx.payId}</td>
                  <td className={styles.tdOrder}>{tx.order}</td>
                  <td>
                    <div className={styles.clientCell}>
                      <span className={styles.clientAvatar} style={{ backgroundColor: tx.bgColor }}>{tx.initials}</span>
                      <span>{tx.client}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={styles.methodBadge}
                      style={{
                        backgroundColor: methodBadgeMap[tx.method]?.bg || 'var(--color-surface-variant)',
                        color: methodBadgeMap[tx.method]?.fg || 'var(--color-on-surface-variant)',
                      }}
                    >
                      {tx.method}
                    </span>
                  </td>
                  <td className={styles.tdAmount}>{tx.amount}</td>
                  <td className={styles.tdCurrency}>{tx.currency}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{ backgroundColor: tx.statusColors.bg, color: tx.statusColors.fg }}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className={styles.tdDate}>{tx.date}</td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button className={styles.actionBtn} title="View">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button className={styles.actionBtn} title="History">
                        <span className="material-symbols-outlined">history</span>
                      </button>
                      <button className={styles.actionBtn} title="Refund">
                        <span className="material-symbols-outlined">undo</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>Showing 1-10 of 12,450 results</span>
          <div className={styles.paginationControls}>
            <button className={styles.pageBtn} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageBtn}>1245</button>
            <button className={styles.pageBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
