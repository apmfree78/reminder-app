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
    read: rules.canReadReminders,
    update: rules.canManageReminders,
    delete: rules.canManageReminders,
  },
  fields: {
    time: integer({
      defaultValue: 30,
      isRequired: true,
    }), // timer time in seconds
    label: text(),
    ...cardFields, // importing alert message, color, sound, and publication date
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
