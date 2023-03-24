import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, waitForElementToBeRemoved} from "@testing-library/react";

import Application from "components/Application";

import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
    console.log('appointsave', prettyDOM(appointment))

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    
    expect(getByText(appointment, "saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones")); 
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    console.log('appoint', prettyDOM(appointment))

    fireEvent.click(getByAltText(appointment, "Delete"))

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"))

    // fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));
    // console.log('cancelcontainer', prettyDOM(container))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", () => {})
});


// deleting test
// 1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Delete" button on the booked appointment.
  // 4. Check that the confirmation message is shown.
  // 5. Click the "Confirm" button on the confirmation.
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  //editing test
  // 1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Edit" button on the booked appointment.
  // 4. Change the student name
  // 5. Click the "save" button on the confirmation.
  // 6. Check that the element with the text "saving" is displayed.
  // 7. Wait until the element with the name is shown
  // 8. Check that the DayListItem with the text "Monday" also has the text "0 spots remaining".
/*

/*
plan for loads data, cancels an interview and increases the spots remaining for Monday by 1
1 render application
2 confirm that there is data to delete (maybe choose which data to delete)
3 click on cancel
4 confirm cancel
5 confirm deleting shows up
6 wait until an empty interview slot appears
7 confirm that there is one extra spot available

*/