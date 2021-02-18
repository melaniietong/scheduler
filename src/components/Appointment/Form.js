import React, { useState } from "react";

import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);

  if (props.name) {
    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input className="appointment__create-input text--semi-bold"
                   name="name"
                   type="text"
                   value={props.name}
                   placeholder="Enter Student Name"
            />
          </form>
          
          <InterviewerList interviewers={props.interviewers}
                           interviewer={interviewer}
                           setInterviewer={setInterviewer}
          />
        </section>
        
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={props.onCancel} danger>Cancel</Button>
            <Button onClick={props.onSave} confirm>Save</Button>
          </section>
        </section>
      </main>
    );
  } else {
    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input className="appointment__create-input text--semi-bold"
                   name="name"
                   type="text"
                   placeholder="Enter Student Name"
            />
          </form>
          
          <InterviewerList interviewers={props.interviewers}
                           interviewer={interviewer}
                           setInterviewer={setInterviewer}
          />
        </section>
        
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={props.onCancel} danger>Cancel</Button>
            <Button onClick={props.onSave} confirm>Save</Button>
          </section>
        </section>
      </main>
    );
  }
}