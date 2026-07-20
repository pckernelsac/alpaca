import { createUser, createRole, createPermission, createProduct, createOrder, createClient, createCampaign, createContent, createStockItem, createTransaction, createShipment, createAuditLog, createCompanySetting } from '@/domain';

export const mapUsers = (r) => (r?.data || r || []).map(createUser);
export const mapRoles = (r) => (r?.data || r || []).map(createRole);
export const mapPermissions = (r) => (r?.data || r || []).map(createPermission);
export const mapProducts = (r) => (r?.data || r || []).map(createProduct);
export const mapOrders = (r) => (r?.data || r || []).map(createOrder);
export const mapClients = (r) => (r?.data || r || []).map(createClient);
export const mapCampaigns = (r) => (r?.data || r || []).map(createCampaign);
export const mapContents = (r) => (r?.data || r || []).map(createContent);
export const mapStock = (r) => (r?.data || r || []).map(createStockItem);
export const mapTransactions = (r) => (r?.data || r || []).map(createTransaction);
export const mapShipments = (r) => (r?.data || r || []).map(createShipment);
export const mapAuditLogs = (r) => (r?.data || r || []).map(createAuditLog);
export const mapCompany = (r) => createCompanySetting(r?.data || r);
