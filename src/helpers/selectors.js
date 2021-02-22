export function getAppointmentsForDay(state, day) {
  const results = [];
  state.days.forEach(d => {
    if (d.name === day) {
      d.appointments.forEach(app => {
        results.push(state.appointments[app]);
      });
    }
  });
  return results;
}

export function getInterview(state, interview) {
  const results = [];
  if (!interview) {
    return null;
  }
  results["student"] = interview.student;
  results["interviewer"] = state.interviewers[interview.interviewer];
  return results;
}

export function getInterviewersForDay(state, day) {
  const results = [];
  state.days.forEach(d => {
    if (d.name === day) {
      d.interviewers.forEach(interviewer => {
        results.push(state.interviewers[interviewer]);
      });
    }
  });
  return results;
}

export function getRemainingSpotsForDay(state, id) {
  const dayFound = state.days.find(day => day.appointments.includes(id));
  const days = state.days.map(day => {
    if (day.id === dayFound.id) {
      return {
        ...day,
        spots: day.appointments.filter(id => state.appointments[id].interview === null).length
      };
    } else {
      return day;
    }
  });
  return days;
}
