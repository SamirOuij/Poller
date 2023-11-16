import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapChart from './MapChart';
import usAtlasStates from "us-atlas/states-10m.json";

const LandingPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('federal');
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([-96.37872873001915, 38.49365521741807]);

  const getStateNameById = (stateId) => {
    const state = usAtlasStates.objects.states.geometries.find(geo => geo.id === stateId);
    return state ? state.properties.name : null;
  };

  
  const resetZoom = () => {
    setZoom(1);
    setCenter([-96.37872873001915, 38.49365521741807]);
    setSelectedState(null)
    setSelectedLevel('federal')
  };

  const handleStateSelection = (stateId) => {
    console.log("State selected:", stateId);
    setSelectedLevel('state');
    console.log(selectedLevel)
    setSelectedState(stateId);
  };

  const navigateToBills = () => {
    if (selectedLevel === 'federal') {
      navigate('/home/federal');
    } else if (selectedState) {
      const stateName = getStateNameById(selectedState);
      navigate(`/home/state/${stateName}`);
    }
  };
  

  return (
    <div>
      <MapChart
        selectedLevel={selectedLevel}
        onStateSelected={handleStateSelection}
        selectedState={selectedState}
        setZoom={setZoom}
        setCenter={setCenter}
        zoom={zoom}
        center={center}
      />

      <div>
        <button onClick={navigateToBills}>
          {selectedLevel === 'federal' ? 'View Federal Legislation' : `View ${getStateNameById(selectedState)} Legislation`}
        </button>
        {zoom > 1 && (
        <button onClick={resetZoom}>Zoom Out</button>
      )}
      </div>
    </div>
  );
};

export default LandingPage;
