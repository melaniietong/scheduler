import React, { useState } from "react";

import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);
  const [name, setName] = useState(props.name ? props.name : "");
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setName("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input className="appointment__create-input text--semi-bold"
                 name="name"
                 type="text"
                 value={name}
                 onChange={(event) => setName(event.target.value)}
                 placeholder="Enter Student Name"
                 data-testid="student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>
        
        <InterviewerList interviewers={props.interviewers}
                         interviewer={interviewer}
                         setInterviewer={setInterviewer}
        />
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}