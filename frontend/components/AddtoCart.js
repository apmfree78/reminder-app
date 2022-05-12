/* eslint-disable react/prop-types */
import { Button, Box, Grid, Paper } from '@mui/material';
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

// this functional component returns button, when clicked adds
// membership to cart that is specified in the prop 'plan'
// once user clicks also 'setShowCheckout' is submitted 'true'
// this tells upgrade page to show stripe payment form for
// selected plan
// *NOTE: in this component a CUSTOM mutation 'addToCart' is use
// see backend folder to see this
export default function AddtoCart({ plan, setShowCheckout, title, children }) {
  // executing graphQL to add requested membership to user cart
  console.log(plan);
  console.log(plan.id);
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);

  if (loading) return 'Loading...';

  return (
    <Paper elevation={5} sx={{ width: 280, m: 2, p: 1 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          {children}
        </Grid>
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
              refetchQueries: [{ query: CURRENT_USER_QUERY }],
            }); // add membership to cart with custom mutation
            setShowCheckout(true); // set state so we know membership is added to cart
          }}
        >
          {title}
        </Button>
      </Grid>
    </Paper>
  );
}
