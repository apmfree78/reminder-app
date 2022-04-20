/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../../lib/useForm';
import { ALL_REMINDERS_QUERY } from '../../pages';
import DeleteReminder from './DeleteReminder';
import ReminderFormTemplate from './ReminderFormTemplate';

// graphQL mutation to create a new Reminder
const UPDATE_REMINDER_MUTATION = gql`
  mutation UPDATE_REMINDER_MUTATION(
    $id: ID!
    $time: Int
    $label: String
    $alert: String
    $color: String
    $sound: String
  ) {
    updateReminder(
      id: $id
      data: {
        time: $time
        label: $label
        alert: $alert
        color: $color
        sound: $sound
      }
    ) {
      id
      label
      alert
      color
      sound
    }
  }
`;

// show form to add new Reminder
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
export default function UpdateReminderForm({ reminder, closeForm }) {
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange, clearForm } = useForm(reminder);

  // useMutation hook to generate createReminder function
  // that will create new Reminder
  const [updateReminder, { loading, error }] = useMutation(
    UPDATE_REMINDER_MUTATION
  );
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error); // catch errors
  // show Alert success message if Reminder is successfully created

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form behavior
    // create new reminder using 'inputs' from form
    await updateReminder({
      variables: { id: reminder.id, ...inputs }, // submit form inputs to create new Reminder
      refetchQueries: [{ query: ALL_REMINDERS_QUERY }], // update apollo cache
    }).catch(console.error);

    clearForm();
    closeForm();
  }
  // input form to Update Reminder,
  // will take : time (in minutes), title (label), alert message,
  // color , and sound.  all fields are required.  color and
  // sound are pre-defined - user selects from drop down
  return (
    <ReminderFormTemplate
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      buttonTextCTA="Update Reminder"
    >
      <DeleteReminder id={reminder.id} closeForm={closeForm}>
        Delete Reminder
      </DeleteReminder>
    </ReminderFormTemplate>
  );
}
