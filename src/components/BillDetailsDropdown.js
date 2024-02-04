import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BillDetailsDropdown = ({
    title,
    actionDate,
    actionDesc,
    originalChamber,
    currentChamber,
    cosponsors,
    url
}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
    <div className="billDropdownContainer">
      <div className="billDetailsCard">
      <div className="billDetail">
        <div className="detailItem">
            <strong>Action Date:</strong>
            <div className="detailValue">{actionDate}</div>
        </div>
        <div className="detailItem">
            <strong>Action Description:</strong>
            <div className="detailValue">{actionDesc}</div>
        </div>
        <div className="detailItem">
            <strong>Original Chamber:</strong>
            <div className="detailValue">{originalChamber}</div>
        </div>
        <div className="detailItem">
            <strong>Current Chamber:</strong>
            <div className="detailValue">{currentChamber}</div>
        </div>
        </div>

        <button onClick={toggleDropdown}><strong>Cosponsors:</strong></button>
        {isDropdownOpen && (
          <ul>
            {cosponsors && cosponsors.map(cosponsor => (
              <li key={cosponsor.bioguideId}>
                <Link to={`/legislator/${cosponsor.bioguideId}`}>
                  {cosponsor.fullName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BillDetailsDropdown;
