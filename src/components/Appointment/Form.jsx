import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  console.log('formprops', props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // resets state
  const reset = () => {
    setStudent("") 
    setInterviewer(null)
  }

  // calls the reset function
  const cancel = () => {
    reset()
    props.onCancel()
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={event => setInterviewer(event)} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger  
            onClick={cancel}
          >Cancel</Button>
          <Button confirm 
            onSave={props.onSave} 
          >Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;