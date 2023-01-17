export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  for (let elem in state.days) { // loop over all the objects in state.days
    if (state.days[elem].name === day) { // if state.days.name matches day: , 
      const daysAppointments = state.days[elem].appointments; // make daysAppointments the array of appointments for that day
      for (let appointment of daysAppointments) { // loop over each value(appointment id) in the array 
        // console.log(appointment);
        for (let key in state.appointments) { // loop over each object in state.appointments
          // console.log(state.appointments[key])
          if (appointment === state.appointments[key].id) { // if the appointment # matches the state.appointments.id #,
            // console.log(appointment, state.appointments[key])
            appointmentsArray.push(state.appointments[key]); // push that appointment into our array
          }
        }
      }
    }
  }
  return appointmentsArray;
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  for (let elem in state.days) {
    if (state.days[elem].name === day) {
      const daysInterviewers = state.days[elem].interviewers;
      for (let interviewer of daysInterviewers) {
        for (let key in state.interviewers) {
          if (interviewer === state.interviewers[key].id) {
            interviewersArray.push(state.interviewers[key]);
          }
        }
      }
    }
  }
  return interviewersArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewerObj = {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
  // for (let interviewer in state.interviewers) {
  //   if (state.interviewers[interviewer].id === interview.interviewer) {
  //     interviewerObj.student = interview.student;
  //     interviewerObj.interviewer = state.interviewers[interviewer];
  //   }
  // }
  return interviewerObj;
};
