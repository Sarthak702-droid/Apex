export const ROLES = ['Farmer', 'FPO', 'Buyer', 'Government', 'Admin'] as const;

export type Role = (typeof ROLES)[number];
