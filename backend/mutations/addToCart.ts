/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { errorMonitor } from 'nodemailer/lib/xoauth2';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { membershipId }: { membershipId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart');
  // query current users to see if they're signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    // where: { user: { id: sesh.itemId }, membership: { id: membershipId } },
    where: { user: { id: sesh.itemId } },
    resolveFields: 'id,quantity',
  });

  const [existingCartItem] = allCartItems;
  console.log(existingCartItem?.id);
  // see if there are any items in the cart, cart can only (currently) have 1 item
  // SO if there is updating that cart item
  if (existingCartItem?.id) {
    console.log(`an item is already in cart,updating it...`);
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        membership: { connect: { id: membershipId } },
        user: { connect: { id: sesh.itemId } },
      },
    });
  }
  // if it isn't then create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      membership: { connect: { id: membershipId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}

export default addToCart;
