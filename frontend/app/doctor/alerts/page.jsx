"use client";
import React, { useState } from 'react';
import "../../../sass/dashboard-doc.scss";
import { useRouter } from 'next/navigation';

// Simulated alert data
const alertsData = [
  { id: 1, name: "John Doe", time: "10:30 AM", description: "Blood pressure elevated", responded: false },
  { id: 3, name: "Michael Johnson", time: "11:00 AM", description: "Glucose levels high", responded: false },
  { id: 5, name: "William Brown", time: "9:45 AM", description: "Critical blood pressure and glucose levels", responded: false },
  { id: 9, name: "Ava Anderson", time: "8:15 AM", description: "Blood pressure elevated", responded: false },
  { id: 12, name: "Mason Martin", time: "1:30 PM", description: "Blood pressure elevated", responded: false },
  { id: 13, name: "Ethan Clark", time: "3:00 PM", description: "Glucose levels high", responded: false },
  { id: 15, name: "Lucas Walker", time: "2:45 PM", description: "Critical blood pressure and glucose levels", responded: false }
];


export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData);
  const router = useRouter();

  const handleRespond = (id) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, responded: true } : alert));
    alert("Responded to alert!");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search for an alert..."
          className="search-bar"
        />

        <div className="header-buttons">
        <button className="appointments-btn" onClick={() => router.push('/doctor')}>
            Home
          </button>
          <button className="appointments-btn" onClick={() => router.push('/doctor/appointments')}>
            View Appointments
          </button>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Time Created</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.id} className={alert.responded ? 'responded-row' : ''}>
                  <td>{alert.name}</td>
                  <td>{alert.time}</td>
                  <td>{alert.description}</td>
                  <td>
                    <button
                      className="respond-btn"
                      onClick={() => handleRespond(alert.id)}
                      disabled={alert.responded}
                    >
                      {alert.responded ? "Responded" : "Respond"}
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
