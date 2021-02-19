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
  /*const results = [];
  state.days.forEach(d => {
    if (d.name === day) {
      d.appointments.forEach(app => {
        results.push(state.appointments[app]);
      });
    }
  });
  return results;*/
}
