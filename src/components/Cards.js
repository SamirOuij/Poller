import React from 'react';


const Card = ({ title, onClick }) => {
  
  return (
    <div className="card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <div className="card-icons">
        <div className="poll-graph"></div>
      </div>
    </div>
  );
};


export default Card;
