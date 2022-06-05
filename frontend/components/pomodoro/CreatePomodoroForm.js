/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY } from '../user/User';
import PomodoroFormTemplate from './PomodoroFormTemplate';

// graphQL mutation to create a new Pomodoro
// $id is id of current logged in user
const CREATE_POMODORO_MUTATION = gql`
  mutation CREATE_POMODORO_MUTATION(
    $session: Int!
    $break: Int!
    $color: String!
    $sound: String!
    $id: ID!
  ) {
    createPomodoro(
      data: {
        session: $session
        break: $break
        color: $color
        sound: $sound
        author: { connect: { id: $id } }
      }
    ) {
      id
      session
      break
    }
  }
`;

// show form to add new Pomodoro
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
// id => id of current user
export default function CreatePomodoroForm({ id, closeForm }) {
  // create state for form input and handling
  // using custom hook useForm
  // console.log(`id = ${id}`);
  const { inputs, handleChange, clearForm } = useForm({
    session: '',
    break: '',
    color: '',
    sound: '',
  });
  // console.log(inputs);

  // useMutation hook to generate createPomodoro function
  // that will create new Pomodoro
  const [createPomodoro, { loading, error }] = useMutation(
    CREATE_POMODORO_MUTATION,
    {
      // submit form inputs to create new Pomodoro + id of user
      variables: {
        ...inputs,
        id, // submitting id of user
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }], // update apollo cache
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error); // catch errors
  // show Alert success message if Pomodoro is successfully created

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form behavior
    await createPomodoro(); // create new Pomodoro using 'inputs' from form
    const PomodoroName = `${inputs.session}-${inputs.break}`;
    clearForm();
    closeForm();
    // show success message
    Swal.fire({
      icon: 'success',
      title: 'Woho!!!',
      text: `${PomodoroName} Pomodoro Sucessfully Created!`,
      timer: 5000,
    });
  }
  // input form to create new Pomodoro,
  // will take : time (in minutes), title (label), alert message,
  // color , and sound.  all fields are required.  color and
  // sound are pre-defined - user selects from drop down
  return (
    <PomodoroFormTemplate
      {...inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      buttonTextCTA="Create Pomodoro"
    />
  );
}
