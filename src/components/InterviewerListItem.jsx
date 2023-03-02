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

  return (
    <li className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem;