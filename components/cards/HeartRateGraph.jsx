// components/HeartRateGraph.jsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HeartPulse } from 'lucide-react';
import 'chart.js/auto';
import '../../sass/heartRate.scss';
import Image from 'next/image';

export default function HeartRateGraph() {
  const [heartRate, setHeartRate] = useState(120);
  const [data, setData] = useState({
    labels: Array.from({ length: 20 }, (_, i) => i),
    datasets: [
      {
        label: 'Heart Rate',
        data: Array(20).fill(80),
        fill: false,
        borderColor: '#fff',
        pointRadius: 0, 
        pointHoverRadius: 0, 
        tension: 0.4,
      },
    ],
  });

  // Update heart rate data to simulate real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartRate = Math.floor(Math.random() * 40) + 80; // Random value between 80 and 120
      setHeartRate(newHeartRate);
      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data.slice(1), newHeartRate],
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Hide X-axis
      },
      y: {
        display: false, // Hide Y-axis
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="heart-diagnosis-container">
      <h1>Summary</h1>
      <div className="heart-diagnosis">
        <div className="heart-rate-box">
          <div className="heart-rate-value">{heartRate} bpm</div>
          <div className="heartbeat-chart">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="heartbeat-monitor">
        <div className="pulse">
        <HeartPulse className="heart-pulse" size={30} />
        </div>
          <div className="monitor-info">
            <h3>Heartbeat Monitor</h3>
            <h4>Normal</h4>
          </div>
        </div>
      </div>

      <div className="reports-section">
        <h2>Reports</h2>
        <div className="report-items">
          {/* Placeholder for report items, which could be images or data entries */}
          <div className="report-item">
            <Image
              src="/assets/images/3.jpg"
              alt="Blood Pressure Report"
              width={100}
              height={100}
            />
            <p>24 April 23</p>
          </div>
          <div className="report-item">Blood Pressure</div>
          <div className="report-item">Cholesterol Levels</div>
        </div>
      </div>
    </div>
  );
}