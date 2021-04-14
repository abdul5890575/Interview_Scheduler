import React, { useState } from 'react'
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"


export default function Form(props) {

const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

const handleSubmit = (event) =>{
  event.preventDefault()
}

const reset = (event) =>{
  setName('')
  setInterviewer(null)
}

const handleName = event => setName(event.target.value)

    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input onChange = {handleName}
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={name}
            />
          </form>
          <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button  onClick = {reset} danger>Cancel</Button>
            <Button  onClick = {props.onSave} confirm>Save</Button>
          </section>
        </section>
      </main>
    );
  }