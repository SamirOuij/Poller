import React from 'react';
import Card from './Cards';
import CreatePollForm from './CP_Form';

function HomeScreen({ data, handleCardClick, loader }) {
  const [activeTab, setActiveTab] = React.useState('bills');
  const [showPollForm, setShowPollForm] = React.useState(false);

  const handleTabClick = (event) => {
    const tabId = event.target.id;
    setActiveTab(tabId === 'billsTab' ? 'bills' : 'polls');
  };

  return (
    <div>
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
  );
}

export default HomeScreen;
