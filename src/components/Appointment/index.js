import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


const Appointment = (props) => {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true ));
  };
  
  
  function onDelete() {
    const appointmentId = props.id;
      if (mode === CONFIRM) {
        transition(DELETING, true);
        props.cancelInterview(appointmentId)
       .then(() => transition(EMPTY))
       .catch(() => transition(ERROR_DELETE, true));
      } else {
        transition(CONFIRM);
      };
  };

  function onEdit() {
    transition(EDIT);
  };
  


  return (
    <article className="appointment" data-testid="appointment">
      <Header 
        id={props.id}
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && (
        <Status message="saving" />
      )};
      {mode === DELETING && (
        <Status message="deleting" />
      )};
      {mode === CONFIRM && 
        <Confirm  
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={onDelete}
            />
      };
      {mode === SHOW && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )};
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviewers}
          onCancel={() => back(EMPTY)}
          save={save}
        />
      )};
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          save={save}
          onCancel={back}
        />
      )};
      {mode === ERROR_DELETE &&
        <Error 
        message={"Error could not delete"}
        onClose={back}
        />
      };
      {mode === ERROR_SAVE &&
        <Error
        message={"Error could not save"}
        onClose={back}
        />
      };
    </article>
  );
};

export default Appointment;

