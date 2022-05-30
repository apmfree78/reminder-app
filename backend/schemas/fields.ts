import { checkbox, select, timestamp, text } from '@keystone-next/fields';

export const cardFields = {
  alert: text({
    ui: {
      displayMode: 'textarea',
    },
  }),
  color: select({
    options: [
      { label: 'Silver', value: 'silver' },
      { label: 'Blue', value: 'blue' },
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Orange', value: 'orange' },
      { label: 'White', value: 'white' },
    ],
    // We want to make sure new posts start off as a draft when they are created
    defaultValue: 'silver',
    // fields also have the ability to configure their appearance in the Admin UI
    ui: {
      displayMode: 'segmented-control',
    },
  }),
  sound: select({
    options: [
      { label: 'Bell', value: 'bell' },
      { label: 'Chimes', value: 'chimes' },
      { label: 'Gong', value: 'gong' },
      { label: 'Beep', value: 'beep' },
      { label: 'Jingle', value: 'jingle' },
    ],
    // We want to make sure new posts start off as a draft when they are created
    defaultValue: 'bell',
    // fields also have the ability to configure their appearance in the Admin UI
    ui: {
      displayMode: 'segmented-control',
    },
  }),

  publishDate: timestamp({ defaultValue: Date() }),
};

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
