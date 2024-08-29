"use client";

import React, { useState, useEffect } from 'react';
import { Activity, FileText, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../../sass/BloodPressureMonitor.scss';

const BloodPressureMonitor = () => {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [pulse, setPulse] = useState(72);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateValues = () => {
      setSystolic(Math.floor(Math.random() * 40) + 100);
      setDiastolic(Math.floor(Math.random() * 20) + 70);
      setPulse(Math.floor(Math.random() * 20) + 60);
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };

    updateValues();
    const interval = setInterval(updateValues, 3000);
    return () => clearInterval(interval);
  }, []);

  const getBloodPressureCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return "normal";
    if (systolic < 130 && diastolic < 80) return "elevated";
    if (systolic < 140 || diastolic < 90) return "high-stage-1";
    if (systolic >= 140 || diastolic >= 90) return "high-stage-2";
    return "crisis";
  };

  const category = getBloodPressureCategory(systolic, diastolic);

  const gaugeData = [
    { name: 'Low', value: 90, color: '#4ade80' },
    { name: 'Normal', value: 30, color: '#facc15' },
    { name: 'High', value: 30, color: '#fb923c' },
    { name: 'Very High', value: 30, color: '#f87171' },
    { name: 'Critical', value: 30, color: '#ef4444' },
  ];

  const systolicAngle = (systolic - 70) * 1.64; // Map 70-190 to 0-180 degrees

  return (
    <div className="blood-pressure-monitor">
      <h1>Blood Pressure Monitor</h1>
      <div className="main-display">
        <div className="bp-gauge">
          <div className="gauge-chart">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Pie
                  data={[{ value: 1 }]}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={180 - systolicAngle}
                  innerRadius={0}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#0a192f" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bp-values">
            <div className="pressure">{systolic}/{diastolic} mmHg</div>
            <div className="pulse">{pulse} BPM</div>
          </div>
        </div>
        <div className="bp-info">
          <h3>Blood Pressure Category</h3>
          <div className={`category ${category}`}>
            {category.replace('-', ' ').toUpperCase()}
          </div>
        </div>
      </div>
      <div className="secondary-display">
        <div className="time-card">
          <Clock className="icon" />
          <time>{time}</time>
        </div>
        <div className="history-card">
          <h3>Recent Readings</h3>
          <ul>
            <li>08:00 - 118/78 mmHg</li>
            <li>12:00 - 122/80 mmHg</li>
            <li>16:00 - 120/79 mmHg</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureMonitor;