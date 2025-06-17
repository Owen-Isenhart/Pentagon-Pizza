'use client';

import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function getThreatColor(value: number, min: number, max: number): string {
  const startColor = [107, 194, 85]; // g
  const midColor = [255, 215, 0];   // y
  const endColor = [239, 68, 68];   // r

  const mid = min + (max - min) / 2;
  let r, g, b;

  if (value <= mid) {
    const localPercentage = (value - min) / (mid - min);
    r = startColor[0] + localPercentage * (midColor[0] - startColor[0]);
    g = startColor[1] + localPercentage * (midColor[1] - startColor[1]);
    b = startColor[2] + localPercentage * (midColor[2] - startColor[2]);
  } else {
    const localPercentage = (value - mid) / (max - mid);
    r = midColor[0] + localPercentage * (endColor[0] - midColor[0]);
    g = midColor[1] + localPercentage * (endColor[1] - midColor[1]);
    b = midColor[2] + localPercentage * (endColor[2] - midColor[2]);
  }

  return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}


export default function Conclusion({ value }: { value: number }) {
  const min = -6;
  const max = 18;

  const labels = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const data = {
    labels,
    datasets: [
      {
        label: 'Threat Level',
        data: labels.map((label) => (label === value ? 1 : 0.1)),
        
        backgroundColor: labels.map((label) => getThreatColor(label, min, max)),
        
        borderWidth: 0,
        barThickness: 10,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x',
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        max: 1.2, 
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
          }
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  const interpretValue = () => {
    if (value >= 14){ // this can be achieved many ways but generally just means at least 5 are very busy 
      return 'High';
    }
    else if (value >= 8){
      return 'Moderate'
    }
    else{
      return 'Low'
    }
  }

  return (
    <div className="flex flex-col border-2 border-outline border-dashed rounded-md bg-light-background p-6 w-full">
      <h3 className='text-2xl text-start font-semibold mb-3'>Threat Level: {interpretValue()}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}