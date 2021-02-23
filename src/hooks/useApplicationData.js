import { useState, useEffect } from "react";
import axios from 'axios';

export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
      .then((data) => {
        updateSpots(state.days, id, "deleting");
        setState({ ...state, appointments })
      });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, { interview })
      .then((data) => {
        updateSpots(state.days, id, "booking");
        setState({ ...state, appointments })
      });
  };

  const updateSpots = (days, id, type) => {
    let updateSpotsDay;

    for (let day in days) {
      for (let app of days[day].appointments) {
        if (app === id) {
          updateSpotsDay = days[day];
          break;
        }
      }
    }

    if (type === "booking") {
      updateSpotsDay.spots--;
    } else if (type === "deleting") {
      updateSpotsDay.spots++;
    }
  };

  return { state, setDay, bookInterview, cancelInterview };
}