"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const presetGraphs = {
  'very good': [128, 64, 32, 16, 8, 4, 2],    // exponentially down
  'good':      [62, 60, 58, 60, 62, 58, 54],  // wavy down
  'moderate':  [40, 42, 38, 40, 45, 40, 42],  // wavy middle
  'bad':       [50, 60, 65, 60, 58, 60, 65],  // wavy up
  'very bad':  [2, 4, 8, 16, 32, 64, 128],    // exponentially up
  'default':   [50, 50, 50, 50, 50, 50, 50]   // flat
};

// The props interface now only needs the status
interface MiniStockChartProps {
  status: string;
}

export default function Chart({ status }: MiniStockChartProps) {
  const chartData = presetGraphs[status as keyof typeof presetGraphs] || presetGraphs['default'];

  const getChartColors = () => {
    switch (status) {
        case 'very good':
        case 'good':
          return { borderColor: '#01E212', backgroundColor: 'rgba(34, 197, 94, 0.2)' };
        case 'moderate':
          return { borderColor: '#FFC90E', backgroundColor: 'rgba(234, 179, 8, 0.2)' };
        case 'bad':
        case 'very bad':
          return { borderColor: '#FF5000', backgroundColor: 'rgba(239, 68, 68, 0.2)' };
        default:
          return { borderColor: 'rgb(156, 163, 175)', backgroundColor: 'rgba(156, 163, 175, 0.2)' };
      }
  };

  const colors = getChartColors();

  const data = {
    labels: chartData.map(() => ''),
    datasets: [
      {
        label: 'Busyness',
        data: chartData, 
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return <Line options={options} data={data} />;
}