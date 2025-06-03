// LineCloseChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import Spinner from './Spinner';

// 필수 등록
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale
);

export default function LineCloseChart({ stockData }) {
  if (!stockData || stockData.length === 0) {
    return (
      <Spinner />
    );
  }

  const chartData = {
    labels: stockData.map((d) => new Date(d.date)),
    datasets: [
      {
        label: 'Close Price',
        data: stockData.map((d) => d.close),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.3,
        showLabel: false 
      },
    ],
  };

  const options = {
    responsive: true,

    scales: {
      x: {
        type: 'time', // ⏰ 시간 기반 X축
        time: {
          unit: 'month', // 일 단위
          tooltipFormat: 'yyyy-MM-dd',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
        },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Line data={chartData} options={options} className='bg-white' />
    </div>
  );
}
