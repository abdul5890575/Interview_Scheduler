import { useState, useEffect } from "react";
import axios from "axios";



export default function useApplicationData() {

  const [state, setState] = useState({
    Day: "Monday",
    days: [],
    appointments: {},
    interviewers :{}
  });

  function cancelInterview (id) {
    const interview1 = null;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview1 }
    };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

    return axios.delete(`/api/appointments/${id}`, {interview1})
    .then(function (response) {
      setState({...state, appointments})
    })
  }
  
  function bookInterview(id, interview) {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      

      return axios.put(`/api/appointments/${id}`, { interview })
      .then(function (response) {
        setState({...state, appointments})
      })
         
  }

  
    useEffect(() => {
        Promise.all([
        axios.get('/api/days'),
        axios.get('api/appointments'),
        axios.get('/api/interviewers')
        ]).then((all) => {
        setState(prev => ({...prev, Day:"Monday", days: all[0].data, appointments: all[1].data ,interviewers : all[2].data }));
        })
    }, [])
 

  return { state, setState,  bookInterview, cancelInterview, };
}