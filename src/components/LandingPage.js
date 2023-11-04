import React, { useState } from 'react';
import MapChart from './MapChart';

const LandingPage = () => {
  const [content, setContent] = useState("");
  const [clickedState, setClickedState] = useState("");

  const handleStateClick = (stateName) => {
    // Here you can handle the zoom or redirect
    console.log("Clicked state:", stateName);
    // Redirect to the homepage with filtered data or zoom in on the state
  };

  return (
    <div>
      <MapChart setTooltipContent={setContent} setClickedState={handleStateClick} />
      <div className="tooltip">{content}</div>
      {/* Additional UI elements for filtering */}
    </div>
  );
};

export default LandingPage;
