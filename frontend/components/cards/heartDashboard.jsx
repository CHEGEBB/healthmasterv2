"use client";
import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import HeartRateGraph from './HeartRateGraph';
import "../../sass/healthDashboard.scss";
import Bp from "../../components/cards/Bp"
import HealthProfile from "../../components/cards/HealthProfile"
import Mymedicine from "../../components/cards/Mymedicine"
import DynamicGreeting from "../../components/cards/DynamicGreeting"
import Schedule from "../../components/cards/Schedule"
import MyAlarms from "../../components/cards/MyAlarms"
import Wearable from "../../components/cards/Wearable"

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
    <div className="welcome">
    <DynamicGreeting userName="Sarah Ruth" /> 
      
    </div>
      <div className="dashboard-header">
        <h1>My Health Overview</h1>
      </div>
      <div className="dashboard-content">
        <div className="left-panel">
          <div className=" vital-signs">
            <HeartRateGraph heartRate={heartRate} />
          </div>
          <div className="schedule-patient">
            <Schedule/>
          </div>
        </div>
        <div className="center-panel">
        <div className=" bp-container">
            <Bp/>
          </div>
        <div className="user-stats">
          <HealthProfile heartRate={heartRate} bloodPressure={bloodPressure} />
        </div>
          <div className="alarms">
            <MyAlarms/>
          </div>
        </div>
        <div className="right-panel">
        <div className="medicine">
        <Mymedicine/>
        </div>
        <div className="wearable">
          <Wearable/>
        </div>

        </div>
      </div>
    </div>
  );
}