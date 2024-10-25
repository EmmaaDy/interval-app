import React from 'react';
import './Menu.css';
import { motion } from 'framer-motion'; 
import Logo from '../../assets/Logo2.svg';

const Menu = ({ onViewChange, isMenuOpen, setIsMenuOpen }) => {
  const handleMenuClick = (view) => {
    onViewChange(view); // Byter vy baserat på menyalternativet
    setIsMenuOpen(false); // Stänger menyn
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
    <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <motion.img 
            src={Logo} 
            alt="Logo" 
            className={`header-logo ${isMenuOpen ? 'white' : ''}`} 
            onClick={() => setIsMenuOpen(false)} 
            variants={logoAnimation} 
            initial="initial" // Start the animation from the initial state
            animate="animate" // Use the animate state for the scaling effect
          />
          <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}> 
            <ul>
              <li onClick={() => handleMenuClick('analog')}>Analog Timer</li>
              <li onClick={() => handleMenuClick('digital')}>Digital Timer</li>
              <li onClick={() => handleMenuClick('text')}>Text Timer</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
