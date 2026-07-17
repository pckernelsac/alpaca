export const cmsMockRepository = {
  getHeroSlides:       () => Promise.resolve([]),
  getFaq:              () => Promise.resolve([]),
  getGallery:          () => Promise.resolve([]),
  getTestimonials:     () => Promise.resolve([]),
  getBenefits:         () => Promise.resolve([]),
  getArtisanProcesses: () => Promise.resolve([]),
  getContents:         () => Promise.resolve([]),
};

export const contactMockRepository = {
  send: () => Promise.resolve({ success: true }),
};

export const newsletterMockRepository = {
  subscribe: () => Promise.resolve({ success: true }),
};

export const authMockRepository = {
  login:         () => Promise.resolve({ accessToken: 'mock-token', user: {} }),
  customerLogin: () => Promise.resolve({ accessToken: 'mock-token', customer: {} }),
  register:      () => Promise.resolve({}),
  getProfile:    () => Promise.resolve({}),
};
