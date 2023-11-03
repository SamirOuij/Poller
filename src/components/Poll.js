import React, { useState, useEffect } from 'react';
import firebase from '../index';

function Poll(props) {
  const { billId, userData } = props;
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);
  
  useEffect(() => {
    const db = firebase.firestore();
    const billRef = db.collection("bills").doc(billId);

    billRef.get().then((doc) => {
      if (doc.exists) {
        setYesVotes(doc.data().yesVotes || 0);
        setNoVotes(doc.data().noVotes || 0);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [billId]);

  const handleYesClick = () => {
    const db = firebase.firestore();
    const billRef = db.collection("bills").doc(billId);
    
    billRef.update({
      yesVotes: firebase.firestore.FieldValue.increment(1)
    }).then(() => {
      setYesVotes(prevYes => prevYes + 1);
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  };

  const handleNoClick = () => {
    const db = firebase.firestore();
    const billRef = db.collection("bills").doc(billId);
    
    billRef.update({
      noVotes: firebase.firestore.FieldValue.increment(1)
    }).then(() => {
      setNoVotes(prevNo => prevNo + 1);
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  };

  let totalVotes = yesVotes + noVotes;

  return (
    <div className="poll-container">
      <h3 className="poll-title">{props.title}</h3>
      <div className="poll-bar-container">
        <div className="poll-bar-yes" style={{ width: `${(yesVotes / totalVotes) * 100}%` }}>
          <span className="poll-bar-votes">{`${((yesVotes / totalVotes) * 100).toFixed(1)}%`}</span>
        </div>
        <div className="poll-bar-no" style={{ width: `${(noVotes / totalVotes) * 100}%` }}>
          <span className="poll-bar-votes">{`${((noVotes / totalVotes) * 100).toFixed(1)}%`}</span>
        </div>
      </div>
      <div className="poll-options-container">
        <button className="poll-option-button-yes" onClick={handleYesClick}>
          Yes
        </button>
        <button className="poll-option-button-no" onClick={handleNoClick}>
          No
        </button>
      </div>
    </div>
  );
}

export default Poll;
