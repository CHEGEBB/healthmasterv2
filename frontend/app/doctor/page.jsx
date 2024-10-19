"use client";
import React, { useState } from 'react';
import "../../sass/dashboard.scss";
import { useRouter } from 'next/navigation';

// Simulated patient data
const patientsData = [
  { id: 1, name: "John Doe", glucose: 150, bloodPressure: "140/90", alert: true },
  { id: 2, name: "Jane Smith", glucose: 90, bloodPressure: "120/80", alert: false },
  // ...other patients
];

export default function DashboardPage() {
  const [patients, setPatients] = useState(patientsData);
  const router = useRouter();

  // Sorting patients by alerts first
  const sortedPatients = patients.sort((a, b) => b.alert - a.alert);

  const handlePatientClick = (id) => {
    router.push(`/patients/${id}`); // Navigate to the dynamic route for the patient
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search for a patient..."
          className="search-bar"
        />
        <div className="header-buttons">
          <button className="alerts-btn" onClick={() => router.push('/doctor/alerts')}>
            View Alerts
          </button>
          <button className="appointments-btn" onClick={() => router.push('/doctor/appointments')}>
            View Appointments
          </button>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Glucose Level</th>
                <th>Blood Pressure</th>
                <th>Alert</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map(patient => (
                <tr
                  key={patient.id}
                  className={patient.alert ? 'alert-row' : ''}
                  onClick={() => handlePatientClick(patient.id)} // Make row clickable
                >
                  <td>{patient.name}</td>
                  <td>{patient.glucose}</td>
                  <td>{patient.bloodPressure}</td>
                  <td>{patient.alert ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
