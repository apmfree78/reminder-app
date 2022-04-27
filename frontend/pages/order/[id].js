/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';
import ErrorMessage from '../../components/ErrorMessage';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      total
      charge
      items {
        name
        price
      }
    }
  }
`;
// ORDER RECIEPT PAGE
export default function OrderPage() {
  // extraction order id from URL
  const { id } = useRouter().query;
  // querying database to get information about the order
  const { data, loading, error } = useQuery(ORDER_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;

  // printing order reciept to page
  return (
    <>
      <Head>
        <title>Reminder App - {order.id}</title>
      </Head>
      <Grid
        container
        justifyContent="space-around"
        direction="column"
        alignItems="center"
        sx={{ p: 2, fontSize: 16 }}
      >
        <h2>Thank You For Your Order</h2>
        <h4>You have been upgraded to {order.items[0].name.toUpperCase()}</h4>
        <p>
          <span>Order ID: </span>
          <span>{order.id}</span>
        </p>
        <p>
          <span>Transaction ID: </span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Total Charged: </span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <div>
          {order.items.map((item) => (
            <div key={item.id}>
              <h2 key={item.id}>
                Plan: {item.name.toUpperCase()} (Price:
                {formatMoney(item.price)})
              </h2>
            </div>
          ))}
        </div>
      </Grid>
    </>
  );
}
