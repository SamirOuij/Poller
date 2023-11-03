import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginPopup from './LoginPopup';

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
        <div className="left-head">
          <a className="logo">POLAR</a>
          <a className="slogan">Bills made easy</a>
        </div>
        <button className="hamburger" id="hamburger" onClick={hamClick}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className="nav-ul" id="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          {userData && (
            <li>
              <Link to="/Profile">Profile</Link>
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
        <img
          className="footer-icon"
          src="./img/polar.png"
          alt="polar bear icon."
        />
        <img
          className="footer-icon"
          src="./img/king.png"
          alt="king county logo."
        />
      </div>
    </footer>
  );
}
