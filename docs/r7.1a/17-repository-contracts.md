# R7.1A.2 — Repository Contracts

> **Interfaces de repositorio para desacoplar implementaciones**

---

## Contratos Creados

| Archivo | Símbolo | Métodos |
|---------|---------|---------|
| `ICmsRepository.js` | `ICmsRepository` | getHeroSlides, getFaq, getGallery, getTestimonials, getBenefits, getArtisanProcesses, getContents |
| `IContactRepository.js` | `IContactRepository` | send |
| `INewsletterRepository.js` | `INewsletterRepository` | subscribe |
| `IAuthRepository.js` | `IAuthRepository` | login, customerLogin, register, getProfile |
| `ICatalogRepository.js` | `ICatalogRepository` | getAll, getById, getCategories, getCollections |
| `ICustomerRepository.js` | `ICustomerRepository` | getProfile, updateProfile, addresses, wishlist, cart, checkout |
| `IOrderRepository.js` | `IOrderRepository` | getAll, getById, create, updateStatus, addNote, getEvents |
| `IPaymentRepository.js` | `IPaymentRepository` | getAll, createPaymentIntent, refund |
| `IInventoryRepository.js` | `IInventoryRepository` | getStock, adjust, getMovements, getTransfers |
| `ISettingsRepository.js` | `ISettingsRepository` | getCompany, updateCompany |

## Arquitectura

En JavaScript, los contratos se expresan como:
1. **Símbolo**: `export const IName = Symbol('IName')` — identificador único
2. **JSDoc typedef**: Documentación de la forma esperada
3. **Convención**: Los repositorios concretos deben implementar todos los métodos documentados

## Beneficios

- **Desacoplamiento**: Services dependen de contratos, no de implementaciones
- **Swappable**: Se puede cambiar el repository sin modificar services
- **Documentación viva**: El contrato es la fuente de verdad de la interfaz
- **Preparado para TypeScript**: Migración directa a `interface`
