import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss"

const InterviewerListItem = (props) => {
  console.log('id', props)
  // console.log('ULI:', props)
  // console.log('setInterviewer', props.setInterviewer)

  let interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  })

  const selectedName = () => {
    if (props.selected) {
      return `${props.name}`
    }
  }

  return (
    <li className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className={interviewerClass}
        src={props.avatar}
        name={props.name}
      />
      {selectedName()}
    </li>
  )
}

export default InterviewerListItem;