let listeners = [];
let state = { searchOpen: false, mobileMenuOpen: false, mobileFiltersOpen: false };

export const uiStore = {
  getState() { return state; },
  setSearch(v) { state = { ...state, searchOpen: v }; listeners.forEach((fn) => fn()); },
  setMobileMenu(v) { state = { ...state, mobileMenuOpen: v }; listeners.forEach((fn) => fn()); },
  setMobileFilters(v) { state = { ...state, mobileFiltersOpen: v }; listeners.forEach((fn) => fn()); },
  subscribe(fn) {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },
};