"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusDonutChartProps {
  veryGood: number;
  good: number;
  moderate: number;
  bad: number;
  veryBad: number;
}

export default function DonutChart({ veryGood, good, moderate, bad, veryBad }: StatusDonutChartProps) {
  const data = {
    labels: ['Very Good', 'Good', 'Moderate', 'Bad', 'Very Bad'],
    datasets: [
      {
        label: 'Pizza Places Status',
        data: [veryGood, good, moderate, bad, veryBad],
        backgroundColor: [
          '#22c55e', // green-500 for Very Good
          '#86efac', // green-300 for Good
          '#eab308', // yellow-500 for Moderate
          '#f87171', // red-400 for Bad
          '#ef4444', // red-500 for Very Bad
        ],
        borderColor: [ 
          '#22c55e',
          '#86efac',
          '#eab308',
          '#f87171',
          '#ef4444',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false, // the legend looked terrible so i got rid of it
        position: 'bottom' as const, 
        labels: {
            color: '#ffffff', 
        }
      },
    },
  };

  return (
    <div className='relative h-full w-full'>
      <Doughnut data={data} options={options} />
    </div>
  );
}