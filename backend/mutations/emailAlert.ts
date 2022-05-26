/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { errorMonitor } from 'nodemailer/lib/xoauth2';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import { sendAlertEmail } from '../lib/mail';
import stripeConfig from '../lib/stripe';
import { Session } from '../types';

const graphql = String.raw;
interface Arguments {
  token: string;
}

async function emailAlert(
  root: any,
  { alert }: { alert: string },
  context: KeystoneContext
): Promise<void> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create new order!');
  }
  // 1.5 query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      membership {
        name
      }
    `,
  });
  console.dir(user, { depth: null });
  // 2. extract user email
  const email = user?.email;

  // 3. email user alert that his timer is complete + custom alert message
  sendAlertEmail(alert, email);
}

export default emailAlert;
