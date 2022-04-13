import { list } from '@keystone-next/keystone/schema';
import {
  integer,
  text,
  relationship,
  timestamp,
  select,
} from '@keystone-next/fields';

export const Reminder = list({
  fields: {
    time: integer({
      defaultValue: 30,
      isRequired: true,
    }), // timer time in seconds
    label: text(),
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
    publishDate: timestamp({ defaultValue: Date() }),
  },
  ui: {
    listView: {
      initialColumns: ['label', 'time', 'alert', 'author'],
    },
  },
});
