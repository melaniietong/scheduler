import React from "react";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const STATUS_DELETING = "STATUS_DELETING";
const STATUS_SAVING = "STATUS_SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const cancelInterview = () => {
    transition(STATUS_DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(STATUS_SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CONFIRM && <Confirm
        message="Are you sure you want to delete this appointment?"
        onCancel={() => back()}
        onConfirm={cancelInterview}
      />}

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
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === STATUS_DELETING && <Status message="Deleting" />}

      {mode === STATUS_SAVING && <Status message="Saving" />}
    </article>
  );
}