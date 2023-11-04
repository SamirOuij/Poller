import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MapChart from './MapChart';

const LandingPage = () => {
  const [content, setContent] = useState("");
  const history = useHistory();

  const handleStateClick = (stateName) => {
    // Redirect to the homepage with filtered data for the selected state
    history.push(`/homepage?level=state&state=${stateName}`);
  };

  // Handler for selecting federal level
  const handleFederalClick = () => {
    history.push(`/homepage?level=federal`);
  };

  return (
    <div>
      <MapChart setTooltipContent={setContent} setClickedState={handleStateClick} />
      <div className="tooltip">{content}</div>
      <button onClick={handleFederalClick}>View Federal Legislation</button>
      {/* Additional UI elements for filtering */}
    </div>
  );
};

export default LandingPage;
