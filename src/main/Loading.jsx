import React from "react";
import "../style/Loading.css"; 

export default function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        {/* SVG spinner */}
        <svg width="64" height="64" viewBox="0 0 50 50">
          <circle
            className="loading-path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#4f8cff"
            strokeWidth="5"
          />
        </svg>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}