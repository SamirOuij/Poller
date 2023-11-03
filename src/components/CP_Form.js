import React, { useState } from 'react';
import firebase from '../index';

const CreatePollForm = () => {
  const [clickableTitle, setClickableTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = firebase.firestore();
    const newPollRef = db.collection("bills").doc();

    newPollRef.set({
        type: false, // false indicates it's a community poll
        bill_id: newPollRef.id, 
        title: "N/A",
        clickable_title: clickableTitle,
        summary: summary,
        action_date: "N/A",
        update_date: "N/A",
        current_chamber: "N/A",
        action_desc: "N/A",
        congress: "N/A",
        chamber: "N/A",
        url: "N/A"
      })
    .then(() => {
      console.log("Community Poll created successfully!");
      // Reset the form
      setClickableTitle("");
      setSummary("");
    })
    .catch(error => {
      console.error("Error adding community poll: ", error);
    });
  }

  return (
    <div className="create-poll-form-container">
      <form onSubmit={handleSubmit}>
      <h2>Create a Community Poll</h2>

        <div className="form-group">
          <label>Clickable Title</label>
          <input
            type="text"
            value={clickableTitle}
            onChange={e => setClickableTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Summary</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePollForm;
