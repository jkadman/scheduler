import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

// map array and passinfo
// person 3 is hightlighted when selected
// each interviewer id is visible in actions when clicked

const InterviewerList = (props) => {
  console.log('IL:', props)
  const interviewerMap = props.interviewers?.map(interviewer => {
    console.log('IntName:', interviewer.name)
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  })
  console.log('interviewerMap', interviewerMap)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerMap}</ul>
    </section>
  )
}

export default InterviewerList;