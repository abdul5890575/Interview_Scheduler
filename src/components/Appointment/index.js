import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE";
  const SAVING ="SAVING";
  const CONFIRM="CONFIRM";
  const DELETEING = "DELETEING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE  = "ERROR_DELETE ";

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE));
    
  }

  function saveEdit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.EditInterviews(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE));
    
  }

  function deleteApp() {
    transition(DELETEING,true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);})
    .catch(error => transition(ERROR_DELETE));

  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={event =>transition(CREATE)} />}
      {mode === SHOW && (<Show cancel={props.cancel} student={props.interview.student} interviewer={props.interview.interviewer} onEdit={event =>transition(EDIT)} onDelete={event =>transition(CONFIRM)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave = {save} onCancel = {event => back()}/>)}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === ERROR_SAVE && (<Error message="Sorry could not save" onClose={back}/>)}
      {mode === ERROR_DELETE && (<Error message="Sorry could not delete" onClose={back}/>)}
      {mode === DELETEING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (<Confirm message="Are you sure you want to delete"  onCancel = {event => back()} onConfirm={deleteApp}/>)}
      {mode === EDIT && (<Form interviewers={props.interviewers} name={props.interview.student} onSave = {saveEdit} onCancel = {event => back()}/>)}
    </article>
  );
}