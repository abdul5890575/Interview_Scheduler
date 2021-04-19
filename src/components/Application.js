import React  from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/getInterview";
import { getInterviewersForDay } from "helpers/getInterviewersForDay";
import  useApplicationData  from "hooks/useApplicationData" 


export default function Application(props) {

  const {
    state,
    setState,
    bookInterview,
    cancelInterview,
    EditInterviews
  } = useApplicationData();

  console.log(state)
 
  const dailyAppointments = getAppointmentsForDay(state,state.Day);

  const setDay = Day => setState({ ...state, Day})
  const setDays = days => setState(prev => ({ ...prev, days }))
  
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
        EditInterviews={EditInterviews}
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
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
