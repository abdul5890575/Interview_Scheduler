import React ,{ useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/getInterview";
import { getInterviewersForDay } from "helpers/getInterviewersForDay"


export default function Application(props) {
 
  const [state, setState] = useState({
    Day: "Monday",
    days: [],
    appointments: {},
    interviewers :{}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.Day);

  const setDay = Day => setState({ ...state, Day})
  const setDays = days => setState(prev => ({ ...prev, days }))

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

    axios.delete(`/api/appointments/${id}`, {interview1})
    .then(function (response) {
      setState({...state, appointments})
    })
    .catch(function (error) {
      console.log(error);
    });
     
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
      

      axios.put(`/api/appointments/${id}`, { interview })
      .then(function (response) {
        setState({...state, appointments})
        console.log(state)
      })
      .catch(function (error) {
        console.log(error);
      });

      
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

  
  let ListofAppointments = dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      let dailyinterviewers = getInterviewersForDay(state,state.Day)

      return (
        <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyinterviewers}
        bookInterview={bookInterview}
        cancelInterview ={cancelInterview}
      />
    ); 
  });
    

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList days={state.days} day={state.Day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {ListofAppointments}
      </section>
    </main>
  );
}
