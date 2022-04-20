/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY } from '../user/User';
import ReminderFormTemplate from './ReminderFormTemplate';

// graphQL mutation to create a new Reminder
// $id is id of current logged in user
const CREATE_REMINDER_MUTATION = gql`
  mutation CREATE_REMINDER_MUTATION(
    $time: Int!
    $label: String!
    $alert: String!
    $color: String!
    $sound: String!
    $id: ID!
  ) {
    createReminder(
      data: {
        time: $time
        label: $label
        alert: $alert
        color: $color
        sound: $sound
        author: { connect: { id: $id } }
      }
    ) {
      id
      label
    }
  }
`;

// show form to add new Reminder
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
// id => id of current user
export default function CreateReminderForm({ id, closeForm }) {
  // fetching current user
  // const { data, userLoading, userError } = useQuery(CURRENT_USER_QUERY);
  // deconstructing name, and id of user and their reminder cards
  // const { id, name } = data.authenticatedItem;
  // console.log(`name: ${name}, id: ${id}`);

  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange, clearForm } = useForm({
    time: '',
    alert: '',
    label: '',
    color: '',
    sound: '',
  });
  // console.log(inputs);

  // useMutation hook to generate createReminder function
  // that will create new Reminder
  const [createReminder, { loading, error }] = useMutation(
    CREATE_REMINDER_MUTATION,
    {
      // submit form inputs to create new Reminder + id of user
      variables: {
        ...inputs,
        id, // submitting id of user
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }], // update apollo cache
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error); // catch errors
  // show Alert success message if Reminder is successfully created

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form behavior
    await createReminder(); // create new reminder using 'inputs' from form
    clearForm();
    closeForm();
  }
  // input form to create new Reminder,
  // will take : time (in minutes), title (label), alert message,
  // color , and sound.  all fields are required.  color and
  // sound are pre-defined - user selects from drop down
  return (
    <ReminderFormTemplate
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      buttonTextCTA="Create Reminder"
    />
  );
}
