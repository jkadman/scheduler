import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  console.log('formprops', props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewer={props.interviewers}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger  
            onCancel={props.onCancel}
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