import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HypertensionDashboard = ({ userData }) => {
  // Mock data for blood pressure readings
  const mockData = [
    { date: '2023-05-01', systolic: 130, diastolic: 85 },
    { date: '2023-05-15', systolic: 128, diastolic: 83 },
    { date: '2023-06-01', systolic: 125, diastolic: 80 },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-green-100 border-l-4 border-green-500" role="alert">
        <p className="font-bold">Blood Pressure Check Reminder</p>
        <p>Remember to check your blood pressure today</p>
      </div>

      <div className="p-4 mb-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">Blood Pressure Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">Hypertension Management Tips</h3>
        <ul className="pl-5 list-disc">
          <li>Monitor your blood pressure regularly</li>
          <li>Take your medication as prescribed</li>
          <li>Maintain a low-sodium diet</li>
          <li>Exercise regularly and manage stress</li>
        </ul>
      </div>
    </div>
  );
};

export default HypertensionDashboard;