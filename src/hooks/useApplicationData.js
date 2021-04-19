import { useState, useEffect } from "react";
import axios from "axios";



export default function useApplicationData() {

  const [state, setState] = useState({
    Day: "Monday",
    days: [],
    appointments: {},
    interviewers :{},
    spots: []
  });


  function getDaybyID (id) {
    //returns the seleted id object
    let days = state.days.filter((day) => {
      return day.appointments.includes(id)
    })
    return days[0]
  }


  function cancelInterview (id) {
    const interview1 = null;

    let day = getDaybyID(id)
    
    let newDay = { ...day, spots: day.spots + 1 };
    
    let newDays = [...state.days];

    for (let i = 0; i < state.days.length; i++){
      if(state.days[i].id === newDay.id){
        newDays.splice(i, 1, newDay)
      }
    }
  
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
      setState({...state, days: newDays,  appointments })
    })
  }
  
  function bookInterview(id, interview ) {

    let day = getDaybyID(id);

    let newDay = {...day, spots: day.spots - 1 };
    
    let newDays = [...state.days];

    for (let i = 0; i < state.days.length; i++){
      if(state.days[i].id === newDay.id){
        newDays.splice(i, 1, newDay)
      }
    }
   
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
        setState({...state, days: newDays, appointments})
      })
         
  }

  function EditInterviews(id, interview , edit = false) {

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
        setState({...state,  appointments})
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
 

  return { state, setState,  bookInterview, cancelInterview ,EditInterviews};
}