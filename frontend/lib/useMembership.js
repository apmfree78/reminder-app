import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

// graphQL query to get membership information from database
// we will need this to get membership ID
const ALL_MEMBERSHIPS = gql`
  query {
    allMemberships {
      id
      name
      price
    }
  }
`;
function useMemberships() {
  // extract membership info from database
  const { data, loading, error } = useQuery(ALL_MEMBERSHIPS);

  // converting query data to nice clean object where
  // indices are membership names and values are ids
  const memberData = data?.allMemberships;
  const memberships = memberData
    .map((plan) => ({
      [plan.name]: { name: plan.name, id: plan.id, price: plan.price },
    }))
    .reduce((tally, item) => ({ ...tally, ...item }));
  console.log(memberships);
  return { memberships, loading, error };
}

export default useMemberships;
