"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js
import '@/sass/dashboard-doc.scss';

// Simulated patient data (ideally, you'd fetch this from a backend)
const patientDetails = {
  1: { 
    name: "John Doe", 
    age: 52, 
    glucose: 150, 
    bloodPressure: "140/90", 
    history: "Hypertension, Diabetes", 
    medications: "Metformin, Lisinopril" 
  },
  2: { 
    name: "Jane Smith", 
    age: 45, 
    glucose: 90, 
    bloodPressure: "120/80", 
    history: "No chronic conditions", 
    medications: "None" 
  },
  3: { 
    name: "Alice Johnson", 
    age: 60, 
    glucose: 180, 
    bloodPressure: "150/95", 
    history: "Diabetes, Heart Disease", 
    medications: "Insulin, Atenolol" 
  },
  4: { 
    name: "Robert Brown", 
    age: 33, 
    glucose: 110, 
    bloodPressure: "130/85", 
    history: "Pre-diabetic", 
    medications: "Metformin" 
  },
  5: { 
    name: "Michael Davis", 
    age: 58, 
    glucose: 200, 
    bloodPressure: "160/100", 
    history: "Hypertension, Diabetes", 
    medications: "Metformin, Losartan" 
  },
  6: { 
    name: "Emily Martinez", 
    age: 48, 
    glucose: 140, 
    bloodPressure: "135/85", 
    history: "Obesity", 
    medications: "None" 
  },
  7: { 
    name: "David Wilson", 
    age: 40, 
    glucose: 95, 
    bloodPressure: "118/78", 
    history: "No chronic conditions", 
    medications: "None" 
  },
  8: { 
    name: "Jessica Taylor", 
    age: 29, 
    glucose: 85, 
    bloodPressure: "115/75", 
    history: "Asthma", 
    medications: "Inhaler" 
  },
  9: { 
    name: "Charles Anderson", 
    age: 65, 
    glucose: 160, 
    bloodPressure: "145/92", 
    history: "Hypertension", 
    medications: "Lisinopril" 
  },
  10: { 
    name: "Sophia Thomas", 
    age: 54, 
    glucose: 130, 
    bloodPressure: "140/85", 
    history: "Diabetes", 
    medications: "Insulin" 
  },
  11: { 
    name: "James Moore", 
    age: 38, 
    glucose: 105, 
    bloodPressure: "125/80", 
    history: "No chronic conditions", 
    medications: "None" 
  },
  12: { 
    name: "Olivia White", 
    age: 62, 
    glucose: 190, 
    bloodPressure: "155/95", 
    history: "Heart Disease, Hypertension", 
    medications: "Atenolol, Lisinopril" 
  },
  13: { 
    name: "Daniel Harris", 
    age: 47, 
    glucose: 170, 
    bloodPressure: "140/90", 
    history: "Hypertension", 
    medications: "Losartan" 
  },
  14: { 
    name: "Mia Clark", 
    age: 35, 
    glucose: 115, 
    bloodPressure: "120/80", 
    history: "Pre-diabetic", 
    medications: "None" 
  },
  15: { 
    name: "William Lewis", 
    age: 72, 
    glucose: 210, 
    bloodPressure: "165/100", 
    history: "Diabetes, Hypertension", 
    medications: "Metformin, Lisinopril" 
  }
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
  },
  3: {
    glucoseLevels: [180, 185, 175, 170, 178],
    bloodPressureLevels: ["150/95", "155/100", "152/98", "150/95", "148/92"],
    predictions: { glucose: [182, 185], bloodPressure: ["155/97", "157/99"] },
    assessment: "risky"
  },
  4: {
    glucoseLevels: [110, 112, 108, 115, 113],
    bloodPressureLevels: ["130/85", "128/82", "132/86", "130/85", "131/83"],
    predictions: { glucose: [115, 116], bloodPressure: ["132/85", "133/86"] },
    assessment: "normal"
  },
  5: {
    glucoseLevels: [200, 195, 198, 202, 205],
    bloodPressureLevels: ["160/100", "158/99", "162/101", "165/102", "160/100"],
    predictions: { glucose: [208, 210], bloodPressure: ["165/105", "167/107"] },
    assessment: "critical"
  },
  6: {
    glucoseLevels: [140, 138, 136, 140, 142],
    bloodPressureLevels: ["135/85", "133/83", "136/84", "138/86", "140/88"],
    predictions: { glucose: [144, 146], bloodPressure: ["142/90", "144/92"] },
    assessment: "normal"
  },
  7: {
    glucoseLevels: [95, 97, 96, 95, 94],
    bloodPressureLevels: ["118/78", "119/79", "117/77", "116/76", "118/78"],
    predictions: { glucose: [96, 97], bloodPressure: ["119/78", "120/79"] },
    assessment: "normal"
  },
  8: {
    glucoseLevels: [85, 88, 86, 87, 85],
    bloodPressureLevels: ["115/75", "117/76", "116/75", "115/74", "116/75"],
    predictions: { glucose: [87, 88], bloodPressure: ["117/76", "118/77"] },
    assessment: "normal"
  },
  9: {
    glucoseLevels: [160, 165, 162, 159, 158],
    bloodPressureLevels: ["145/92", "148/94", "147/93", "146/92", "145/90"],
    predictions: { glucose: [163, 165], bloodPressure: ["149/95", "150/96"] },
    assessment: "risky"
  },
  10: {
    glucoseLevels: [130, 135, 132, 130, 128],
    bloodPressureLevels: ["140/85", "138/83", "139/84", "137/82", "136/80"],
    predictions: { glucose: [131, 133], bloodPressure: ["138/82", "139/83"] },
    assessment: "normal"
  },
  11: {
    glucoseLevels: [105, 102, 100, 106, 107],
    bloodPressureLevels: ["125/80", "123/78", "122/77", "124/79", "126/80"],
    predictions: { glucose: [109, 110], bloodPressure: ["127/81", "128/82"] },
    assessment: "normal"
  },
  12: {
    glucoseLevels: [190, 185, 188, 192, 195],
    bloodPressureLevels: ["155/95", "152/92", "153/93", "150/90", "148/88"],
    predictions: { glucose: [197, 199], bloodPressure: ["156/96", "158/98"] },
    assessment: "risky"
  },
  13: {
    glucoseLevels: [170, 168, 165, 172, 175],
    bloodPressureLevels: ["140/90", "142/92", "145/93", "147/95", "148/96"],
    predictions: { glucose: [178, 180], bloodPressure: ["150/97", "152/98"] },
    assessment: "risky"
  },
  14: {
    glucoseLevels: [115, 112, 114, 116, 117],
    bloodPressureLevels: ["120/80", "121/79", "122/81", "123/82", "120/80"],
    predictions: { glucose: [118, 119], bloodPressure: ["121/81", "122/82"] },
    assessment: "normal"
  },
  15: {
    glucoseLevels: [210, 215, 220, 225, 230],
    bloodPressureLevels: ["165/100", "168/102", "170/103", "172/105", "175/108"],
    predictions: { glucose: [235, 240], bloodPressure: ["177/110", "180/112"] },
    assessment: "critical"
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
