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

export const Pomodoro = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageTimers,
    delete: rules.canManageTimers,
  },
  fields: {
    session: integer({
      defaultValue: 30,
      isRequired: true,
    }), // timer time in seconds
    break: integer({
      defaultValue: 5,
      isRequired: true,
    }), // timer time in seconds
    ...cardFields,
    author: relationship({
      ref: 'User.pomodoros',
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
      initialColumns: ['session', 'break', 'author'],
    },
  },
});
