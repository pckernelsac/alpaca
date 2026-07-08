import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutStepper from '@/components/ecommerce/CheckoutStepper/CheckoutStepper';
import AddressForm from '@/components/ecommerce/AddressForm/AddressForm';
import OrderSummary from '@/components/ecommerce/OrderSummary/OrderSummary';
import styles from './Checkout.module.css';

const sampleItems = [
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNT45JzTstRfLchE9s2NjYgITblr5bvTTqfqOJ60RAgrmfV_S1iouPYF4SzguoNku4YzmV16oeQHChJcK6uAItOIrLT0JiLxs6rSQLo0H7mKrgHg_qst-4--u-piSX958TlVsMVknOR3gX4Cs8ZWqAdVDg4QFPTd9g-rvAte9_MjM4cRbbKvmtWYU4h5sZOEUKgPCaB8b2b3uRYl-NPrzv9CPIfX02QkjctffnNKNxeim8obzRBYVVReqDojjS8aRVrmdzyEVM9VJx', title: 'Manta Heritage', quantity: 1, price: 450 },
  { image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4n22k8vaz3jbgzArgTLAIbOQXNwEJ9rjWGypwC2aErfr4iDORmPpmf4ZDc1fT7UtakaMwrflZt0vYcTyy5Eo94u-NcMESWYl3nRlbY98wDoxdzefSBFqdGfuu7v1GAiyP5C8--9VoWE_w8bpAeF1VbhMp8oW5UJfgVv7Ykf6s978ReO-zc3ZmhUb6YhWD0wma8Q4ZHEyHlX8ZDwE5cszpdxnnXDEBir_Tbw82vGVcJyUk9COvMSa6gjtTvzdNg_9KiNbmvSolS-3H', title: 'Bufanda de Alpaca Real', quantity: 2, price: 395 },
];
const subtotal = sampleItems.reduce((s, i) => s + i.price * i.quantity, 0);

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState(null);
  const [address, setAddress] = useState(null);

  const handleInfoSubmit = (data) => { setInfo(data); setStep(2); };
  const handleAddressSubmit = (data) => { setAddress(data); setStep(3); };
  const handlePlaceOrder = () => { navigate('/order/payment'); };

  return (
    <div className={styles.wrapper}>
      <CheckoutStepper currentStep={step} />
      <div className={styles.grid}>
        <div className={styles.formCol}>
          {step === 1 && (
            <section>
              <h2 className={styles.sectionTitle}>Información de contacto</h2>
              <AddressForm onSubmit={handleInfoSubmit} />
              <button className={styles.continueBtn} onClick={() => document.querySelector('form')?.requestSubmit()}>Continuar al envío</button>
            </section>
          )}
          {step === 2 && (
            <section>
              <h2 className={styles.sectionTitle}>Dirección de envío</h2>
              <AddressForm onSubmit={handleAddressSubmit} initial={{ email: info?.email, phone: info?.phone }} />
              <div className={styles.navBtns}>
                <button className={styles.backBtn} onClick={() => setStep(1)}>Volver</button>
                <button className={styles.continueBtn} onClick={() => document.querySelectorAll('form')[1]?.requestSubmit()}>Revisar pedido</button>
              </div>
            </section>
          )}
          {step === 3 && (
            <section>
              <h2 className={styles.sectionTitle}>Revisa tu pedido</h2>
              <div className={styles.review}>
                <div className={styles.reviewBlock}>
                  <div className={styles.reviewHeader}>
                    <div>
                      <h4 className={styles.reviewLabel}>Contacto</h4>
                      <p>{info?.email}</p>
                      <p className={styles.reviewText}>{info?.phone}</p>
                    </div>
                    <button className={styles.editBtn} onClick={() => setStep(1)}>Editar</button>
                  </div>
                </div>
                <div className={styles.reviewBlock}>
                  <div className={styles.reviewHeader}>
                    <div>
                      <h4 className={styles.reviewLabel}>Envío a</h4>
                      <p>{address?.name}</p>
                      <p className={styles.reviewText}>{address?.street}, {address?.city}, {address?.country}</p>
                    </div>
                    <button className={styles.editBtn} onClick={() => setStep(2)}>Editar</button>
                  </div>
                </div>
              </div>
              <div className={styles.placeOrder}>
                <div className={styles.secure}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                  Compra 100% segura
                </div>
                <button className={styles.placeBtn} onClick={handlePlaceOrder}>Pagar &mdash; ${subtotal.toFixed(2)}</button>
                <p className={styles.terms}>Al completar tu compra, aceptas nuestros Términos y Condiciones.</p>
              </div>
            </section>
          )}
        </div>
        <aside className={styles.summaryCol}>
          <OrderSummary items={sampleItems} subtotal={subtotal} total={subtotal} />
        </aside>
      </div>
    </div>
  );
}
