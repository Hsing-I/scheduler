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

