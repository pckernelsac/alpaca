import CheckoutStepper from '@/components/ecommerce/CheckoutStepper/CheckoutStepper';
import PaymentMethod from '@/components/ecommerce/PaymentMethod/PaymentMethod';
import OrderSummary from '@/components/ecommerce/OrderSummary/OrderSummary';
import styles from './Payment.module.css';

const sampleItems = [
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNT45JzTstRfLchE9s2NjYgITblr5bvTTqfqOJ60RAgrmfV_S1iouPYF4SzguoNku4YzmV16oeQHChJcK6uAItOIrLT0JiLxs6rSQLo0H7mKrgHg_qst-4--u-piSX958TlVsMVknOR3gX4Cs8ZWqAdVDg4QFPTd9g-rvAte9_MjM4cRbbKvmtWYU4h5sZOEUKgPCaB8b2b3uRYl-NPrzv9CPIfX02QkjctffnNKNxeim8obzRBYVVReqDojjS8aRVrmdzyEVM9VJx', title: 'Manta Heritage', quantity: 1, price: 450 },
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4n22k8vaz3jbgzArgTLAIbOQXNwEJ9rjWGypwC2aErfr4iDORmPpmf4ZDc1fT7UtakaMwrflZt0vYcTyy5Eo94u-NcMESWYl3nRlbY98wDoxdzefSBFqdGfuu7v1GAiyP5C8--9VoWE_w8bpAeF1VbhMp8oW5UJfgVv7Ykf6s978ReO-zc3ZmhUb6YhWD0wma8Q4ZHEyHlX8ZDwE5cszpdxnnXDEBir_Tbw82vGVcJyUk9COvMSa6gjtTvzdNg_9KiNbmvSolS-3H', title: 'Bufanda de Alpaca Real', quantity: 2, price: 395 },
];
const subtotal = sampleItems.reduce((s, i) => s + i.price * i.quantity, 0);

export default function Payment() {
  return (
    <div className={styles.wrapper}>
      <CheckoutStepper currentStep={3} />
      <div className={styles.grid}>
        <div className={styles.formCol}>
          <PaymentMethod onSubmit={(data) => console.log('Payment:', data)} />
        </div>
        <aside className={styles.summaryCol}>
          <OrderSummary items={sampleItems} subtotal={subtotal} total={subtotal} />
        </aside>
      </div>
    </div>
  );
}