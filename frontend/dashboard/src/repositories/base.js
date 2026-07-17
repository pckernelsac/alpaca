// Generic repository factory — all repositories follow this pattern

export function createRepository(mockData) {
  let data = [...mockData];
  return {
    getAll: () => Promise.resolve([...data]),
    getById: (id) => Promise.resolve(data.find(item => item.id === id) || null),
    create: (item) => { const created = { ...item, id: Date.now() }; data.push(created); return Promise.resolve(created); },
    update: (id, changes) => { const idx = data.findIndex(i => i.id === id); if (idx >= 0) { data[idx] = { ...data[idx], ...changes }; return Promise.resolve(data[idx]); } return Promise.resolve(null); },
    delete: (id) => { data = data.filter(i => i.id !== id); return Promise.resolve(); },
    query: (fn) => Promise.resolve(data.filter(fn)),
  };
}
