import { cmsRepository, contactRepository, newsletterRepository, authRepository } from '@/repositories';

export class CmsService {
  constructor(repository) { this.repository = repository; }
  getHeroSlides()       { return this.repository.getHeroSlides(); }
  getFaq()              { return this.repository.getFaq(); }
  getGallery()          { return this.repository.getGallery(); }
  getTestimonials()     { return this.repository.getTestimonials(); }
  getBenefits()         { return this.repository.getBenefits(); }
  getArtisanProcesses() { return this.repository.getArtisanProcesses(); }
  getContents()         { return this.repository.getContents(); }
}

export class ContactService {
  constructor(repository) { this.repository = repository; }
  send(data) { return this.repository.send(data); }
}

export class NewsletterService {
  constructor(repository) { this.repository = repository; }
  subscribe(email, source) { return this.repository.subscribe(email, source); }
}

export class AuthService {
  constructor(repository) { this.repository = repository; }
  login(email, password)           { return this.repository.login(email, password); }
  customerLogin(email, password)   { return this.repository.customerLogin(email, password); }
  register(data)                   { return this.repository.register(data); }
  getProfile()                     { return this.repository.getProfile(); }
}

export const cmsService = new CmsService(cmsRepository);
export const contactService = new ContactService(contactRepository);
export const newsletterService = new NewsletterService(newsletterRepository);
export const authService = new AuthService(authRepository);
