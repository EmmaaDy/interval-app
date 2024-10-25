import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoadingScreen from './pages/LoadingScreen/LoadingScreen'; 
import SetTimer from './pages/SetTimer/SetTimer'; 
import Header from './components/Header/Header'; 
import './index.css'; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStart = () => {
    localStorage.setItem('isLoaded', 'true'); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <Router>
      <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
        <Routes>
          <Route path="/" element={<LoadingScreen onStart={handleStart} />} />
          <Route 
            path="/timer" 
            element={
              <>
                <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
                <SetTimer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
