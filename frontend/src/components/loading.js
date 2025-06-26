import React from 'react';
import '../assets/css/loading.css'; // Optional styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading Mars data...</p>
    </div>
  );
};

export default Loading;