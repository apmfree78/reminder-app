import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    reminders: relationship({ ref: 'Reminder.author', many: true }),
    membership: relationship({
      ref: 'Membership.user',
      defaultValue: { connect: { id: '6261884fc844520b4798d7eb' } }, // setting default to free membership
    }),
    order: relationship({ ref: 'Order.user', many: true }),
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
