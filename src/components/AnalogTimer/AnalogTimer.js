import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; 
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

  // Definiera animationsvarianter för knappen
  const buttonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1], // Pulserande effekt
      transition: {
        duration: 1,
        repeat: Infinity, // Oändlig upprepning
        ease: "easeInOut",
      },
    },
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
      <motion.button 
        className="analog-button" 
        onClick={handleAbort}
        variants={buttonVariants} // Använd animationsvarianter
        initial="initial" 
        animate="animate" // Starta med animationen
      >
        Abort Timer
      </motion.button>
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
