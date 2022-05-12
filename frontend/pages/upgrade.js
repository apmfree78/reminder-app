import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import AddtoCart from '../components/AddtoCart';
import Checkout from '../components/CheckOut';
import { CURRENT_USER_QUERY } from '../components/user/User';
import formatMoney from '../lib/formatMoney';
// locally store data on membership plans to use in case database
// 500 error occurs
import { membershipLocal } from '../lib/membership-data';

// on this page user can choose membership level they want
// to upgrade to, once membership is in cart, stripe payment
// window appears to submit payment
export default function UpgradePage() {
  // first querying user
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  // set state - show Checkout if user has membership in cart
  const [showCheckout, setShowCheckout] = useState(false);
  let cartHasItem = 0; // boolean - user has item is cart?

  // if user has item in cart set 'showCheckout' to true
  useEffect(() => {
    if (cartHasItem) setShowCheckout(true);
  }, [cartHasItem]);

  // check for errors and loading state query database for user
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);

  // extract user, cart, membership level from database return value
  const user = data?.authenticatedItem;
  const membershipLevel = user?.membership?.name; // checking what plan user is on
  const cartItem = user?.cart[0]?.membership;
  cartHasItem = user?.cart?.length;

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <h2>Upgrade Your Membership Today!</h2>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <AddtoCart
          plan={membershipLocal.gold}
          title="GOLD PLAN"
          setShowCheckout={setShowCheckout}
        >
          <h2>GOLD PLAN</h2>
          <p>Create up to 30 Reminders</p>
          <p>
            <em>Just {formatMoney(membershipLocal.gold.price)}/year</em>
          </p>
        </AddtoCart>
        <AddtoCart
          plan={membershipLocal.platinum}
          title="PLATINUM PLAN"
          setShowCheckout={setShowCheckout}
        >
          <h2>PLATINUM PLAN</h2>
          <p>Create Unlimited Reminders</p>
          <p>
            <em>Just {formatMoney(membershipLocal.platinum.price)}/year</em>
          </p>
        </AddtoCart>
      </Grid>

      {showCheckout && cartHasItem ? (
        <Paper
          elevation={5}
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
        </Paper>
      ) : (
        <Grid sx={{ fontStyle: 'italic', p: 2 }}>Please choose a plan</Grid>
      )}
    </Grid>
  );
}
