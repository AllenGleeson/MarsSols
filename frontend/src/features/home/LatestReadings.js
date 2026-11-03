import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faSeedling, faSun, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { formatEarthDate } from './formatDate';

const SEASON_ICONS = { winter: faSnowflake, spring: faSeedling, summer: faSun, fall: faLeaf, autumn: faLeaf };
const toCelsius = (f) => Math.round(((f - 32) * 5) / 9);

// Headline numbers for the most recent sol in the data.
const LatestReadings = ({ marsData }) => {
  const { temperature, pressure, windSpeed, windDirections } = marsData.chartData;
  const last = temperature.length - 1;
  if (last < 0) return null;

  const sol = temperature[last].sol;
  const day = marsData.solDays.Days.find((d) => d.sol === sol);
  const winds = windDirections[sol] || [];
  const topWind = winds.reduce((best, d) => (!best || d.ct > best.ct ? d : best), null);
  const season = marsData.solDays.Season || '';

  const stats = [
    { label: 'High', value: `${toCelsius(temperature[last].mx)}°C` },
    { label: 'Low', value: `${toCelsius(temperature[last].mn)}°C` },
    { label: 'Pressure', value: `${Math.round(pressure[last].av)} Pa` },
    { label: 'Wind', value: `${windSpeed[last].av.toFixed(1)} m/s${topWind ? ` ${topWind.compass_point}` : ''}` },
  ];

  return (
    <section className="latest" aria-labelledby="latest-title">
      <div className="latest-header">
        <h2 id="latest-title" className="section-title">
          Latest readings · Sol {sol}
        </h2>
        <span className="latest-meta">
          {day && formatEarthDate(day)}
          {season && (
            <>
              {' · '}
              <span className="text-capitalize">{season}</span>{' '}
              <FontAwesomeIcon icon={SEASON_ICONS[season.toLowerCase()] || faLeaf} />
            </>
          )}
        </span>
      </div>
      <dl className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="data-note">
        Weather from NASA's InSight lander, which stopped sending weather reports in late 2020. Its mission ended in December 2022, so these are its last published readings.
      </p>
    </section>
  );
};

export default LatestReadings;
