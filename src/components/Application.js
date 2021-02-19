import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";

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
    time: "3pm",
    interview: {
      student: "Grover McKinney",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "3:30pm",
    interview: {
      student: "Loren Mansell",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },
  {
    id: 5,
    time: "2:15pm",
    interview: {
      student: "Rebecca Pineda",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  }
];

export default function Application(props) {
  const [currentday, setCurrentDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const testURL = 'http://localhost:8001/api/days';
    axios.get(testURL).then(response => {
      console.log(response.data);
      setDays([...response.data])
    });
  }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
             src="images/logo.png"
             alt="Interview Scheduler"
        />
             
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days}
                   day={currentday}
                   setDay={setCurrentDay}
          />
        </nav>
        
        <img className="sidebar__lhl sidebar--centered"
             src="images/lhl.png"
             alt="Lighthouse Labs"
        />
      </section>
      
      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment} />

          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
