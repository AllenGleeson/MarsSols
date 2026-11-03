import React from 'react';
import noImage from '../../assets/images/no-image.webp';
import { formatEarthDate } from './formatDate';

const SolDays = ({ marsData }) => {
  const days = marsData.Days.filter((day) => day.image && day.image.trim() !== '');
  if (days.length === 0) return null;

  return (
    <section aria-labelledby="photos-title">
      <h2 id="photos-title" className="section-title">Photos from the surface</h2>
      <p className="section-intro">
        Taken by the Curiosity rover on the same Earth days as the weather readings below. Select a photo to open the full-size image.
      </p>
      <div className="days">
        {days.map((day) => (
          <a className="photo-card" href={day.image} target="_blank" rel="noreferrer" key={day.sol}>
            <img
              src={day.image}
              alt={`Curiosity rover photo, ${formatEarthDate(day)}`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = noImage;
              }}
            />
            <span className="photo-caption">
              <strong>Sol {day.sol}</strong>
              <span>{formatEarthDate(day)}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SolDays;
