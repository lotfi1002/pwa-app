import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB'); // Adjust locale as needed
    setCurrentDate(formattedDate);
  }, []);

  return (
    <ul className="nav navbar-nav pull-right hidden-smallest">
      <li className="dropdown">
        <button className="btn bblack" style={{ cursor: 'default' }}>
          <span id="display_time">{currentDate}</span>
        </button>
      </li>
    </ul>
  );
};

export default DateDisplay;
