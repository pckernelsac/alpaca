import { CmsService, ContactService, NewsletterService, AuthService } from '@/services/api';
import { cmsRepository, contactRepository, newsletterRepository, authRepository } from '@/repositories';
import { cmsMockRepository, contactMockRepository, newsletterMockRepository, authMockRepository } from '@/repositories/mock';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const serviceProvider = {
  cms:        new CmsService(USE_MOCK ? cmsMockRepository : cmsRepository),
  contact:    new ContactService(USE_MOCK ? contactMockRepository : contactRepository),
  newsletter: new NewsletterService(USE_MOCK ? newsletterMockRepository : newsletterRepository),
  auth:       new AuthService(USE_MOCK ? authMockRepository : authRepository),
};
