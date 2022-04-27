import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import useMemberships from '../lib/useMembership';
import AddtoCart from '../components/AddtoCart';
import Checkout from '../components/CheckOut';
import { CURRENT_USER_QUERY } from '../components/user/User';
import formatMoney from '../lib/formatMoney';
// locally store data on membership plans to use in case database
// 500 error occurs
import { membershipLocal } from '../lib/membership-data';

export default function UpgradePage() {
  // set state for cart status, checking if cart
  // is 'Full' which simply means there is a membership
  // added to cart. Thus User is ready to submit payment
  const [cartItem, setCartItem] = useState({ id: '', name: '', price: '' });
  // console.log(`user cart quantity: ${user.cart[0].quantity}`);
  // get membership data, including names
  // and ids of each membership type
  const membership = useMemberships();
  // check if user currently has membership in cart
  // if so set state (below) accordingly

  // first querying user
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);
  const user = data?.authenticatedItem;
  // const user = useUser();
  const membershipLevel = user?.membership?.name; // checking what plan user is on

  // if user has item in cart then set state
  if (user?.cart[0]?.membership) setCartItem({ ...user.cart[0].membership });

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <h2>Upgrade Your Membership Today!</h2>
      {(membershipLevel === 'free' || membershipLevel === 'platinum') && (
        <AddtoCart
          plan={membership?.gold ? membership.gold : membershipLocal.gold}
          addedToCart={setCartItem}
        >
          GOLD PLAN
        </AddtoCart>
      )}
      {(membershipLevel === 'free' || membershipLevel === 'gold') && (
        <AddtoCart
          plan={
            membership?.platinum
              ? membership.platinum
              : membershipLocal.platinum
          }
          addedToCart={setCartItem}
        >
          PLATINUM PLAN
        </AddtoCart>
      )}
      {cartItem.name ? (
        <Box
          sx={{ width: 400, backgroundColor: '#e6eeff', marginTop: 5, p: 2 }}
        >
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            sx={{ p: 2, fontSize: 20, fontWeight: 'bold' }}
          >
            <span>Plan: {cartItem.name.toUpperCase()}</span>
            <span>Price: {formatMoney(cartItem.price)}</span>
          </Grid>
          <Checkout />
        </Box>
      ) : (
        <Typography sx={{ fontStyle: 'italic', p: 2 }}>
          Please choose a plan
        </Typography>
      )}
    </Grid>
  );
}
