import React ,{ useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "6pm",
    interview: {
      student: "abbs",
      interviewer: {
        id: 4,
        name: "fadd",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 6,
    time: "10pm",
    interview: {
      student: "James",
      interviewer: {
        id: 8,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];


export default function Application(props) {
  const [Day, setDay] = useState("Monday");

 
  let ListofAppointments = appointments.map(appointment => <Appointment key={appointment.id}  {...appointment} />) 
  const last = appointments.length-1
    

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
      <DayList days={days} day={Day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {ListofAppointments}
      <Appointment key={last} id={appointments[3]['id']} time={appointments[3]['time']} interview={appointments[3]['interview']} />
      </section>
    </main>
  );
}
