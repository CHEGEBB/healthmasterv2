"use client";
import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import HeartModelComponent from '../../components/models/HeartModel';
import HeartRateGraph from './HeartRateGraph';
import BloodPressureGraph from './BloodPressureGraph';
import AppointmentCalendar from './AppointmentCalendar';
import WeeklyHeartRate from './WeeklyHeartRate';
import "../../sass/healthDashboard.scss";

export default function HealthDashboard() {
  const [selectedOrgan, setSelectedOrgan] = useState('heart');
  const [heartRate, setHeartRate] = useState(72);
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 });
  const [nextCheckup, setNextCheckup] = useState('2024-09-15');

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => prev + Math.floor(Math.random() * 3) - 1);
      setBloodPressure(prev => ({
        systolic: prev.systolic + Math.floor(Math.random() * 3) - 1,
        diastolic: prev.diastolic + Math.floor(Math.random() * 3) - 1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="health-dashboard">
      <div className="dashboard-header">
        <h1>My Health Overview</h1>
        <div className="user-profile">
          <Image src="/assets/images/3.jpg" width={40} height={40} alt="User Avatar" className="avatar" />
          <span>John Doe</span>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="left-panel">
          <div className="glass-card vital-signs">
            <h2>Heart Rate</h2>
            <HeartRateGraph heartRate={heartRate} />
          </div>
          <div className="glass-card vital-signs">
            <h2>Blood Pressure</h2>
            <BloodPressureGraph bloodPressure={bloodPressure} />
          </div>
        </div>
        <div className="center-panel">
          <div className="glass-card model-container">
            <HeartModelComponent setSelectedOrgan={setSelectedOrgan} />
          </div>
        </div>
        <div className="right-panel">
          <div className="glass-card organ-info">
            <h2>{selectedOrgan.charAt(0).toUpperCase() + selectedOrgan.slice(1)} Information</h2>
            <p>Interactive 3D model. Hover over different parts to learn more.</p>
          </div>
          <div className="glass-card appointment">
            <h2>Appointments</h2>
            <AppointmentCalendar nextCheckup={nextCheckup} />
          </div>
          <div className="glass-card weekly-stats">
            <h2>Weekly Heart Rate</h2>
            <WeeklyHeartRate />
          </div>
        </div>
      </div>
    </div>
  );
}