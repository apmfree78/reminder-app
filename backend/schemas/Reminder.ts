import { list } from '@keystone-next/keystone/schema';
import {
  integer,
  text,
  relationship,
  timestamp,
  select,
} from '@keystone-next/fields';
import { cardFields } from './fields';
import { isSignedIn, rules } from '../access';

export const Reminder = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageTimers,
    delete: rules.canManageTimers,
  },
  fields: {
    alert: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    label: text(),
    time: integer({
      defaultValue: 30,
      isRequired: true,
    }), // timer time in seconds
    ...cardFields,
    author: relationship({
      ref: 'User.reminders',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        // inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
        // inlineCreate: { fields: ['name', 'email'] },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['label', 'time', 'alert', 'author'],
    },
  },
});
