import React, { useState } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Filter(props) {
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [showBillTypeDropdown, setShowBillTypeDropdown] = useState(false);

  const { onFilterChange } = props;

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const toggleBillTypeDropdown = () => {
    setShowBillTypeDropdown(!showBillTypeDropdown);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    console.log("handleFilterChange: ", name, checked);
    onFilterChange(event); // pass event object to parent component
  };

  return (
    <div className="filter-container">
      <FontAwesomeIcon icon={faFilter} className="icon icon-filter" />
      <div className='filter-heading'>
        Filter
      </div>

      <div className="checkbox-container">
        <label>
          <input type="checkbox" name="trending" onChange={handleFilterChange} />
          Trending
        </label>
        <label>
          <input type="checkbox" name="favorites" onChange={handleFilterChange} />
          Favorites
        </label>
        <label>
          <input type="checkbox" name="community" onChange={handleFilterChange} />
          Community
        </label>
        <label onClick={toggleBillTypeDropdown}>
          Bill Type
          <span className="arrow-icon">{showBillTypeDropdown ? '▲' : '▼'}</span>
        </label>
        {showBillTypeDropdown && (
          <div className="bill-type-dropdown">
            <label>
              <input type="checkbox" name="labor" onChange={handleFilterChange} />
              Labor
            </label>
            <label>
              <input type="checkbox" name="tax" onChange={handleFilterChange} />
              Tax
            </label>
            <label>
              <input type="checkbox" name="ordinance" onChange={handleFilterChange} />
              Ordinance
            </label>
            <label>
              <input type="checkbox" name="motion" onChange={handleFilterChange} />
              Motion
            </label>
          </div>
        )}

      </div>
    </div>
  );
}

export default Filter;
