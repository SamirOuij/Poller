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
            <button onClick={toggleDropdown}>
                Bill Details
            </button>

            {isDropdownOpen && (
                <div className="billDetailsCard">
                    <h3>{title}</h3>
                    <p><strong>Action Date:</strong> {actionDate}</p>
                    <p><strong>Action Description:</strong> {actionDesc}</p>
                    <p><strong>Original Chamber:</strong> {originalChamber}</p>
                    <p><strong>Current Chamber:</strong> {currentChamber}</p>
                    <p><strong>Cosponsors:</strong></p>
                    <ul>
                        {cosponsors && cosponsors.map(cosponsor => (
                            <li key={cosponsor.bioguideId}>
                                <Link to={`/legislator/${cosponsor.bioguideId}`}>
                                    {cosponsor.fullName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <a href={url} target="_blank" rel="noopener noreferrer">View on Congress.gov</a>
                </div>
            )}
        </div>
    );
};

export default BillDetailsDropdown;
