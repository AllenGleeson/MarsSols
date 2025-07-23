import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PolarAreaController
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PolarAreaController);

const CompassPolarAreaChart = ({ windData }) => {
  const labels = [];
  const counts = [];

  Object.entries(windData).forEach(([key, val]) => {
    if (key !== 'most_common' && val?.compass_point && val?.ct) {
      labels.push(val.compass_point);
      counts.push(val.ct);
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Wind Direction Frequency',
        data: counts,
        backgroundColor: [
          'rgba(255, 99, 133, 0.4)', 'rgba(54, 163, 235, 0.58)', 'rgba(255, 207, 86, 0.58)', 'rgba(137, 43, 226, 0.6)', 'rgba(255, 166, 0, 0.58)',
          'rgba(0, 255, 127, 0.4)', 'rgba(255, 69, 0,0.4)', 'rgba(30, 144, 255,0.4)', 'rgba(218, 112, 214,0.4)', 'rgba(50, 205, 50,0.4)',
          'rgba(255, 20, 147, 0.4)', 'rgba(64, 224, 208, 0.4)', 'rgba(255, 215, 0,0.4)', 'rgba(173, 255, 47,0.4)', 'rgba(255, 99, 71,0.4)', 'rgba(70, 130, 180,0.4)'
        ],
        borderColor: '#fff',
        borderWidth: 0,
        hoverOffset: 10,
        hoverBorderColor: '#d6d6d6',
        hoverBorderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#ffffff', // White legend text
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#aaa',
        borderWidth: 1,
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw} times`
        }
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutBounce',
    },
    scales: {
      r: {
        beginAtZero: true,
        pointLabels: {
          color: '#ffffff', // Labels around the circle
        },
        ticks: {
          color: '#ffffff',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          circular: true,
        }
      }
    }
  };

  return <PolarArea data={data} options={options} />;
};

export default CompassPolarAreaChart;