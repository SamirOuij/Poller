import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function LoginPopup({ setUserData, closePopup }) {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState({
        houseNumber: '',
        city: '',
        state: '',
        zipCode: '',
        aptNumber: '' // Optional field
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');

    // Handle profile picture upload
    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };
    const handleAddressChange = (e, field) => {
        setAddress(prevAddress => ({
            ...prevAddress,
            [field]: e.target.value
        }));
    };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                // Check if this user already exists in Firestore
                const userRef = firebase.firestore().collection("users").doc(user.uid);
                userRef.get()
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists) {
                            // If user does not exist, add to Firestore
                            const { displayName, email, photoURL } = user;
                            console.log(user);
                            setUserData({ name: displayName, email, photoURL });
                        }
                    });
                setIsVisible(false); // hide the popup after Google Sign-In
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error.message);
            });
    };
    

    const handleLogin = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Set user data directly
                setUserData({
                     name: email, photoURL 
                });

                closePopup();
            })
            .catch((error) => {
                console.error('Login Error:', error.message);
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                const userProfilePicRef = firebase.storage().ref('profilePics').child(user.uid);
                userProfilePicRef.put(profilePic).then(() => {
                    userProfilePicRef.getDownloadURL().then((url) => {
                        firebase.firestore().collection("users").doc(user.uid).set({
                            email: user.email,
                            username: username,
                            address: address,
                            bio: bio,
                            profilePicURL: url
                        })
                            .then(() => {
                                setUserData({
                                    ...user,
                                    profilePicURL: url
                                });
                                setIsVisible(false);
                            })
                            .catch((error) => {
                                console.error("Error adding user to Firestore:", error.message);
                            });
                    });
                });
            })
            .catch((error) => {
                console.error("Signup Error:", error.message);
            });
    };

    return (
        isVisible ? (
            <div className="login-popup">
                {isLoginForm ? (
                    <form className="login-form" onSubmit={handleLogin}>
                        <button className="close-btn" onClick={closePopup}>x</button>
                        <div style={{
                            textAlign: 'center',
                            padding: '10px',
                            marginBottom: '2rem',
                            fontSize: '20px',
                            color: 'white',
                            background: 'linear-gradient(90deg, rgba(237, 12, 52, 0.72) 29.66%, rgba(56, 0, 198, 0.6) 70.77%)'
                        }}>
                            polar
                        </div>
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="login-buttons">
                            <button className="primary-button" type="submit">Login</button>
                            <button className="secondary-button" onClick={() => setIsLoginForm(false)}>Sign Up</button>
                            <button className="google-button" onClick={handleGoogleSignIn}>Google Sign In</button>
                        </div>
                    </form>
                ) : (
                    <form className="signup-form" onSubmit={handleSignup}>
                        <div style={{
                            textAlign: 'center',
                            padding: '10px',
                            marginBottom: '2rem',
                            fontSize: '20px',
                            color: 'white',
                            background: 'linear-gradient(90deg, rgba(237, 12, 52, 0.72) 29.66%, rgba(56, 0, 198, 0.6) 70.77%)'
                        }}>
                            polar
                        </div>
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="signup-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="signup-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="signup-input"
                            type="file"
                            onChange={handleProfilePicChange}
                        />
                        <textarea
                            className="signup-textarea"
                            placeholder="Your Bio"
                            value={bio}
                            onChange={handleBioChange}
                        ></textarea>
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="House Number"
                            value={address.houseNumber}
                            onChange={(e) => handleAddressChange(e, 'houseNumber')}
                        />
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => handleAddressChange(e, 'city')}
                        />
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="State"
                            value={address.state}
                            onChange={(e) => handleAddressChange(e, 'state')}
                        />
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="Zip Code"
                            value={address.zipCode}
                            onChange={(e) => handleAddressChange(e, 'zipCode')}
                        />
                        <input
                            className="signup-input"
                            type="text"
                            placeholder="Apt Number (Optional)"
                            value={address.aptNumber}
                            onChange={(e) => handleAddressChange(e, 'aptNumber')}
                        />
                        <div className="terms-container">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={() => setAcceptTerms(!acceptTerms)}
                            />
                            I accept the terms and conditions
                        </div>
                        <button className="primary-button" type="submit" disabled={!acceptTerms}>Sign Up</button>
                        <button className="secondary-button" onClick={() => setIsLoginForm(true)}>Login Instead</button>
                    </form>
                )}
            </div>
        ) : null
    );
}

export default LoginPopup;
