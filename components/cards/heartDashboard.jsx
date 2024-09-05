"use client";
import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import HeartRateGraph from './HeartRateGraph';
import "../../sass/healthDashboard.scss";
import Bp from "../../components/cards/Bp"
import HealthProfile from "../../components/cards/HealthProfile"
import Mymedicine from "../../components/cards/Mymedicine"

export default function HealthDashboard() {
  const [heartRate, setHeartRate] = useState(72);
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 });

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
            <HeartRateGraph heartRate={heartRate} />
          </div>
        </div>
        <div className="center-panel">
        <Mymedicine/>
        </div>
        <div className="right-panel">
        <div className="glass-card bp-container">
            <Bp/>
          </div>
        </div>
      </div>
    </div>
  );
}