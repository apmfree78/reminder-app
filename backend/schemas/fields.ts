import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageReminders: checkbox({
    defaultValue: false,
    label: 'User can Update and delete any reminder',
  }),
  canManageMemberships: checkbox({
    defaultValue: false,
    label: 'User can Add, Remove, or Update Memberships Levels',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: 'User can see and manage cart and cart items',
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: 'User can see and manage orders',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
