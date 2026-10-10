import React, { useState } from 'react';

const TickerBar = ({ onSelectCategory }) => {
  const [isPaused, setIsPaused] = useState(false);

  const categories = [
    "Dark Stores",
    "Warehouses",
    "Micro-Fulfillment",
    "Cold Storage",
    "Commercial Spaces",
    "Logistics Parks"
  ];

  return (
    <div className="ticker-bar" aria-label="Solution categories">
      <div className={`subnav-track ${isPaused ? 'paused' : ''}`}>
        <div className="subnav-row">
          {categories.map((cat, idx) => (
            <span 
              key={`a-${idx}`} 
              className="subnav-item"
              onClick={() => onSelectCategory && onSelectCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="subnav-row" aria-hidden="true">
          {categories.map((cat, idx) => (
            <span 
              key={`b-${idx}`} 
              className="subnav-item"
              onClick={() => onSelectCategory && onSelectCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <button 
        className="ticker-pause ticker-pause-right" 
        type="button" 
        onClick={() => setIsPaused(!isPaused)}
        aria-pressed={isPaused}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default TickerBar;
