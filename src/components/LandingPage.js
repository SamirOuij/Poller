import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapChart from './MapChart';
import { feature } from 'topojson-client';
import usAtlasStates from "us-atlas/states-10m.json";
import usAtlasCounties from "us-atlas/counties-10m.json";


const LandingPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('federal');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCounties, setSelectedCounties] = useState([]);
  const allStateIds = feature(usAtlasStates, usAtlasStates.objects.states).features.map(geo => geo.id);
  const allCountyIds = selectedState
  ? feature(usAtlasCounties, usAtlasCounties.objects.counties).features
      .filter(geo => geo.id.startsWith(selectedState))
      .map(geo => geo.id)
  : [];
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
    // Logic to select all states
    const allStateIds = feature(usAtlasStates, usAtlasStates.objects.states).features.map(geo => geo.id);
    setSelectedCounties(allStateIds);
  };

  const handleSelectAllCounties = () => {
    // Logic to select all counties within a state
    if (selectedState) {
      const allCountyIds = feature(usAtlasCounties, usAtlasCounties.objects.counties).features
        .filter(geo => geo.id.startsWith(selectedState))
        .map(geo => geo.id);
      setSelectedCounties(allCountyIds);
    } else {
      alert('No state selected to select all counties within.');
    }
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
        allStatesSelected={selectedLevel === 'federal' && selectedCounties.length === allStateIds.length}
        allCountiesSelected={selectedLevel === 'state' && selectedCounties.length === allCountyIds.length}
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
