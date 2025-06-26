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
          '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#FFA500',
          '#00FF7F', '#FF4500', '#1E90FF', '#DA70D6', '#32CD32',
          '#FF1493', '#40E0D0', '#FFD700', '#ADFF2F', '#FF6347', '#4682B4'
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