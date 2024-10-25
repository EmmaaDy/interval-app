import React, { useEffect, useRef } from 'react';
import Menu from '../../components/Menu/Menu';
import './AnalogTimer.css';

const AnalogTimer = ({ secondsRemaining, onComplete, onBackToSetTimer, isMenuOpen, setIsMenuOpen, onViewChange }) => {
  const secondHandRef = useRef(null);
  const minuteHandRef = useRef(null);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onComplete();
    }
    const totalSeconds = Math.floor(secondsRemaining % 60);
    const totalMinutes = Math.floor(secondsRemaining / 60);
    
    // Beräkna rotation för sekundvisaren
    const totalSecondsDegrees = totalSeconds * 6; // 360 / 60 = 6
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${totalSecondsDegrees}deg)`;
    }

    // Beräkna rotation för minutvisaren
    const totalMinutesDegrees = (totalMinutes % 60 + totalSeconds / 60) * 6; // 360 / 60 = 6
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${totalMinutesDegrees}deg)`;
    }
  }, [secondsRemaining, onComplete]);

  const handleAbort = () => {
    onBackToSetTimer();
  };

  const ticks = Array.from({ length: 60 }, (_, index) => (
    <div
      key={index}
      className="tick"
      style={{ transform: `rotate(${index * 6}deg) translateY(-90px)` }} // Flytta prickarna utåt
    ></div>
  ));

  return (
    <div className="analog-timer">
      <div className="clock-face">
        {ticks} {/* Prickar runt klockan */}
        <div className="center-dot"></div> {/* Centrala pricken */}
        <div className="hand minute-hand" ref={minuteHandRef}></div> {/* Minutvisare */}
        <div className="hand second-hand" ref={secondHandRef}></div> {/* Sekundvisare */}
      </div>
      <button className="analog-button" onClick={handleAbort}>Abort Timer</button>
      {/* Skicka onViewChange till menyn */}
      <Menu 
        onViewChange={onViewChange} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </div>
  );
};

export default AnalogTimer;
