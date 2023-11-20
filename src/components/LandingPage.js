import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapChart from './MapChart';
import NavBar from './Nav';
import usAtlasStates from "us-atlas/states-10m.json";
import click from "../img/click_clipart.jpeg"
import eye from "../img/eye-computer-icons-clip-art-eye.jpg"
import comment from "../img/comment_clipart.png"

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
    <div className="landing">
      <section className="hero-section">
        <div className="quote-container">
          <p className="quote">
            Government of the people, by the people, for the people, shall not perish from the earth -
          </p>
          <p className="author">Abraham Lincoln</p>
        </div>
        <div className="title-container">
          <h1 className='title'>POLLAR</h1>
          <h2 className='subtitle'>Bills Made Easy</h2>
        </div>
        <div className="buttons-container">
          <button className="view-legislation-button" onClick={navigateToBills}>
            {selectedLevel === 'federal' ? 'View Federal Legislation' : `View ${getStateNameById(selectedState)} Legislation`}
          </button>
          {zoom > 1 && (
            <button className="view-legislation-button" onClick={resetZoom}>Zoom Out</button>
          )}
        </div>
      </section>

    <div className="main-content">
      <section className="stats-column">
        <article className="stat-item">
          <strong className="number">14,000 +</strong>
          <span className="description">New Bills Every Year</span>
        </article>
        <article className="stat-item">
          <strong className="number">1,000 +</strong>
          <span className="description">New Bills Every Month</span>
        </article>
        <article className="stat-item">
          <strong className="number">40 +</strong>
          <span className="description">New Bills Every Day</span>
        </article>
      <div className="call-to-action">
        <div className='red-text'>
          Yet Nothing Changes.
        </div>
        <div>
          Hold your politicians accountable with
        </div>
        <strong className='blue-text'>
          POLLAR
        </strong>
      </div>
      </section>
    
      <div className="map-column">
          <MapChart
            selectedLevel={selectedLevel}
            onStateSelected={handleStateSelection}
            selectedState={selectedState}
            setZoom={setZoom}
            setCenter={setCenter}
            zoom={zoom}
            center={center}
          />
        </div>
      <div className="tutorial-column">
        <div className="tutorial-step">
          <img src={click} alt="Click Icon" className="tutorial-icon"/>
          <p className="tutorial-text">CLICK YOUR STATE</p>
        </div>
        <div className="tutorial-step">
          <img src={eye} alt="Eye Icon" className="tutorial-icon"/>
          <p className="tutorial-text">VIEW BILLS THAT AFFECT YOU</p>
        </div>
        <div className="tutorial-step">
          <img src={comment} alt="Comment Icon" className="tutorial-icon"/>
          <p className="tutorial-text">COMMENT, VOTE AND INTERACT WITH BILLS SO POLITICIANS CAN SEE YOUR OPINIONS</p> 
      </div>
    </div>
  </div>
  </div>
  );
};

export default LandingPage;