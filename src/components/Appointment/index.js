import React from "react";

import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";

import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers}
              onCancel={() => back()}
        />
      )}
    </article>
  );
}