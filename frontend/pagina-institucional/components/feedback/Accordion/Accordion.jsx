import { useState, createContext, useContext } from 'react';
import styles from './Accordion.module.css';

const AccordionContext = createContext(null);

export function AccordionProvider({ children }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('useAccordion must be used within AccordionProvider');
  return ctx;
}

export default function Accordion({ children, className = '' }) {
  return (
    <AccordionProvider>
      <div className={`${styles.accordion} ${className}`}>
        {children}
      </div>
    </AccordionProvider>
  );
}