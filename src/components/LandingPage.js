import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapChart from './MapChart';

const LandingPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('federal');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounties, setSelectedCounties] = useState([]);
  const navigate = useNavigate();

  const handleStateSelection = (stateId) => {
    setSelectedLevel('state');
    setSelectedState(stateId);
    setSelectedCounties([]); // Clear any county selections
  };

  const handleCountySelection = (countyId) => {
    // Toggle county selection
    setSelectedCounties(prevCounties =>
      prevCounties.includes(countyId)
        ? prevCounties.filter(id => id !== countyId)
        : [...prevCounties, countyId]
    );
  };

  const handleSelectAllStates = () => {
    setSelectedLevel('federal');
    setSelectedState(null);
    setSelectedCounties([]);
  };

  const handleSelectAllCounties = () => {
    // This should be replaced with actual logic to select all counties within the state
    alert('Select all counties within the state is not implemented yet.');
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
      />
      <div>
        {selectedLevel === 'federal' && (
          <button onClick={handleSelectAllStates}>Select All States</button>
        )}
        {selectedLevel === 'state' && (
          <button onClick={handleSelectAllCounties}>Select All Counties</button>
        )}
        <button onClick={handleConfirmSelection}>Confirm Selection</button>
      </div>
    </div>
  );
};

export default LandingPage;
