export function getAppointmentsForDay(state, day) {
  let appointmentsToFind = [];
  let appointmentsForDay = [];

  for (let currentDay of state.days) {
    if (currentDay.name === day) {
      appointmentsToFind = currentDay.appointments;
      break;
    }
  }

  for (let appointment of appointmentsToFind) {
    appointmentsForDay.push(state.appointments[appointment])
  }

  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewerInfo = {};

  for (let i in state.interviewers) {
    if (state.interviewers[i].id === interview.interviewer) {
      interviewerInfo.student = interview.student;
      interviewerInfo.interviewer = state.interviewers[i];
      break;
    }
  }

  return interviewerInfo;
}