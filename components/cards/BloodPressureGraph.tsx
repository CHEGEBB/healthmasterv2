import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "../../sass/bloodPressureGraph.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BloodPressureGraph({ bloodPressure }) {
  const data = {
    labels: ['60s ago', '50s ago', '40s ago', '30s ago', '20s ago', '10s ago', 'Now'],
    datasets: [
      {
        label: 'Systolic',
        data: [bloodPressure.systolic - 2, bloodPressure.systolic - 1, bloodPressure.systolic + 1, bloodPressure.systolic - 1, bloodPressure.systolic + 2, bloodPressure.systolic - 1, bloodPressure.systolic],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Diastolic',
        data: [bloodPressure.diastolic - 2, bloodPressure.diastolic - 1, bloodPressure.diastolic + 1, bloodPressure.diastolic - 1, bloodPressure.diastolic + 2, bloodPressure.diastolic - 1, bloodPressure.diastolic],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Real-time Blood Pressure',
      },
    },
  };

  return <Line options={options} data={data} />;
}