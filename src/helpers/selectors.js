
export function getAppointmentsForDay(state, day) {
  const newArr = [];
  
  const filteredDay = state.days.filter(element => element.name === day);
  if (filteredDay[0] === undefined) {
    return newArr;
  }
  filteredDay[0].appointments.forEach(app => {
    newArr.push(state.appointments[app]);
  })

  return newArr;
};

export function getInterview(state, interview) {
  let interviewObj = {};
  
  if (!interview) {
    return null;
  }

  const intNum = state.interviewers[interview.interviewer];

  interviewObj = {
    student: interview.student,
    interviewer: intNum
  };

  return interviewObj;
  
};

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => day === item.name);

  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysInterviewers = filteredDay.interviewers.map(
    interviewer => interviewers[interviewer]
  );
  return daysInterviewers;
};


