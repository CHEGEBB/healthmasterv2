"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js
import '../../../sass/dashboard-doc.scss';

// Simulated patient data (ideally, you'd fetch this from a backend)
const patientDetails = {
  1: { name: "John Doe", age: 52, glucose: 150, bloodPressure: "140/90", history: "Hypertension, Diabetes", medications: "Metformin, Lisinopril" },
  2: { name: "Jane Smith", age: 45, glucose: 90, bloodPressure: "120/80", history: "No chronic conditions", medications: "None" },
};

// Sample historical data for vitals (normally fetched from a backend)
const patientAnalyticsData = {
  1: {
    glucoseLevels: [150, 145, 140, 155, 160],
    bloodPressureLevels: ["140/90", "135/85", "138/88", "145/90", "150/95"],
    predictions: { glucose: [162, 164], bloodPressure: ["155/97", "157/99"] },
    assessment: "risky"
  },
  2: {
    glucoseLevels: [90, 92, 89, 91, 90],
    bloodPressureLevels: ["120/80", "122/82", "118/78", "119/79", "120/80"],
    predictions: { glucose: [92, 91], bloodPressure: ["121/80", "122/81"] },
    assessment: "normal"
  }
};

export default function PatientDetailsPage({ params }) {
  const router = useRouter();
  const id = usePathname().split('/').pop();
  
  // Get patient details based on ID
  const patient = patientDetails[id] || {};
  const analytics = patientAnalyticsData[id] || {};

  if (!patient.name) {
    return <div>Patient not found.</div>;
  }

  // Prepare line chart data
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: 'Glucose Levels',
        data: analytics.glucoseLevels || [],
        borderColor: '#48bb78',
        fill: false,
      },
      {
        label: 'Blood Pressure Levels',
        data: analytics.bloodPressureLevels.map(bp => parseInt(bp.split('/')[0])),
        borderColor: '#edf2f7',
        fill: false,
      },
    ],
  };

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
          <div className="patient-details">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Glucose Level:</strong> {patient.glucose}</p>
            <p><strong>Blood Pressure:</strong> {patient.bloodPressure}</p>
            <p><strong>Medical History:</strong> {patient.history}</p>
            <p><strong>Medications:</strong> {patient.medications}</p>
          </div>

          {/* AI Analytics Section */}
          <h3>AI Analytics</h3>
          {/* Line chart for vitals trend */}
          <div className="analytics-section">
            <Line data={chartData} />
          </div>

          {/* Prediction Cards */}
          <div className="prediction-cards">
            <div className="card">
              <h4>Prediction for Glucose</h4>
              <p>Next Day: {analytics.predictions.glucose[0]}</p>
              <p>Day After: {analytics.predictions.glucose[1]}</p>
            </div>
            <div className="card">
              <h4>Prediction for Blood Pressure</h4>
              <p>Next Day: {analytics.predictions.bloodPressure[0]}</p>
              <p>Day After: {analytics.predictions.bloodPressure[1]}</p>
            </div>
          </div>

          {/* Assessment */}
          <div className={`assessment ${analytics.assessment}`}>
            <h4>Assessment</h4>
            <p>{analytics.assessment === "normal" ? "Trend is Normal" : 
                analytics.assessment === "risky" ? "Trend is Risky" : "Trend is Critical"}</p>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="call-btn">Call Patient</button>
            <button className="appointment-btn" onClick={() =>router.push('/appointments/create')}>Set Up Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
