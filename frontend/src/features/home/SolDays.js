import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faSeedling, faSun, faLeaf } from '@fortawesome/free-solid-svg-icons';

const SolDays = ({ marsData }) => {
  // Determine the icon based on the season
  const getSeasonIcon = (season) => {
    switch (season.toLowerCase()) {
      case 'winter':
        return faSnowflake;
      case 'spring':
        return faSeedling;
      case 'summer':
        return faSun;
      case 'fall':
      case 'autumn':
        return faLeaf;
      default:
        return faLeaf;
    }
  };

  const seasonIcon = getSeasonIcon(marsData.Season);

  return (
    <div>
      <div className="row">
        {marsData.Days
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => (
            <div className="col-md-2" key={index}>
              <div className="card h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={`Mars Sol ${item.sol}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = require('../../assets/images/no-image.webp');
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Sol Day {item.sol}</h5>
                  <p className="card-text">Earth Date: {item.earthday}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="season mt-3">
        <p>
          Some pictures from the surface of mars.
        </p>
        <div className='current-season'>
          <span>Season: {marsData.Season} </span>
          <FontAwesomeIcon icon={seasonIcon} />
        </div>
      </div>
    </div>
  );
};

export default SolDays;