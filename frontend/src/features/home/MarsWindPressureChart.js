import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MarsWindPressureChart = ({ solsData }) => {
  const labels = solsData.map(day => `Sol ${day.sol}`);
  const data = {
    labels,
    datasets: [
      {
        label: 'Min',
        data: solsData.map(day => day.mn),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Avg',
        data: solsData.map(day => day.av),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Max',
        data: solsData.map(day => day.mx),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        bodyColor: '#ffffff',
        titleColor: '#ffffff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pressure (Pa)',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Sol',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };
  return <div style={{ minHeight: '300px' }}><Bar data={data} options={options} /></div>;
};

export default MarsWindPressureChart;