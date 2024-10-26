import React from 'react';
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion'; 
import './AlarmView.css';

const AlarmView = ({ onResetAndGoBack }) => {
  // Define animations for the button
  const buttonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1], // Pulsating effect
      transition: {
        duration: 1,
        repeat: Infinity, // Repeat indefinitely
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="alarm-view">
      <div className="alarm-container">
        <motion.div
          className="alarm-icon"
          animate={{ rotate: [0, 5, -5, 0] }} // Define shaking animation
          transition={{ duration: 0.5, repeat: Infinity }} // Animation duration and repetition
        >
          <div className="ring-indicator left"></div>
          <FaBell style={{ color: 'gray', fontSize: '100px' }} />
          <div className="ring-indicator right"></div>
        </motion.div>
        <h2 className="alarm-text">Times Up!</h2>
        <motion.button 
          className="common-button" 
          onClick={onResetAndGoBack}
          variants={buttonVariants} // Use defined animation variants
          initial="initial" // Start with initial variant
          animate="animate" // Animate to defined variant
        >
          Set New Timer
        </motion.button>
      </div>
    </div>
  );
};

export default AlarmView;
