import { useState, useEffect } from "react";
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
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const { spots, elemIndex } = spotsRemaining(id);
    const days = [...state.days]
    days[elemIndex].spots = spots - 1
    

    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then(() => setState({ ...state, appointments, days }))
    );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const { spots, elemIndex } = spotsRemaining(id);
    const days = [...state.days]
    days[elemIndex].spots = spots + 1

    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => setState({ ...state, appointments, days }))
    );
  }



  function spotsRemaining(id) {
  let spots = 0;
  let elemIndex;
    for (let element of state.days) {
      for (let appointmentSlot of element.appointments) {
        // console.log('appointmentSlot', appointmentSlot)
        // console.log('id', id)
        if (appointmentSlot === id) {
          elemIndex = element.id - 1;
          // console.log('elemIndex', elemIndex)
          const appointmentIDArray = element.appointments;
          // console.log(appointmentIDArray);
          for (let appointmentID of appointmentIDArray) {
            for (let appointment in state.appointments) {
              if (appointmentID === state.appointments[appointment].id) {
                if (state.appointments[appointment].interview === null) {
                  spots++; 
                }
              }
            }
          }

        }
      }
    }
    console.log(spots)
    return { spots , elemIndex };
  }

  return { state, setDay, bookInterview, cancelInterview };
}