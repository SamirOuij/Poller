import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/firestore';

const LegislatorProfile = () => {
    const { bioguideID } = useParams();
    const [legislatorData, setLegislatorData] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        const memberRef = db.collection('members').doc(bioguideID);
        memberRef.get().then((doc) => {
            if (doc.exists) {
                setLegislatorData(doc.data());
            } else {
                console.error("No such document!");
            }
        }).catch((error) => {
            console.error("Error getting document:", error);
        });
    }, [bioguideID]);

    if (!legislatorData) return <div className="loading">Loading...</div>;

    const backgroundStyle = {
        backgroundColor: legislatorData.member.partyHistory[0]?.partyName === "Democratic" ? "#DDEEFF" : legislatorData.member.partyHistory[0]?.partyName === "Republican" ? "#FFDDDD" : "#FFF"
    };

    return (
        <div className="profile-container" style={backgroundStyle}>
            <div className="profile-header">
                {/* Display Image if available */}
                {legislatorData.member.depiction?.imageUrl && (
                    <img src={legislatorData.member.depiction.imageUrl} alt={`${legislatorData.member.firstName} ${legislatorData.member.lastName}`} className="profile-picture"/>
                )}
                <div className="profile-description">
                    <h2 className="profile-name">{`${legislatorData.member.honorificName} ${legislatorData.member.directOrderName}`}</h2>
                    <p>State: {legislatorData.member.state}</p>
                    <p>District: {legislatorData.member.district}</p>
                    <p>Party: {legislatorData.member.partyHistory.partyName}</p>
                    <p>Website: <a href={legislatorData.member.officialWebsiteUrl} target="_blank" rel="noopener noreferrer">{legislatorData.member.officialWebsiteUrl}</a></p>
                </div>
            </div>

            <div className="contact-info">
                <h3>Contact Information:</h3>
                <p>Phone: {legislatorData.member.addressInformation.phoneNumber}</p>
                <p>Office Address: {legislatorData.member.addressInformation.officeAddress}, {legislatorData.member.addressInformation.city}, {legislatorData.member.addressInformation.district} {legislatorData.member.addressInformation.zipCode}</p>
            </div>

            <div className="legislation-info">
                <h3>Legislation Information:</h3>
                <h4>Sponsored Legislation:</h4>
                <p>Total Count: {legislatorData.member.sponsoredLegislation.count}</p>
                <p><a href={legislatorData.member.sponsoredLegislation.url} target="_blank" rel="noopener noreferrer">View Sponsored Legislation</a></p>
                <h4>Cosponsored Legislation:</h4>
                <p>Total Count: {legislatorData.member.cosponsoredLegislation.count}</p>
                <p><a href={legislatorData.member.cosponsoredLegislation.url} target="_blank" rel="noopener noreferrer">View Cosponsored Legislation</a></p>
            </div>

            {/* The terms section was omitted in the provided structure, but if needed, it can be added similarly to the previous code. */}

            {/* This section can be used to render other relevant data, such as community polls or legislator posts */}
            <div className="legislator-posts">
                <h3>Community Polls:</h3>
                {"Lorem Ipsum"}
                <h3>Posts:</h3>
                {/* Render legislator posts here */}
            </div>
        </div>
    );
}

export default LegislatorProfile;
