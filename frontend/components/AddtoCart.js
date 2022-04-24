/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './user/User';

// graphQL mutation to add memberhship to cart
const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID!) {
    addToCart(membershipId: $id) {
      id
      membership {
        id
        name
        price
      }
    }
  }
`;

export default function AddtoCart({ plan, addedToCart, children }) {
  // executing graphQL to add requested membership to user cart
  console.log(plan);
  console.log(plan.id);
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);

  if (loading) return 'Loading...';

  return (
    <Button
      type="submit"
      disabled={loading}
      size="large"
      variant="contained"
      color="success"
      endIcon={<SendIcon />}
      sx={{ marginTop: 3 }}
      onClick={() => {
        addToCart({
          variables: { id: plan.id },
          refetchQueries: { query: CURRENT_USER_QUERY },
        }); // add membership to cart with custom mutation
        addedToCart(plan); // set state so we know membership is added to cart
      }}
    >
      {children}
    </Button>
  );
}
