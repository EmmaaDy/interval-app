import React from 'react';
import { FaPause } from 'react-icons/fa'; 
import './IntervalView.css';

const IntervalView = ({ onContinue, onAbort, isBreak, secondsRemaining }) => {
  // Omvandla sekunder till minuter och sekunder
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="interval-view">
      <div className="interval-content">
        {isBreak ? (
          <div>
            <FaPause style={{ fontSize: '80px', color: 'white', marginBottom: '20px' }} /> {/* Vit pausikon */}
            <h2 className="alarm-text">Pause & breath</h2>
            <div className="countdown">
              <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
            </div>
            <button className="common-button" onClick={onContinue}>No pause, go now!</button>
          </div>
        ) : (
          <div>
            <h2 className="alarm-text">No pause, go now!</h2>
            <button className="common-button" onClick={onContinue}>Continue</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntervalView;
