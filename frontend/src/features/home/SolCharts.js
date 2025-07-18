import React, { useState } from 'react';
import MarsTemperatureChart from './MarsTemperatureChart';
import MarsWindPressureChart from './MarsWindPressureChart';
import CompassPolarAreaChart from './CompassPolarAreaChart';
import MarsWindSpeedChart from './MarsWindSpeedChart';

const SolCharts = ({ chartData }) => {
  const [activeTab, setActiveTab] = useState('temperature');
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'temperature' ? 'active' : ''}`}
            onClick={() => setActiveTab('temperature')}
          >
            TEMPERATURE
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'windPressure' ? 'active' : ''}`}
            onClick={() => setActiveTab('windPressure')}
          >
            PRESSURE
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'windSpeedDirection' ? 'active' : ''}`}
            onClick={() => setActiveTab('windSpeedDirection')}
          >
            WIND
          </button>
        </li>
      </ul>
      <div className="charts mt-4">
        {activeTab === 'temperature' && (
          <MarsTemperatureChart solsData={chartData.temperature} />
        )}
        {activeTab === 'windPressure' && (
          <MarsWindPressureChart solsData={chartData.pressure} />
        )}
        {activeTab === 'windSpeedDirection' && (
          <div className="row">
            <div className="col-12">
              <h5>Wind Speed</h5>
              <MarsWindSpeedChart windSpeed={chartData.windSpeed} />
            </div>
            <div className="col-12">
              <div className="row w-100">
                <h5>Wind Direction</h5>
                {Object.entries(chartData.windDirections).map(([sol, data]) => (
                  <div className="col-4 mb-4" key={sol}>
                    <h6 className="text-center">Sol {sol}</h6>
                    <div style={{ height: '300px', maxHeight: '300px' }}>
                      <CompassPolarAreaChart windData={data} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolCharts;