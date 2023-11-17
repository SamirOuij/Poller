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
    <header>
      <nav>
        <div className="left-section">
          {userData ? (
            <div className="profile-wrapper">
              <img
                className="profile-photo-small"
                src={userData.photoURL}
                alt="user profile"
              />
              <button className="sign-in" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="sign-in" onClick={openLoginPopup}>
              Sign In
            </button>
          )}
        </div>

        <div className="center-section">
          <img src={logo} alt="Polar Logo" className="logo" />
        </div>

        <div className="right-section">
          <button className="hamburger" id="hamburger" onClick={hamClick}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <ul className="nav-ul" id="nav-ul">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/About" className="nav-link">About</Link>
          </li>
          {userData && (
            <li>
              <Link to="/Profile" className="nav-link">Profile</Link>
            </li>
          )}
        </ul>
      </nav>
      {isLoginPopupVisible && <LoginPopup setUserData={setUserData} closePopup={closeLoginPopup} />}
    </header>
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
