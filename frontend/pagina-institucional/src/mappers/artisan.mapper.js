export function mapArtisanProcess(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description || '',
    icon: raw.icon || '',
    image: raw.image || '',
    stepOrder: raw.stepOrder || 0,
    active: raw.active !== false,
  };
}

export function mapArtisanProcesses(rawList) {
  return (rawList || []).map(mapArtisanProcess).filter((p) => p.active);
}
