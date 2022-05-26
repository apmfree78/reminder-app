import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { extendGraphqlSchema } from './mutations/index';
import { Reminder } from './schemas/Reminder';
import { User } from './schemas/User';
import { Role } from './schemas/Roles';
import { Order } from './schemas/Order';
import { OrderItem } from './schemas/OrderItem';
import { CartItem } from './schemas/CartItem';
import { Membership } from './schemas/Membership';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { permissionsList } from './schemas/fields';

const databaseURL = process.env.DATABASE_URL;
// console.log(databaseURL);

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // how long is user signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // add in initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // add data seeding here
      async onConnect(keystone) {
        console.log('Connected to the database');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // schema items go in here
      User,
      Reminder,
      Order,
      OrderItem,
      CartItem,
      Membership,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // change this for roles
      // Show the UI only for people that pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
