import {React, useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log('applength', setState.appointments)
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }))
    })
  }, [])



  useEffect(() => {
    updateSpots(state.days, state.appointments);
  }, [state.appointments]);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('bookapp', appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({...state, appointments})

        
    });   
  } 
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(() => { 
        setState({...state, appointments})
      })
  };

  
  const updateSpots = (days, appointments) => {
    const updatedDays = days.map(day => {
      const spots = day.appointments.reduce((acc, curr) => {
        if (!appointments[curr].interview) {
          return acc + 1;
        }
        return acc;
      }, 0);
      return { ...day, spots };
    });
  
    setState(prev => ({ ...prev, days: updatedDays }));
  };
  
  

  // }
  // number of spots inside day object
  // number available relates to appointments that dont have an interview booked
  // we should update the spots object when we cancel or book an interview
  // what type or data is spots, what is spots initial state?  A value of an object key

  // updateSpots, if updatespots is true, - 1 from spots.  If updateSpots is false, +1 to spots
  // access the spots object before setting state, much like with appointments in the bookInterview function

  // to update spots place .then in bookInterview (spots - 1) and cancelInterview (spot + 1)
  // if appointment is null spots = appointment

  // connection between daylist and appointments, is that days has an array of what appointments correspond to what interviews
  // for each appointment[element.appointments] {if (appointment[element.appointments = null ]) {days.spots++}}

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

