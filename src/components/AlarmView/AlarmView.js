import React from 'react';
import { FaBell } from 'react-icons/fa';
import './AlarmView.css';

const AlarmView = ({ onResetAndGoBack }) => {
  return (
    <div className="alarm-view">
    <div className="alarm-container">
      <div className="alarm-icon">
        <div className="ring-indicator left"></div> {/* Vänstra sträcket */}
        <FaBell style={{ color: 'gray', fontSize: '100px' }} />
        <div className="ring-indicator right"></div> {/* Högra sträcket */}
      </div>
      <h2 className="alarm-text">Times Up!</h2>
      <button className="common-button" onClick={onResetAndGoBack}>Set New Timer</button>
    </div>
    </div>
  );
};

export default AlarmView;
