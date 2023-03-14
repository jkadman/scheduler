import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";


const Appointment = (props) => {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log('indexSave', interview)
    transition(STATUS)
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(err => console.log(err))
  }
  
  
  function onDelete() {
    const appointmentId = props.id
      if (mode === CONFIRM) {
        transition(STATUS)
        props.cancelInterview(appointmentId)
       .then(res => transition(EMPTY))
       .catch(err => console.log(err))
      } else {
        transition(CONFIRM)
      }
  }

  function onEdit() {
    transition(EDIT)
  }
  


  console.log('indexprops', props)
  return (
    <article className="appointment">
      <Header 
        id={props.id}
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === STATUS && (
        <Status message="saving"/>
      )}
      {mode === CONFIRM && 
        <Confirm  
          onCancel={back}
          onConfirm={onDelete}
            />
      }
      {mode === SHOW && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onCancel={() => back(EMPTY)}
          save={save}
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          save={save}
          onCancel={back}
        />
      )}
    </article>
  )
}

export default Appointment;

