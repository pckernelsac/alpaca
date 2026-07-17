import { createContext, useState, useCallback } from 'react';

export const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleSection = useCallback((label) => {
    setCollapsedSections((prev) => ({ ...prev, [label]: !(prev[label] ?? false) }));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = { sidebarOpen, toggleSidebar, collapsedSections, toggleSection, toasts, addToast, removeToast };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
