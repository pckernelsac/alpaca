const STORAGE_KEY = 'tienda_wishlist';

function load() {
  try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
  catch { return []; }
}

function save(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

let listeners = [];
let items = load();

export const wishlistStore = {
  getItems() { return items; },
  isInList(id) { return items.some((i) => i.id === id); },
  toggle(product) {
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx >= 0) { items.splice(idx, 1); } else { items.push(product); }
    save(items);
    listeners.forEach((fn) => fn());
    return idx < 0;
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },
};