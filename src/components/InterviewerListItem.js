import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClasses = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected
  });

  const interviewerImageClasses = classNames("interviewers__item-image", {
    "interviewers__item--selected-image" : props.selected
  });

  return (
    <li className={interviewerClasses} onClick={() => props.setInterviewer(props.name)}>
      <img className={interviewerImageClasses}
           src={props.avatar}
           alt={props.name}
      />
      {props.name}
    </li>
  );
}