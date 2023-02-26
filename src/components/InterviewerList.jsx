import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

const InterviewerList = (props) => {
  console.log('IL:', props)
  const interviewerMap = props.interviewers.map(interviewer => {
    console.log('IntName:', interviewer.name)
    return(
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.id}
        setInterviewer={props.id}
      />
    )
  })
  console.log('interviewerMap', interviewerMap)
  return (
    <section className="interviewers"
      onClick={() => props.setInterviewer(interviewerMap.id)}
    >
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerMap}</ul>
    </section>
  )
}

export default InterviewerList;