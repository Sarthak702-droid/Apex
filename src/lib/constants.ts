export const ROLES = [
  'Municipalities Corporation',
  'Development Authorities',
  'Disaster Management Agencies',
  'FPO (Farmer Producer Organization)',
  'Logistic Supporter',
  'Admin',
] as const;

export type Role = (typeof ROLES)[number];
