const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: ['Paul', 'Gina', 'Newt']
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: ['Fred', 'Basmath', 'Heka']
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};
// export function getAppointmentsForDay(state, day) {
//   const newArr = [];
  
//   const filteredDay = state.days.filter(element => element.name === day)
//   if (filteredDay[0] === undefined) {
//     return newArr
//   }
//   filteredDay[0].appointments.forEach(app => {
//     newArr.push(state.appointments[app])
//   })

//   return newArr
// }

// export function getInterview(state, interview) {
//   let interviewObj = {};
  
//   if (!interview) {
//     return null
//   }

//   const intNum = state.interviewers[interview.interviewer]

//   interviewObj = {
//     student: interview.student,
//     interviewer: intNum
//   }

//   return interviewObj
  
// }

function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => day === 
item.name
);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysInterviewers = filteredDay.interviewers.map(
    interview => interviewers[interview]
  );
  return daysInterviewers;
} 

// export function getInterviewersForDay(state, day) {

// }
