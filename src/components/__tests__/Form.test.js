import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";



afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render( <Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const save = jest.fn();
    
     /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const {getByText} = render (
      <Form interviewers={interviewers}  save={save} />
    )
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const save = jest.fn()
  
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const {getByText} = render (
      <Form interviewers={interviewers}  save={save} student="Lydia Miller-Jones" />
    )
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    const save = jest.fn();
    // onSave("Lydia Miller-Jones", 1)
    // onSave("Lydia Miller-Jones", 1)
    
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const {getByText, queryByText} = render (
      <Form 
        interviewers={interviewers} 
        student="Lydia Miller-Jones" 
        save={save} 
        interviewer={interviewers[0].id} 
      />
    );
    
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});


// not exactly sure where save from the form function comes in.  I think it's the form prop 'save', should explore that when I have time