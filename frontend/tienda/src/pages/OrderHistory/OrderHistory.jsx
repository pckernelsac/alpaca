import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import OrderCard from '@/components/ecommerce/OrderCard/OrderCard';
import styles from './OrderHistory.module.css';

const orders = [
  { id: 'APC-982341', date: '18 oct 2024', status: 'shipped', total: 1570, items: [{ image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-raKaETQMX_9Gz8yPTCcLuTlQ8OcWfNuiOJ3w3c8lD6dmMCIhvQH6YdRr8-Vpbd1mDQfseWhd3xGNBHQzXqMHjCql4kVxqRjX7Gz-LpHrzg0Cr89JLXuzdW_ix22a5YtYQj0oq5ISlAgEsD6xNxmMCGCEEkT6vEMhSSAgYpq5OHWuBmWeCqrP6QtlPo9lZQp91pWU00UK6XxFree2Ua65IjCaLYfb0sprNP2K8exfqRa2iTlAkt0oLMU9Wq7-JapmMPzPpjApKzoJ' }, { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlPTmIcEExDUhtdH_vUTgTspihmFYRVsRKAXKQFRqKAzZvj3IInElWPVGWZD5cFjfssKQDWGc3cZjDlrJ107C43Un_ZKrtAhCB14pE9_utg1A4q4WFCBSCL_jrmDf3JcxTpHOYrbRti1ULK0S9-efRD1XO5BRWM8-mS3rBl9fZq7UyJU9BzCOlcyreWY9uOWacC9uzd4R_8eV92p4-D9aPe7HCZ3zym-pq0PU-TsSmGZi-5aHJBnH58bKoBZ0zFZ3NHPPpXGX4zsXr' }] },
  { id: 'APC-981203', date: '5 sep 2024', status: 'delivered', total: 8450, items: [{ image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlnw-7sdF7x1Y8IHL2BJQoHeXwn4887s7BRZ9s07m2xvmhGUdXAZncCPMHitGJJQnyZThFisM-2TBSq23oVHvxNKfz-oDfbtBMyrYKsvwwegq6eQqKTsygoElm-wam3Ou3PoSRPAwiWkiPeo0c0kzV1EJ0hKKn5O2qBuMctnEJHasQvyCtD2K2AWse8WdtuTRgJ-W7oZu8lJgqA5gytIzilvx2FqTpphfIAzpw_7a73KPSnFPeK4DOhusup5sqGpZYbOflA4rUGNX3' }] },
  { id: 'APC-980456', date: '22 jun 2024', status: 'cancelled', total: 280, items: [{ image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-rUq2ri35MTaLp6bCF1iiVu7J6A1cSC79Hhm93_La_mA5iqOMkLphG7FnTqo9rTSgarQabiBWeUqAZUaImc7hsu3zsoHNKcFpWbip3D7IsyuZ1zdpNjK8OoSOZGNmAidnnr6pTi9EC9_oDe7Vm2u7SlwZ_Dr58-FoqfCPvXNRo-ouvIwymfKk4fklgto3E1B007caz236tqWf07KeuDsBzzcQs9vCJQSQMLVjwk6AdYaqKCBy8oDFpBdbABjqLqsiovpgGA6KApsq' }] },
];

export default function OrderHistory() {
  return (
    <div className={styles.layout}>
      <ProfileMenu userName="Julianne" />
      <div className={styles.main}>
        <h1 className={styles.title}>Mis Pedidos</h1>
        <div className={styles.grid}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}