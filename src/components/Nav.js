import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPopup from './LoginPopup';
import logo from "../img/Polar_No_Background.png"

function hamClick() {
  const navUL = document.getElementById("nav-ul");
  navUL.classList.toggle("show");
}

export function NavBar({ userData, setUserData }) {
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false); 

  const openLoginPopup = () => {
    setIsLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign out successful
        setUserData(null); // Clear the user data
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error signing out:", error);
      });
  };

  return (
  <nav>
    <img src={logo} alt="Polar Logo" className="logo" />
    <ul className="nav-links">
      <li><Link to="/" className="nav-link">HOME</Link></li>
      <li><Link to="/About" className="nav-link">ABOUT</Link></li>
      <li><span className="nav-link">AWARENESS</span></li>
      <li><span className="nav-link">PROFILE</span></li>

      {userData && <li><Link to="/Profile" className="nav-link">PROFILE</Link></li>}
    </ul>
    <div className="auth-section">
      {userData ? (
        <img className="profile-photo" src={userData.photoURL} alt="Profile" />
      ) : (
        <button className="sign-in" onClick={openLoginPopup}>Sign In</button>
      )}
    </div>
  </nav>
  );
}

export default NavBar;

export function Footer() {
  return (
    <footer>
      <div>
        
        
      </div>
    </footer>
  );
}
