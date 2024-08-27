import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HIVDashboard = ({ userData }) => {
  // This would typically come from an API, we're using mock data for this example
  const mockData = [
    { date: '2023-05-01', cd4Count: 500, viralLoad: 1000 },
    { date: '2023-05-15', cd4Count: 550, viralLoad: 800 },
    { date: '2023-06-01', cd4Count: 600, viralLoad: 600 },
  ];

  return (
    <div>
      <div className="p-4 mb-4 bg-blue-100 border-l-4 border-blue-500" role="alert">
        <p className="font-bold">Medication Reminder</p>
        <p>Remember to take your HIV medication at {userData.medicationTime}</p>
      </div>

      <div className="p-4 mb-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">CD4 Count and Viral Load Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="cd4Count" stroke="#8884d8" name="CD4 Count" />
            <Line yAxisId="right" type="monotone" dataKey="viralLoad" stroke="#82ca9d" name="Viral Load" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-2 text-lg font-semibold">HIV Management Tips</h3>
        <ul className="pl-5 list-disc">
          <li>Take your medication consistently as prescribed</li>
          <li>Attend all scheduled check-ups</li>
          <li>Maintain a healthy diet and exercise routine</li>
          <li>Practice safe sex to prevent transmission</li>
        </ul>
      </div>
    </div>
  );
};

export default HIVDashboard;