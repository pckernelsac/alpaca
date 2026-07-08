import ProfileMenu from '@/components/ecommerce/ProfileMenu/ProfileMenu';
import AddressCard from '@/components/ecommerce/AddressCard/AddressCard';
import styles from './Addresses.module.css';

const sampleAddresses = [
  { id: 1, name: 'Julianne Moore', street: 'Av. Principal 123', city: 'Lima', state: 'Lima', zip: '15001', country: 'Perú', phone: '+51 999 888 777', isDefault: true },
  { id: 2, name: 'Julianne Moore', street: 'Calle Los Olivos 456', city: 'Cusco', state: 'Cusco', zip: '08001', country: 'Perú', phone: '+51 984 123 456', isDefault: false },
];

export default function Addresses() {
  return (
    <div className={styles.layout}>
      <ProfileMenu userName="Julianne" />
      <div className={styles.main}>
        <h1 className={styles.title}>Direcciones</h1>
        <div className={styles.grid}>
          {sampleAddresses.map((addr) => (
            <AddressCard key={addr.id} address={addr} onEdit={() => {}} onDelete={() => {}} onSetDefault={() => {}} />
          ))}
          <button className={styles.addBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>add</span>
            <span>Añadir nueva dirección</span>
          </button>
        </div>
      </div>
    </div>
  );
}