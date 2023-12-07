// Loader.js

import React from 'react';
import './Loader.css'; // Import the CSS styles for the loader

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
