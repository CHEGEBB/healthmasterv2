"use client";
import React, { useState } from 'react';
import "@/sass/dashboard-doc.scss";
import { useRouter } from 'next/navigation';

// Simulated appointments data
const appointmentsData = [
  { id: 1, name: "John Doe", date: "2024-10-20", description: "Routine check-up", rescheduled: false },
  { id: 3, name: "Michael Johnson", date: "2024-10-21", description: "Follow-up on blood pressure", rescheduled: false },
  { id: 5, name: "William Brown", date: "2024-10-23", description: "Medication adjustment consultation", rescheduled: false },
  { id: 9, name: "Ava Anderson", date: "2024-10-25", description: "Routine check-up", rescheduled: false },
  { id: 12, name: "Mason Martin", date: "2024-10-24", description: "Diabetes management review", rescheduled: false },
  { id: 13, name: "Ethan Clark", date: "2024-10-26", description: "Annual health examination", rescheduled: false },
  { id: 15, name: "Lucas Walker", date: "2024-10-27", description: "Blood pressure monitoring", rescheduled: false }
];


export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const router = useRouter();

  const handleReschedule = (id) => {
    setAppointments(appointments.map(appointment => appointment.id === id ? { ...appointment, rescheduled: true } : appointment));
    alert("Rescheduled appointment!");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search for an appointment..."
          className="search-bar"
        />

        <div className="header-buttons">
        <button className="alerts-btn" onClick={() => router.push('/doctor')}>
            Home
          </button>
          <button className="alerts-btn" onClick={() => router.push('/doctor/alerts')}>
            View Alerts
          </button>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id} className={appointment.rescheduled ? 'rescheduled-row' : ''}>
                  <td>{appointment.name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.description}</td>
                  <td>
                    <button
                      className="reschedule-btn"
                      onClick={() => handleReschedule(appointment.id)}
                      disabled={appointment.rescheduled}
                    >
                      {appointment.rescheduled ? "Rescheduled" : "Reschedule"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
