import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); 
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true)) 
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function confirm() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  }

  function edit () {
    transition(EDIT)
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={onDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form 
          onCancel={() => back()}
          interviewers={props.interviewers} 
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="SAVING"
        />
      )}
      {mode === DELETING && (
        <Status
          message="DELETING"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={confirm}
        />
      )}
      {mode === EDIT && (
        <Form
        onCancel={() => back()}
        interviewers={props.interviewers} 
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message={"Could not save appointment."}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message={"Could not cancel appointment."}
          onClose={back}
        />
      )}
    </article>
  );
}
