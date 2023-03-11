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
    
  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  
        
  console.log('indexprops', props)
  return (
    <article className="appointment">
      <Header 
        id={props.id}
        time={props.time}
        bookInterview={bookInterview}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          bookInterview={bookInterview}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onCancel={() => back(EMPTY)}
          bookInterview={bookInterview}
          save={save}
        />
      )}
    </article>
  )
}

export default Appointment;

