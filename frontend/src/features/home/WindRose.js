import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { ACCENT, GRID } from './chartTheme';

const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

// A wind rose: one wedge per compass point, in compass order, with N at the top.
const WindRose = ({ windData }) => {
  const counts = Object.fromEntries(windData.map((d) => [d.compass_point, d.ct]));
  const values = COMPASS.map((point) => counts[point] || 0);
  const max = Math.max(...values, 1);

  const data = {
    labels: COMPASS,
    datasets: [
      {
        label: 'Readings',
        data: values,
        // Stronger color for more common directions.
        backgroundColor: values.map((v) => `rgba(255, 251, 0, ${0.15 + 0.7 * (v / max)})`),
        borderColor: ACCENT,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.raw.toLocaleString()} readings` },
      },
    },
    scales: {
      r: {
        startAngle: -360 / COMPASS.length / 2, // centre each wedge on its direction
        beginAtZero: true,
        grid: { color: GRID, circular: true },
        angleLines: { display: true, color: GRID },
        ticks: { display: false },
        pointLabels: { display: true, centerPointLabels: true, font: { size: 12 } },
      },
    },
  };

  return (
    <div className="chart-box chart-box--square">
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default WindRose;
