import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartStore } from '@/stores/cartStore';
import CheckoutStepper from '@/components/ecommerce/CheckoutStepper/CheckoutStepper';
import AddressForm from '@/components/ecommerce/AddressForm/AddressForm';
import OrderSummary from '@/components/ecommerce/OrderSummary/OrderSummary';
import styles from './Checkout.module.css';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState(null);
  const [address, setAddress] = useState(null);

  const items = cartStore.getItems();
  const subtotal = cartStore.getTotal();
  const isEmpty = items.length === 0;

  const handleInfoSubmit = (data) => { setInfo(data); setStep(2); };
  const handleAddressSubmit = (data) => { setAddress(data); setStep(3); };
  const handlePlaceOrder = () => { navigate('/order/payment'); };

  if (isEmpty) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.empty}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <h2>Tu carrito está vacío</h2>
          <button onClick={() => navigate('/')} className={styles.backBtn}>Ir a la tienda</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <CheckoutStepper currentStep={step} />
      {step === 1 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Información de Contacto</h2>
          <AddressForm onSubmit={handleInfoSubmit} />
        </section>
      )}
      {step === 2 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Dirección de Envío</h2>
          <AddressForm onSubmit={handleAddressSubmit} />
        </section>
      )}
      {step === 3 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Revisar Pedido</h2>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewCol}>
              <div className={styles.reviewBlock}>
                <h4>Contacto</h4>
                <p>{info?.email}<br />{info?.phone}</p>
              </div>
              <div className={styles.reviewBlock}>
                <h4>Envío a</h4>
                <p>{address?.name}<br />{address?.street}, {address?.city}<br />{address?.country}</p>
              </div>
            </div>
            <div className={styles.reviewCol}>
              <OrderSummary items={items} subtotal={subtotal} />
              <button className={styles.payBtn} onClick={handlePlaceOrder}>Pagar</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
