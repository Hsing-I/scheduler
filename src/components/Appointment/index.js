import React from 'react';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confrim";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "empty";
  const SHOW = "show";
  const CREATE = "create";
  const SAVE = "save";
  const CONFIRM = "confirm";
  const DELETE = "delete";
  const EDIT = "edit";
  const ERROR_SAVE = "error_save";
  const ERROR_DELETE = "error_delete";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    name && interviewer && transition(SAVE);
    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE), true);
  }

  function cancel() {
    transition(DELETE);
    props.cancelAppointment(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} save={save} />}
      {mode === EDIT && <Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} save={save} onCancel={() => back(SHOW)} />}
      {mode === SAVE && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back()} onConfirm={cancel} />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={() => back()} />}

    </article>);
}