import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../sass/appointmentCalendar.scss";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export default function AppointmentCalendar({ nextCheckup }) {
  const events = [
    {
      start: moment(nextCheckup).toDate(),
      end: moment(nextCheckup).add(1, 'hours').toDate(),
      title: "Next Checkup",
    },
  ];

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 300 }}
    />
  );
}