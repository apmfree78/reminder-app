import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions } from '../access';

export const Membership = list({
  access: {
    create: permissions.canManageMemberships,
    read: () => true,
    update: permissions.canManageMemberships,
    delete: permissions.canManageMemberships,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageMemberships(args),
    hideDelete: (args) => !permissions.canManageMemberships(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: select({
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Gold', value: 'gold' },
        { label: 'Platinum', value: 'platinum' },
        { label: 'Enterprise', value: 'enterprise' },
      ],
      // We want to make sure default value is free membership
      defaultValue: 'free',
      // fields also have the ability to configure their appearance in the Admin UI
      ui: {
        displayMode: 'segmented-control',
      },
      isUnique: true, // cannot create duplicate memberships
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: integer({ isRequired: true, isUnique: true }),
    user: relationship({ ref: 'User.membership', many: true }),
    /*     reminders: integer({
      isRequired: true,
      isUnique: true,
      defaultValue: 4,
    }), */
  },
  ui: {
    listView: {
      initialColumns: ['name', 'price', 'user'],
    },
  },
});
