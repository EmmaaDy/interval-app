import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importera motion
import Logo from '../../assets/Logo.png'; 
import './LoadingScreen.css';

const LoadingScreen = ({ onStart }) => {
  const navigate = useNavigate(); 

  const handleStart = () => {
    onStart(); 
    navigate('/timer'); 
  };

  // Animation configuration
  const logoAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity // Repeat indefinitely
      }
    }
  };

  return (
    <div className="loading-screen" onClick={handleStart}>
      <motion.img 
        src={Logo} 
        alt="Logo" 
        variants={logoAnimation} 
        initial="initial" // Start the animation from the initial state
        animate="animate" // Use the animate state for the scaling effect
      />
      <h2>Interval</h2> 
      <h3>For all your timing needs</h3>
    </div>
  );
};

export default LoadingScreen;
