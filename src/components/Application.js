import React ,{ useState, useEffect } from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "6pm",
//     interview: {
//       student: "abbs",
//       interviewer: {
//         id: 4,
//         name: "fadd",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 6,
//     time: "10pm",
//     interview: {
//       student: "James",
//       interviewer: {
//         id: 8,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
// ];


export default function Application(props) {
 
  const [state, setState] = useState({
    Day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.Day);

  const setDay = Day => setState({ ...state, Day})
  const setDays = days => setState(prev => ({ ...prev, days }))
  

  useEffect(() => {
   
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log([all[1].data])
      setState(prev => ({...prev, Day:"Monday", days: all[0].data, appointments: all[1].data }));
    })
  }, [])

 
  let ListofAppointments = dailyAppointments.map(appointment => <Appointment key={appointment.id}  {...appointment} />) 

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
      {/* <Appointment key={last} id={dailyAppointments[3]['id']} time={dailyAppointments[3]['time']} interview={dailyAppointments[3]['interview']} /> */}
      </section>
    </main>
  );
}
