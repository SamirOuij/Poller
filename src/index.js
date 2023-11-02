import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfk5SNHxjo_n8T-qWBQ04sbekYiy2Mku0",
  authDomain: "polar-82756.firebaseapp.com",
  projectId: "polar-82756",
  storageBucket: "polar-82756.appspot.com",
  messagingSenderId: "495294874714",
  appId: "1:495294874714:web:d090a88f8f053b88f28463",
  measurementId: "G-QFN3KFZYKD"
};

function Root() {
  const [userData, setUserData] = useState(null);

  return (
    <React.StrictMode>
      <App userData={userData} setUserData={setUserData} />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
