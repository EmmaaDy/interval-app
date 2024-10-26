import React from 'react';
import { FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion'; 
import './AlarmView.css';

const AlarmView = ({ onResetAndGoBack }) => {
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
    <div className="alarm-view">
      <div className="alarm-container">
        <motion.div
          className="alarm-icon"
          animate={{ rotate: [0, 5, -5, 0] }} // Definiera skakningsanimation
          transition={{ duration: 0.5, repeat: Infinity }} // Animationens längd och upprepning
        >
          <div className="ring-indicator left"></div>
          <FaBell style={{ color: 'gray', fontSize: '100px' }} />
          <div className="ring-indicator right"></div>
        </motion.div>
        <h2 className="alarm-text">Times Up!</h2>
        <motion.button 
          className="common-button" 
          onClick={onResetAndGoBack}
          variants={buttonVariants} // Använd definierade animationsvarianter
          initial="initial" // Börja med initial variant
          animate="animate" // Använd definierad animation
        >
          Set New Timer
        </motion.button>
      </div>
    </div>
  );
};

export default AlarmView;
