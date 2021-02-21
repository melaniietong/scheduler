import React from "react";

import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Status from "components/Appointment/Status.js";

import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const STATUS = "STATUS";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(STATUS);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
              onCancel={() => back()}
              onSave={save}
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === STATUS && <Status />}
    </article>
  );
}