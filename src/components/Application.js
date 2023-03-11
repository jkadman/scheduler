import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((res) => {
      console.log('all0', res[0].data);
      console.log('all1', res[1].data);
      console.log('all2', res[2].data)
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }))
    })
  }, [])

 

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const appointmentData = dailyAppointments.map((element) => {
    console.log('AppointmentData', element)
    const interview = getInterview(state, element.interview)
    return (
      <Appointment
        key={element.id}
        {...element}
        interview={interview}
        interviewers={interviewers}
      />
    )
  })
  console.log(appointmentData)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentData} 
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
