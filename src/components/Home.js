import Card from './Cards';
import CreatePollForm from './CP_Form';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from "firebase/compat/app";
import JayInslee from "../img/GovernorInslee_portrait_for-webpage-JayInslee.jpg" 
import 'firebase/firestore';

function HomeScreen({ data, handleCardClick, loader }) {
  const [activeTab, setActiveTab] = React.useState('bills');
  const [showPollForm, setShowPollForm] = React.useState(false);
  const [governorInfo, setGovernorInfo] = React.useState(null);
  const { stateName } = useParams();

  useEffect(() => {
    if (stateName) {
      const db = firebase.firestore();
      const governorRef = db.collection('governors').where("StateName", "==", stateName);
      governorRef.get().then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const governorData = querySnapshot.docs[0].data();
          setGovernorInfo(governorData);
        } else {
          console.error("No such governor!");
        }
      }).catch((error) => {
        console.error("Error getting governor:", error);
      });
    } else {
      setGovernorInfo({ GovNameFirst: 'Federal', GovNameLast: 'Legislation', GovBio: 'Federal legislation does not involve a governor.', StateName: 'United States' });
    }
  }, [stateName]);

  const handleTabClick = (event) => {
    const tabId = event.target.id;
    setActiveTab(tabId === 'billsTab' ? 'bills' : 'polls');
  };

  return (
    <>
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'bills' ? 'active' : ''}`} 
          id="billsTab" 
          onClick={handleTabClick}
        >
          Recent Bills
        </button>
        <button 
          className={`tab-button ${activeTab === 'polls' ? 'active' : ''}`} 
          id="pollsTab" 
          onClick={handleTabClick}
        >
          Community Polls
        </button>
      </div>
      <div className='homepage'>
        {governorInfo && (
          <div className='StateGovernor'>
            {stateName && (
              <div className='GovernorPhoto'>
                <img src={JayInslee} alt={`${governorInfo.GovNameFirst} ${governorInfo.GovNameLast}`} />
              </div>
            )}
            <div className='GovernorBio'>
              <h2>{`${governorInfo.GovNameFirst} ${governorInfo.GovNameLast}`}</h2>
              <p>{governorInfo.GovBio}</p>
            </div>
            <div className='StateTitle'>
              <h3>{governorInfo.StateName}</h3>
            </div>
          </div>
        )}

        {activeTab === 'bills' && (
          <div className="cardContainer">
            {!loader && data.map((bill) => (
              <Card
                key={bill.bill_id}
                title={bill.clickable_title}
                onClick={() => handleCardClick(bill.bill_id)}
              >
                <div className="graph"></div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'polls' && (
          <div className="cardContainer">
            <button onClick={() => setShowPollForm(!showPollForm)}>Create New Poll</button>
            {showPollForm && <CreatePollForm />}
            {data.map((poll) => (
              <Card
                key={poll.bill_id}
                title={poll.clickable_title}
                onClick={() => handleCardClick(poll.bill_id)}
              >
                {poll.summary} 
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default HomeScreen;
