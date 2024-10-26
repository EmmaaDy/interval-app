import React from 'react';
import { motion } from 'framer-motion'; // Importera motion
import Menu from '../../components/Menu/Menu';
import './DigitalTimer.css'; 

const DigitalTimer = ({ secondsRemaining, onComplete, onBackToSetTimer, isMenuOpen, setIsMenuOpen, onViewChange }) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = String(secondsRemaining % 60).padStart(2, '0');

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

  return (
    <div className="digital-timer">
      <h1 className="time-display">{`${minutes}:${seconds}`}</h1>
      <motion.button 
        className="digital-button" 
        onClick={onBackToSetTimer}
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

export default DigitalTimer;
