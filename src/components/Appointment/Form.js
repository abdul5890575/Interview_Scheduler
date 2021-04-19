import React, { useState } from 'react'
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"


export default function Form(props) {

const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState("");

const reset = (event) =>{
  setName('')
  setInterviewer(null)
  props.onCancel()
}

function validate(event) {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }
  setError("");
  props.onSave(name, interviewer);
}

const handleName = event => setName(event.target.value)

    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit = {evt => evt.preventDefault()}>
            <input onChange = {handleName}
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={name}
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button  onClick = {reset} danger>Cancel</Button>
            <Button  onClick = {validate} confirm>Save</Button>
          </section>
        </section>
      </main>
    );
  }
