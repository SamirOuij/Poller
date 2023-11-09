import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapChart from './MapChart';

const LandingPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('federal');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounties, setSelectedCounties] = useState([]);
  const navigate = useNavigate();

  // Pass these to MapChart
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([-98.37872873001915, 38.49365521741807]);

  // Reset zoom and center
  const resetZoom = () => {
    setZoom(1);
    setCenter([0, 0]);
    setSelectedState(null);
    setSelectedLevel('federal');
  };

  const handleStateSelection = (stateId) => {
    setSelectedLevel('state');
    setSelectedState(stateId);
    setSelectedCounties([]);
  };

  const handleZoomOut = () => {
    setSelectedLevel('federal');
    setSelectedState(null);
    setSelectedCounties([]);
    // Any other state resets if necessary
  };
  const handleCountySelection = (countyId) => {
    setSelectedCounties(prevCounties =>
      prevCounties.includes(countyId)
        ? prevCounties.filter(id => id !== countyId)
        : [...prevCounties, countyId]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedLevel === 'federal') {
      navigate('/home', { state: { level: 'federal' } });
    } else if (selectedLevel === 'state' && selectedState) {
      navigate('/home', { state: { level: 'state', stateId: selectedState } });
    } else if (selectedLevel === 'county' && selectedCounties.length > 0) {
      navigate('/home', { state: { level: 'county', countyIds: selectedCounties } });
    }
  };

  return (
    <div>
      <MapChart
        selectedLevel={selectedLevel}
        onStateSelected={handleStateSelection}
        onCountySelected={handleCountySelection}
        selectedState={selectedState}
        selectedCounties={selectedCounties}
        setZoom={setZoom}
        setCenter={setCenter}
        zoom={zoom}
        center={center}
      />

      <div>
        <button onClick={handleConfirmSelection}>Confirm Selection</button>
        {selectedState && (
          <button onClick={handleZoomOut}>Zoom Out</button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
