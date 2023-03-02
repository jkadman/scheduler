import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


const Appointment = (props) => {

  

  console.log('indexprops', props)
  return (
    <article className="appointment">
      <Header 
        id={props.id}
        time={props.time}
      />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
    </article>
  )
}

export default Appointment;