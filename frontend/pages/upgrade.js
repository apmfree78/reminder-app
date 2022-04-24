import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import useMemberships from '../lib/useMembership';
import AddtoCart from '../components/AddtoCart';
import Checkout from '../components/CheckOut';
import { useUser } from '../components/user/User';
import formatMoney from '../lib/formatMoney';
// locally store data on membership plans to use in case database
// 500 error occurs
import { membershipLocal } from '../lib/membership-data';

export default function UpgradePage() {
  // check if user currently has membership in cart
  // if so set state (below) accordingly
  const user = useUser();
  console.log(user.cart);

  // set state for cart status, checking if cart
  // is 'Full' which simply means there is an membership
  // add to cart. User is ready to submit payment
  const [cartItem, setCartItem] = useState(
    user?.cart?.membership
      ? { ...user.cart[0].membership }
      : { id: '', name: '', price: '' }
  );
  console.log(`cartItem: ${cartItem.name}`);
  // get membership data, including names
  // and ids of each membership type
  const membership = useMemberships();
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <h2>Upgrade Your Membership Today!</h2>
      <AddtoCart
        plan={membership?.gold ? membership.gold : membershipLocal.gold}
        addedToCart={setCartItem}
      >
        GOLD PLAN
      </AddtoCart>
      <AddtoCart
        plan={
          membership?.platinum ? membership.platinum : membershipLocal.platinum
        }
        addedToCart={setCartItem}
      >
        PLATINUM PLAN
      </AddtoCart>
      {user?.cart ? (
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
        <div>Please choose a plan</div>
      )}
    </Grid>
  );
}
