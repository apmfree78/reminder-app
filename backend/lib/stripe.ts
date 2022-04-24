import Stripe from 'stripe';
import 'dotenv/config';

const stripeConfig = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
});
console.log(`STRIPE SECRET KEY: ${process.env.STRIPE_SECRET}`);

export default stripeConfig;
