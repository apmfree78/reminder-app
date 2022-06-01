import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import gql from 'graphql-tag';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CURRENT_USER_QUERY } from './user/User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

// checkout user with stripe using custom graphQL mutation 'checkout'
// see backend for more info.  User is immediately upgraded to new
// plan and membership they upgraded to is removed from cart
// user is then redirect to order page with their order details
function CheckoutForm() {
  const [stripeError, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. stop form from submitting, and turn loader on
    e.preventDefault();
    setLoading(true);
    // 2. create the payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // console.log(paymentMethod);
    // 3. handle any errors from stripe (token returned if successful)
    if (error) {
      setError(error);
      return; // stops checkout
    }
    // 4. sent the token from step 4 to our keystone server via a custom mutation
    const order = await checkout({
      variables: { token: paymentMethod.id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
    console.log('Completed Order!');
    // console.log(order);
    // 5. Change the page to view the order
    console.log(`redirecting to:/order/${order.data.checkout.id}`);
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });
    // 6. turn the loader off
    setLoading(false);
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <Button
        type="submit"
        disabled={loading}
        size="large"
        variant="contained"
        color="warning"
        endIcon={<SendIcon />}
        sx={{ marginTop: 3 }}
      >
        Check Out Now
      </Button>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
