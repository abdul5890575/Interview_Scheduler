import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE";
  const SAVING ="SAVING";
  const CONFIRM="CONFIRM";
  const DELETEING = "DELETEING";
  const EDIT = "EDIT";


  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }

  function deleteApp() {
    transition(DELETEING)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })

  }

  // function onFormEdit(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer,
  //   };
  //   transition(SAVING);
  //   props
  //     .editInterview(props.id, interview)
  //     .then(() => {
  //       transition(SHOW);
  //     })
  // }


  // useEffect(() => {
  //   if (interview && mode === EMPTY) {
  //     transition(SHOW);
  //   }
  //   if (interview === null && mode === SHOW) {
  //     transition(EMPTY);
  //   }
  // }, [interview, transition, mode]);

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={event =>transition(CREATE)} />}
      {mode === SHOW && (<Show cancel={props.cancel} student={props.interview.student} interviewer={props.interview.interviewer} onEdit={event =>transition(EDIT)} onDelete={event =>transition(CONFIRM)}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave = {save} onCancel = {event => back()}/>)}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETEING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (<Confirm message="Are you sure you want to delete"  onCancel = {event => back()} onConfirm={deleteApp}/>)}
      {mode === EDIT && (<Form interviewers={props.interviewers} name={props.interview.student} onSave = {save} onCancel = {event => back()}/>)}
    </article>
  );
}