import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Activity } from 'lucide-react';
import 'chart.js/auto';

const BloodPressureMonitor = () => {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [data, setData] = useState({
    labels: Array.from({ length: 20 }, (_, i) => i),
    datasets: [
      {
        label: 'Systolic',
        data: Array(20).fill(120),
        borderColor: '#10b981',
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
      {
        label: 'Diastolic',
        data: Array(20).fill(80),
        borderColor: '#3b82f6',
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newSystolic = Math.floor(Math.random() * 40) + 100;
      const newDiastolic = Math.floor(Math.random() * 20) + 70;
      setSystolic(newSystolic);
      setDiastolic(newDiastolic);
      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data.slice(1), newSystolic],
          },
          {
            ...prevData.datasets[1],
            data: [...prevData.datasets[1].data.slice(1), newDiastolic],
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
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const getBloodPressureCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return "Normal";
    if (systolic < 130 && diastolic < 80) return "Elevated";
    if (systolic < 140 || diastolic < 90) return "High (Stage 1)";
    if (systolic >= 140 || diastolic >= 90) return "High (Stage 2)";
    return "Hypertensive Crisis";
  };

  return (
    <div className="p-6 text-white bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Blood Pressure Monitor</h1>
      <div className="flex items-center mb-4">
        <Activity className="mr-2 text-blue-500" size={24} />
        <div className="text-3xl font-bold">{systolic}/{diastolic} mmHg</div>
      </div>
      <div className="h-40 mb-4">
        <Line data={data} options={options} />
      </div>
      <div className="text-lg">
        Status: <span className="font-semibold">{getBloodPressureCategory(systolic, diastolic)}</span>
      </div>
    </div>
  );
};

export default BloodPressureMonitor;