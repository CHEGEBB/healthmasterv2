// components/HeartRateGraph.jsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HeartPulse } from 'lucide-react';
import 'chart.js/auto';
import '../../sass/heartRate.scss';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel';

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
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-diagnosis-container">
      <h1>Summary</h1>
      <div className="heart-diagnosis">
        <div className="heart-rate-box">
          <div className="heart-rate-value">{heartRate} bpm</div>
          <div className="heartbeat-chart">
            <Line data={data} options={{ animation: false, responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="heartbeat-monitor">
          <HeartPulse className="heart-pulse" size={30} />
          <div className="monitor-info">
            <h3>Heartbeat Monitor</h3>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="status-item">Normal</CarouselItem>
                <CarouselItem className="status-item">High</CarouselItem>
                <CarouselItem className="status-item">Low</CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="carousel-prev" />
              <CarouselNext className="carousel-next" />
            </Carousel>
          </div>
        </div>

        <div className="reports-section">
          <h2>Reports</h2>
          <div className="report-items">
            {/* Placeholder for report items, which could be images or data entries */}
            <div className="report-item">24 April 23</div>
            <div className="report-item">Blood Pressure</div>
            <div className="report-item">Cholesterol Levels</div>
          </div>
        </div>
      </div>
    </div>
  );
}
