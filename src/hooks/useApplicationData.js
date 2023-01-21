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


    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        const updatedDays = updateSpot(state.day, state.days, "REMOVE_SPOT", id, state.appointments)
        setState({...state, appointments, days: updatedDays})
      })
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

    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const updatedDays = updateSpot(state.day, state.days, "ADD_SPOT", id, state.appointments)
        setState({...state, appointments, days: updatedDays})
      })
    );
  }


  function updateSpot(weekday, days, action, id, appointments) {
    if (action === "REMOVE_SPOT") {
      const updatedStatesArray = days.map(day => {
        return {
          ...day, 
          spots: spotsUpdate(weekday, day, action, id, appointments)
        }
      })
      console.log(updatedStatesArray)
      return updatedStatesArray
    }
    if (action === "ADD_SPOT") {
      const updatedStatesArray = days.map(day => {
        return {
          ...day, 
          spots: spotsUpdate(weekday, day, action, id, appointments)
        }
      })
      console.log(updatedStatesArray)
      return updatedStatesArray
    }
  }

  function spotsUpdate(weekday, day, action, id, appointments) {
    let spot = day.spots;
    if (weekday === day.name && action === "REMOVE_SPOT" && appointments[id].interview !== null) {
      return spot
    } else if (weekday === day.name && action === "REMOVE_SPOT" && appointments[id].interview === null) {
      return spot - 1
    } else if (weekday === day.name && action === "ADD_SPOT" && appointments[id].interview !== null) {
      return spot + 1
    } else {
      return spot
    }
  }

  return { state, setDay, bookInterview, cancelInterview };
}