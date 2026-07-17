import { createRepository } from './base';
import { shipments, carriers } from '../mocks/data';

const shipmentsRepo = createRepository(shipments);
shipmentsRepo.getCarriers = () => Promise.resolve(carriers);
export default shipmentsRepo;
