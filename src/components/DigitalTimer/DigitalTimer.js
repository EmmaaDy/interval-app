import React from 'react';
import Menu from '../../components/Menu/Menu';
import './DigitalTimer.css'; 

const DigitalTimer = ({ secondsRemaining, onComplete, onBackToSetTimer, isMenuOpen, setIsMenuOpen, onViewChange }) => {
  const minutes = Math.floor(secondsRemaining / 60); // Inget padStart för minuter
  const seconds = String(secondsRemaining % 60).padStart(2, '0'); // Fortsatt padStart för sekunder

  return (
    <div className="digital-timer">
      <h1 className="time-display">{`${minutes}:${seconds}`}</h1>
      <button className="digital-button" onClick={onBackToSetTimer}>Abort Timer</button>
      {/* Skicka onViewChange till menyn */}
      <Menu 
        onViewChange={onViewChange} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </div>
  );
};

export default DigitalTimer;
