import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
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
    .then(() => transition(SHOW)); 
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function confirm() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  function edit () {
    transition(EDIT)
  }

  console.log(props.interview);

  return (
    <article className="appointment">
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
    </article>
  );
}
