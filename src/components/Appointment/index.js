import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";




const Appointment = (props) => {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    
  console.log('indexprops', props)
  return (
    <article className="appointment">
      <Header 
        id={props.id}
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  )
}

export default Appointment;

