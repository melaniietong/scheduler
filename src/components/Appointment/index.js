import React from "react";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
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
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(STATUS_SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
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

      {mode === EDIT && (
        <Form interviewers={props.interviewers}
              name={props.interview.student}
              interviewer={props.interview.interviewer}
              onCancel={() => back()}
              onSave={save}
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === ERROR_DELETE && <Error
        message="Could not delete your appointment. Please try again."
        onClose={() => back()} />}

      {mode === ERROR_SAVE && <Error
        message="Could not save your appointment. Please try again." 
        onClose={() => back()} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === STATUS_DELETING && <Status message="Deleting" />}

      {mode === STATUS_SAVING && <Status message="Saving" />}
    </article>
  );
}