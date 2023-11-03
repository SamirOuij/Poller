import React, { useEffect, useState } from 'react';
import Bills from './components/Bills';
import About from './components/About';
import Profile from './components/Profile';
import LegislatorProfile from './components/LegislatorProfile';'./components/LegislatorProfile';
import { NavBar, Footer } from './components/Nav';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './LegislatorProfile.css';
import './LoginPopup.css';

import './Nav.css';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
        <Route exact path='/' element={<Bills userData={userData}/>}/>
        <Route path="/legislator/:bioguideID" element={<LegislatorProfile/>} />

        <Route exact path='/About' element={<About/>}/>
        <Route exact path='/Profile' element={<Profile userData={userData} setIsProfileOpen={setIsProfileOpen} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
