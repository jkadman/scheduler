import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import { PropTypes } from "prop-types";

// map array and passinfo
// person 3 is hightlighted when selected
// each interviewer id is visible in actions when clicked

const InterviewerList = (props) => {
  const interviewerMap = props.interviewers.map(interviewer => {
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerMap}</ul>
    </section>
  );
};
InterviewerList.prototype = {
  interviewer: PropTypes.array.isRequired
};

export default InterviewerList;