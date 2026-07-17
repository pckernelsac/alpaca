export function createArtisanProcess(data) {
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    icon: data.icon || '',
    image: data.image || '',
    stepOrder: data.stepOrder || 0,
    active: data.active !== false,
  };
}
