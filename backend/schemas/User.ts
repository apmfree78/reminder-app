import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';
import { rules, permissions } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with permission can delete themselves
    delete: permissions.canManageUsers,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    reminders: relationship({ ref: 'Reminder.author', many: true }),
    pomodoros: relationship({ ref: 'Pomodoro.author', many: true }),
    membership: relationship({
      ref: 'Membership.user',
      defaultValue: { connect: { id: '6261884fc844520b4798d7eb' } }, // setting default to free membership
    }),
    order: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      // add access control
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'reminders', 'membership'],
    },
  },
});
