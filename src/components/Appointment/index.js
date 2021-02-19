import React from "react";

import Empty from "components/Appointment/Empty.js";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  if (props.interview) {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Show student={props.interview.student}
              interviewer={props.interview.interviewer}/>
      </article>
    );
  } else {
    return (
      <article className="appointment">
        <Header time={props.time} />
        <Empty />
      </article>
    );
  }
}