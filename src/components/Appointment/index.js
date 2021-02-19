import React from 'react';
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confrim";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "empty";
  const SHOW = "show";
  const CREATE = "create";
  const SAVE = "save";
  const CONFIRM = "confirm";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE);
    props.bookInterview(props.id, interview).then(()=> transition(SHOW));
  }

  function onDelete(){
    transition(CONFIRM);
  } 

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} save={save} />}
      {mode === SAVE && <Status message="Saving"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?"/>}

    </article>);

}