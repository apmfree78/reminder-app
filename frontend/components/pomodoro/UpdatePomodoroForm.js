/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import useForm from '../../lib/useForm';
import { ALL_TIMER_QUERY } from '../../pages';
import { CURRENT_USER_QUERY } from '../user/User';
import DeletePomodoro from './DeletePomodoro';
import PomodoroFormTemplate from './PomodoroFormTemplate';

// graphQL mutation to create a new Pomodoro
const UPDATE_POMODORO_MUTATION = gql`
  mutation UPDATE_POMODORO_MUTATION(
    $id: ID!
    $session: Int
    $break: Int
    $color: String
    $sound: String
  ) {
    updatePomodoro(
      id: $id
      data: { session: $session, break: $break, color: $color, sound: $sound }
    ) {
      id
      color
      sound
    }
  }
`;

// show form to add new Pomodoro
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
export default function UpdatePomodoroForm({ pomodoro, closeForm }) {
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange, clearForm } = useForm(pomodoro);

  // useMutation hook to generate createPomodoro function
  // that will create new Pomodoro
  const [updatePomodoro, { loading, error }] = useMutation(
    UPDATE_POMODORO_MUTATION
  );
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error); // catch errors
  // show Alert success message if Pomodoro is successfully created

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form behavior
    // update Pomodoro using 'inputs' from form
    await updatePomodoro({
      variables: { id: pomodoro.id, ...inputs }, // submit form inputs to create new Pomodoro
      refetchQueries: [
        { query: CURRENT_USER_QUERY },
        { query: ALL_TIMER_QUERY },
      ], // update apollo cache
    }).catch(console.error);
    const PomodoroName = `${inputs.session}-${inputs.break} Pomodoro`;
    closeForm();
    // show success message
    Swal.fire({
      icon: 'success',
      title: 'Changes Made!',
      text: `${PomodoroName} Sucessfully Updated!`,
      timer: 5000,
    });
  }
  // input form to Update Pomodoro,
  // will take : time (in minutes), title (label), alert message,
  // color , and sound.  all fields are required.  color and
  // sound are pre-defined - user selects from drop down
  return (
    <PomodoroFormTemplate
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      buttonTextCTA="Update Pomodoro"
    >
      <DeletePomodoro id={pomodoro.id} closeForm={closeForm}>
        Delete Pomodoro
      </DeletePomodoro>
    </PomodoroFormTemplate>
  );
}
