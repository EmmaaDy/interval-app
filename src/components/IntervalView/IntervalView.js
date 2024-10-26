import React from 'react';
import { FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion'; 
import './IntervalView.css';

const IntervalView = ({ onContinue, onAbort, isBreak, secondsRemaining }) => {
  // Omvandla sekunder till minuter och sekunder
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // Definiera animationer för knappen
  const buttonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1], // Pulserande effekt
      transition: {
        duration: 1,
        repeat: Infinity, // Upprepa oändligt
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="interval-view">
      <div className="interval-content">
        {isBreak ? (
          <div>
            <motion.div
              className="pause-icon"
              animate={{ rotate: [0, 5, -5, 0] }} // Definiera skakningsanimation
              transition={{ duration: 0.5, repeat: Infinity }} // Animationens längd och upprepning
            >
              <FaPause style={{ fontSize: '80px', color: 'white', marginBottom: '20px' }} />
            </motion.div>
            <h2 className="alarm-text">Pause & breath</h2>
            <div className="countdown">
              <h2>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
            </div>
            <motion.button 
              className="common-button" 
              onClick={onContinue}
              variants={buttonVariants} // Använd definierade animationsvarianter
              initial="initial" // Börja med initial variant
              animate="animate" // Använd definierad animation
            >
              No pause, go now!
            </motion.button>
          </div>
        ) : (
          <div>
            <h2 className="alarm-text">No pause, go now!</h2>
            <motion.button 
              className="common-button" 
              onClick={onContinue}
              variants={buttonVariants} // Använd definierade animationsvarianter
              initial="initial" // Börja med initial variant
              animate="animate" // Använd definierad animation
            >
              Continue
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntervalView;
