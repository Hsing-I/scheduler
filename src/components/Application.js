import React, { Fragment, useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";

export default function Application() {

  console.log("state", useApplicationData.state);
  const {state, setDay, bookInterview, cancelAppointment} = useApplicationData();
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    let interview = getInterview(state, appointment.interview);
    return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers} bookInterview={bookInterview} cancelAppointment={cancelAppointment}/>;
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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {schedule}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
  //});
}
