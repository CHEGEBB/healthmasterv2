"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/layout/header';
import Sidebar from '../../components/layout/sidebar';
import { Trash2, CheckCircle } from 'lucide-react';
import "../../sass/medications.scss";

export default function Page() {
  // Initial medication data
  const [medications, setMedications] = useState([
    {
      name: 'Atorvastatin',
      dosage: '10mg',
      image: '/medications/atorvastatin.png',
      prescribedDate: '2024-09-01',
      doctor: 'Dr. Smith',
      history: false,
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      image: '/medications/metformin.png',
      prescribedDate: '2024-08-21',
      doctor: 'Dr. Wilson',
      history: false,
    },
    // Add more sample medications here
  ]);

  const [history, setHistory] = useState([
    {
      name: 'Amlodipine',
      dosage: '5mg',
      prescribedDate: '2023-11-10',
      doctor: 'Dr. Kumar',
      image: '/medications/amlodipine.png',
    },
    // Add more past medications here
  ]);

  // Add medication
  const addMedication = (newMed) => {
    setMedications([...medications, newMed]);
  };

  // Mark as completed and move to history
  const markAsCompleted = (index) => {
    const completedMed = medications[index];
    setHistory([...history, { ...completedMed, history: true }]);
    setMedications(medications.filter((_, i) => i !== index));
  };

  // Delete medication
  const deleteMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="medications-page">
      <div className="header-cont-med">
        <Header />
      </div>
      <div className="content-wrapper-med">
        <div className="sidebar-cont-med">
          <Sidebar />
        </div>
        <div className="main-content-med">
          <h1>My Medications</h1>

          <div className="medications-grid">
            {medications.length === 0 ? (
              <p>No medications currently in use.</p>
            ) : (
              medications.map((med, index) => (
                <div key={index} className="med-card">
                  <Image src={med.image} alt={med.name} width={50} height={50} />
                  <div className="med-details">
                    <h3>{med.name}</h3>
                    <p>Dosage: {med.dosage}</p>
                    <p>Prescribed by: {med.doctor}</p>
                    <p>Date: {med.prescribedDate}</p>
                  </div>
                  <div className="med-actions">
                    <button onClick={() => markAsCompleted(index)} className="complete-btn">
                      <CheckCircle /> Mark as Taken
                    </button>
                    <button onClick={() => deleteMedication(index)} className="delete-btn">
                      <Trash2 /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="history-section">
            <h2>Medical History</h2>
            {history.length === 0 ? (
              <p>No previous medications.</p>
            ) : (
              <div className="medications-grid">
                {history.map((med, index) => (
                  <div key={index} className="med-card">
                    <Image src={med.image} alt={med.name} width={50} height={50} />
                    <div className="med-details">
                      <h3>{med.name}</h3>
                      <p>Dosage: {med.dosage}</p>
                      <p>Prescribed by: {med.doctor}</p>
                      <p>Date: {med.prescribedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
