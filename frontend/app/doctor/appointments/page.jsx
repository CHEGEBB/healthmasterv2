"use client";
import React, { useState } from 'react';
import "../../../sass/dashboard-doc.scss";
import { useRouter } from 'next/navigation';

// Simulated appointments data
const appointmentsData = [
  { id: 1, name: "John Doe", date: "2024-10-20", description: "Routine check-up", rescheduled: false },
  { id: 2, name: "Jane Smith", date: "2024-10-22", description: "Follow-up on glucose levels", rescheduled: false },
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
