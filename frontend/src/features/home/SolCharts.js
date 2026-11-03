import React, { useState } from 'react';
import './chartTheme';
import RangeChart from './RangeChart';
import WindRose from './WindRose';

const toCelsius = (f) => ((f - 32) * 5) / 9;

const TABS = [
  { id: 'temperature', label: 'TEMPERATURE' },
  { id: 'pressure', label: 'PRESSURE' },
  { id: 'wind', label: 'WIND' },
];

const SolCharts = ({ chartData }) => {
  const [activeTab, setActiveTab] = useState('temperature');
  const [unit, setUnit] = useState('°C');
  const sols = Object.keys(chartData.windDirections);
  const [windSol, setWindSol] = useState(sols[sols.length - 1]);

  return (
    <div>
      <h2 className="section-title">Weather at Elysium Planitia</h2>
      <ul className="nav nav-tabs" role="tablist">
        {TABS.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="charts">
        {activeTab === 'temperature' && (
          <>
            <div className="chart-toolbar">
              <p className="chart-note">Air temperature for each sol.</p>
              <div className="btn-group" role="group" aria-label="Temperature unit">
                {['°C', '°F'].map((u) => (
                  <button
                    key={u}
                    className={`btn btn-sm ${unit === u ? 'active' : ''}`}
                    aria-pressed={unit === u}
                    onClick={() => setUnit(u)}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <RangeChart
              rows={chartData.temperature}
              unit={unit}
              axisLabel="Temperature"
              convert={unit === '°C' ? toCelsius : undefined}
            />
          </>
        )}

        {activeTab === 'pressure' && (
          <>
            <p className="chart-note">
              Atmospheric pressure in pascals. Earth's air pressure at sea level is about 101,000 Pa, over 100 times more.
            </p>
            <RangeChart rows={chartData.pressure} unit="Pa" axisLabel="Pressure" />
          </>
        )}

        {activeTab === 'wind' && (
          <div className="wind-layout">
            <div>
              <h3 className="chart-heading">Wind speed</h3>
              <RangeChart rows={chartData.windSpeed} unit="m/s" axisLabel="Wind speed" />
            </div>
            <div>
              <h3 className="chart-heading">Wind direction</h3>
              <div className="sol-picker" role="group" aria-label="Choose a sol">
                {sols.map((sol) => (
                  <button
                    key={sol}
                    className={`btn btn-sm ${windSol === sol ? 'active' : ''}`}
                    aria-pressed={windSol === sol}
                    onClick={() => setWindSol(sol)}
                  >
                    Sol {sol}
                  </button>
                ))}
              </div>
              <WindRose windData={chartData.windDirections[windSol]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolCharts;
