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

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={legislatorData.member.depiction?.imageUrl || "default_profile_image_path.jpg"} alt={`${legislatorData.member.firstName} ${legislatorData.member.lastName}`} className="profile-picture"/>
                <div className="profile-info">
                    <h1 className="profile-name">{`${legislatorData.member.honorificName} ${legislatorData.member.directOrderName}`}</h1>
                    <div className="profile-details">
                        <p><strong>State:</strong> {legislatorData.member.state}</p>
                        <p><strong>District:</strong> {legislatorData.member.district}</p>
                        <p><strong>Party:</strong> {legislatorData.member.partyHistory[0]?.partyName}</p>
                        <p><strong>Website:</strong> <a href={legislatorData.member.officialWebsiteUrl} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    </div>
                </div>
            </div>

            <div className="legislation-info">
                <h2>Legislation Information</h2>
                <div>
                    <h3>Sponsored Legislation</h3>
                    <p>Total Count: {legislatorData.member.sponsoredLegislation.count}</p>
                    <p><a href={legislatorData.member.sponsoredLegislation.url} target="_blank" rel="noopener noreferrer">View Sponsored Legislation</a></p>
                </div>
                <div>
                    <h3>Cosponsored Legislation</h3>
                    <p>Total Count: {legislatorData.member.cosponsoredLegislation.count}</p>
                    <p><a href={legislatorData.member.cosponsoredLegislation.url} target="_blank" rel="noopener noreferrer">View Cosponsored Legislation</a></p>
                </div>
            </div>

            <div className="contact-info">
                <h2>Contact Information</h2>
                <p><strong>Phone:</strong> {legislatorData.member.addressInformation.phoneNumber}</p>
                <p><strong>Office Address:</strong> {legislatorData.member.addressInformation.officeAddress}, {legislatorData.member.addressInformation.city}, {legislatorData.member.addressInformation.district} {legislatorData.member.addressInformation.zipCode}</p>
            </div>
        </div>
    );
}

export default LegislatorProfile;
