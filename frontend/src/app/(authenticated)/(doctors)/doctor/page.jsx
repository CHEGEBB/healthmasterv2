"use client";
import React, { useState } from 'react';
import "@/sass/dashboard.scss";
import { useRouter } from 'next/navigation';

// Simulated patient data
const patientsData = [
  { id: 1, name: "John Doe", glucose: 150, bloodPressure: "140/90", alert: true },
  { id: 2, name: "Jane Smith", glucose: 90, bloodPressure: "120/80", alert: false },
  { id: 3, name: "Michael Johnson", glucose: 178, bloodPressure: "148/92", alert: true },
  { id: 4, name: "Emily Davis", glucose: 113, bloodPressure: "131/83", alert: false },
  { id: 5, name: "William Brown", glucose: 205, bloodPressure: "160/100", alert: true },
  { id: 6, name: "Olivia Wilson", glucose: 142, bloodPressure: "140/88", alert: false },
  { id: 7, name: "Sophia Moore", glucose: 94, bloodPressure: "118/78", alert: false },
  { id: 8, name: "James Taylor", glucose: 85, bloodPressure: "116/75", alert: false },
  { id: 9, name: "Ava Anderson", glucose: 158, bloodPressure: "145/90", alert: true },
  { id: 10, name: "Isabella Thomas", glucose: 128, bloodPressure: "136/80", alert: false },
  { id: 11, name: "Benjamin Harris", glucose: 107, bloodPressure: "126/80", alert: false },
  { id: 12, name: "Mason Martin", glucose: 195, bloodPressure: "148/88", alert: true },
  { id: 13, name: "Ethan Clark", glucose: 175, bloodPressure: "148/96", alert: true },
  { id: 14, name: "Mia Lewis", glucose: 117, bloodPressure: "120/80", alert: false },
  { id: 15, name: "Lucas Walker", glucose: 230, bloodPressure: "175/108", alert: true }
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
