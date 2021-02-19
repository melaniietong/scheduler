export function getAppointmentsForDay(state, day) {
  let appointmentsToFind = [];
  let appointmentsForDay = [];

  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      appointmentsToFind = currentDay.appointments;
    }
  }

  for (let appointment of appointmentsToFind) {
    appointmentsForDay.push(state.appointments[appointment])
  }

  return appointmentsForDay;
}