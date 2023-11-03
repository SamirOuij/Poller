import React, { useEffect, useState } from 'react';
import Card from './Cards';
import CreatePollForm from './CP_Form';
import firebase from '../index';

function HomeScreen(props) {
  const { handleCardClick } = props;

  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(true);
  const [activeTab, setActiveTab] = useState('bills');
  const [showPollForm, setShowPollForm] = useState(false);
  
  const handleTabClick = (event) => {
    const tabId = event.target.id;
    setActiveTab(tabId === 'billsTab' ? 'bills' : 'polls');
  };

  const ref = firebase.firestore().collection("bills");

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
      setLoader(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="tabs">
        {/* Remove the login button */}
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

      {activeTab === 'bills' && (
        <div className="cardContainer">
          {loader === false && data.filter(bill => bill.type).map((bill) => 
             (
              <Card
                key={bill.bill_id}
                title={bill.clickable_title}
                onClick={() => handleCardClick(bill.bill_id)}
                >
                <div className="graph"></div>
              </Card>
            )
          )}
        </div>
      )}

      {activeTab === 'polls' && (
        <div className="cardContainer">
          <button onClick={() => setShowPollForm(!showPollForm)}>Create New Poll</button>
          
          {showPollForm && <CreatePollForm />}
          {data.filter(poll => !poll.type).map((poll) => (
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
  );
}

export default HomeScreen;
