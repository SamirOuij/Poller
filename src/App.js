import React, { useEffect, useState } from 'react';
import About from './components/About';
import Profile from './components/Profile';
import LegislatorProfile from './components/LegislatorProfile';
import LandingPage from './components/LandingPage';
import Bills from './components/Bills';
import { NavBar, Footer } from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './LegislatorProfile.css';
import './LoginPopup.css';
import './Nav.css';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const { displayName, email, photoURL } = user;
      setUserData({ name: displayName, email, photoURL });
    }
  }, [user]);

  return (
    <Router>
      <NavBar userData={userData} setUserData={setUserData} />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home/federal' element={<Bills userData={userData} />} />
        <Route path='/home/state/:stateName' element={<Bills userData={userData} />} />
        <Route path='/Profile' element={<Profile userData={userData} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
