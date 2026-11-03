import React from 'react';
import { Chart } from 'react-chartjs-2';
import { COLORS } from './chartTheme';

// Shows each sol's min–max as a floating bar, with the average as a line.
// `rows` is [{ sol, mn, av, mx }]; `convert` optionally changes units.
const RangeChart = ({ rows, unit, axisLabel, convert = (v) => v, decimals = 1 }) => {
  const round = (v) => Number(convert(v).toFixed(decimals));

  const data = {
    labels: rows.map((row) => `Sol ${row.sol}`),
    datasets: [
      {
        type: 'line',
        label: 'Average',
        data: rows.map((row) => round(row.av)),
        borderColor: COLORS.avg,
        backgroundColor: COLORS.avg,
        borderWidth: 2,
        pointRadius: 4,
        tension: 0,
        order: 0,
      },
      {
        type: 'bar',
        label: 'Min – max range',
        data: rows.map((row) => [round(row.mn), round(row.mx)]),
        backgroundColor: COLORS.range,
        borderColor: COLORS.rangeBorder,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
        maxBarThickness: 48,
        order: 1,
      },
    ],
  };

  const options = {
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            Array.isArray(ctx.raw)
              ? ` Min ${ctx.raw[0]} ${unit} · Max ${ctx.raw[1]} ${unit}`
              : ` Average ${ctx.raw} ${unit}`,
        },
      },
    },
    scales: {
      y: { title: { display: true, text: `${axisLabel} (${unit})` } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="chart-box">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default RangeChart;
