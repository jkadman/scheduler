import {React, useEffect, useState} from "react";
import axios from "axios";

export default function useApplicationData() {
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

