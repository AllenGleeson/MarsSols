import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Helper: Convert F to C
const toCelsius = f => ((f - 32) * 5) / 9;

const MarsTemperatureChart = ({ solsData }) => {
  const [unit, setUnit] = useState('F');

  const toggleUnit = () => {
    setUnit(prev => (prev === 'F' ? 'C' : 'F'));
  };

  // Get temperature data based on selected unit
  const formatTemp = (value) => (unit === 'C' ? toCelsius(value).toFixed(1) : value);

  const labels = solsData.map(day => `Sol Day ${day.sol}`);

  const data = {
    labels,
    datasets: [
      {
        label: `Min (°${unit})`,
        data: solsData.map(day => formatTemp(day.mn)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: `Avg (°${unit})`,
        data: solsData.map(day => formatTemp(day.av)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: `Max (°${unit})`,
        data: solsData.map(day => formatTemp(day.mx)),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        bodyColor: '#ffffff',
        titleColor: '#ffffff',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Temperature (°${unit})`,
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Sol day',
          color: '#ffffff'
        },
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className='w-100'>
      <button onClick={toggleUnit} className="btn btn-secondary mb-3">
        Show in °{unit === 'F' ? 'C' : 'F'}
      </button>
      <div style={{ minHeight: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MarsTemperatureChart;