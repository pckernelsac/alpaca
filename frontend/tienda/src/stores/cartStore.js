const STORAGE_KEY = 'tienda_cart';

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

let listeners = [];
let cart = loadCart();

export const cartStore = {
  getItems() { return cart; },
  getCount() { return cart.reduce((sum, i) => sum + i.quantity, 0); },
  getTotal() { return cart.reduce((sum, i) => sum + i.price * i.quantity, 0); },
  addItem(product) {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      cart.push({ ...product, quantity: product.quantity || 1 });
    }
    saveCart(cart);
    listeners.forEach((fn) => fn());
  },
  updateQuantity(id, qty) {
    const item = cart.find((i) => i.id === id);
    if (item) { item.quantity = Math.max(1, qty); }
    saveCart(cart);
    listeners.forEach((fn) => fn());
  },
  removeItem(id) {
    cart = cart.filter((i) => i.id !== id);
    saveCart(cart);
    listeners.forEach((fn) => fn());
  },
  clear() {
    cart = [];
    saveCart(cart);
    listeners.forEach((fn) => fn());
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },
};