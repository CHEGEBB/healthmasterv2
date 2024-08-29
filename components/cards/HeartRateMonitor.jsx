// components/HeartRateMonitor.jsx
'use client'
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const HeartRateMonitor = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: 'Heart Rate Monitor'
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 14 }, (_, i) => i + 1) // Sample data points
      },
      yAxis: {
        type: 'value',
        name: 'BPM',
      },
      series: [
        {
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
          type: 'line',
          smooth: true,
          color: '#ff4500'
        }
      ]
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }} ref={chartRef}></div>
  );
};

export default HeartRateMonitor;
