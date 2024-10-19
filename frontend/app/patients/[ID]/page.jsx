"use client";
import React from 'react';
import "../../../sass/dashboard-doc.scss";
import { useRouter, usePathname } from 'next/navigation';

// Simulated patient data (ideally, you'd fetch this from a backend)
const patientDetails = {
  1: { name: "John Doe", age: 52, glucose: 150, bloodPressure: "140/90", history: "Hypertension, Diabetes", medications: "Metformin, Lisinopril" },
  2: { name: "Jane Smith", age: 45, glucose: 90, bloodPressure: "120/80", history: "No chronic conditions", medications: "None" },
  // ...other patients
};

export default function PatientDetailsPage() {
  const router = useRouter();
  const id = usePathname().split('/').pop();

  // Get patient details based on ID
  const patient = patientDetails[id] || {};

  if (!patient.name) {
    return <div>Patient not found.</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <button className="back-btn" onClick={() => router.push('/doctor')}>
          Back to Dashboard
        </button>
      </div>

      <div className="content">
        <div className="container-fluid">
          <h2>Patient Details</h2>
          <div className="cards">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Patient Information</div>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Health Metrics</div>
              </div>
              <div className="card-body">
                <p><strong>Glucose Level:</strong> {patient.glucose}</p>
                <p><strong>Blood Pressure:</strong> {patient.bloodPressure}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Medical History</div>
              </div>
              <div className="card-body">
                <p><strong>History:</strong> {patient.history}</p>
                <p><strong>Medications:</strong> {patient.medications}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
