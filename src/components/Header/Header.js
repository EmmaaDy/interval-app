import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import './Header.css'; 
import Logo from '../../assets/Logo2.png'; 

const Header = ({ toggleMenu, isMenuOpen }) => { 
  const navigate = useNavigate(); 

  const handleTitleClick = () => {
    navigate('/'); // Navigera till LoadingScreen när texten klickas
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
    <header className="header">
      <motion.img 
        src={Logo} 
        alt="Logo" 
        className={`header-logo ${isMenuOpen ? 'white' : ''}`} 
        onClick={toggleMenu} 
        variants={logoAnimation} 
        initial="initial" // Start the animation from the initial state
        animate="animate" // Use the animate state for the scaling effect
      />
      <h1 className="header-title" onClick={handleTitleClick}>Interval</h1> {/* Klicka för att navigera till LoadingScreen */}
    </header>
  );
};

export default Header; 
