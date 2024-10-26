import React from 'react';
import './Menu.css';
import { motion } from 'framer-motion'; 
import Logo from '../../assets/Logo2.svg';

const Menu = ({ onViewChange, isMenuOpen, setIsMenuOpen }) => {
  const handleMenuClick = (view) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  // Logo animation configuration
  const logoAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div
      className={`menu-container ${isMenuOpen ? 'open' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMenuOpen && (
        <motion.div 
          className="menu-overlay" 
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src={Logo} 
            alt="Logo" 
            className={`header-logo ${isMenuOpen ? 'white' : ''}`} 
            onClick={() => setIsMenuOpen(false)} 
            variants={logoAnimation} 
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className="menu-dropdown"
            onClick={(e) => e.stopPropagation()} 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              <li onClick={() => handleMenuClick('analog')}>Analog Timer</li>
              <li onClick={() => handleMenuClick('digital')}>Digital Timer</li>
              <li onClick={() => handleMenuClick('text')}>Text Timer</li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Menu;
