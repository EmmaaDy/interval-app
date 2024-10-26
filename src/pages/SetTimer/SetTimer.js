import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion'; // Importera motion
import useTimer from '../../hooks/useTimer'; 
import DigitalTimer from '../../components/DigitalTimer/DigitalTimer'; 
import AnalogTimer from '../../components/AnalogTimer/AnalogTimer'; 
import TextTimer from '../../components/TextTimer/TextTimer'; 
import AlarmView from '../../components/AlarmView/AlarmView'; 
import IntervalView from '../../components/IntervalView/IntervalView'; 
import Menu from '../../components/Menu/Menu'; 
import './SetTimer.css';

const SetTimer = ({ isMenuOpen, setIsMenuOpen }) => {
  const { startTimer, stopTimer, resetTimer, isRunning, secondsRemaining } = useTimer();
  const [duration, setDuration] = useState(1); // Startlängd i minuter
  const [currentView, setCurrentView] = useState('digital'); // Standardvisning av timer
  const [timerStarted, setTimerStarted] = useState(false); // Kontroll av om timern är igång
  const [isIntervalMode, setIsIntervalMode] = useState(false); // Om intervalläge är aktivt
  const [isPauseMode, setIsPauseMode] = useState(false); // Om pausläge är aktivt
  const [showIntervalView, setShowIntervalView] = useState(false); // Om pausen ska visas
  const [pauseDuration] = useState(5 * 60); // 5 minuter (i sekunder) för pauser
  const [pauseSecondsRemaining, setPauseSecondsRemaining] = useState(pauseDuration); // Räknare för kvarvarande paus

  const handleStart = useCallback(() => {
    startTimer(duration, isIntervalMode, isPauseMode); 
    setTimerStarted(true);
    setPauseSecondsRemaining(pauseDuration); // Återställer pausvärdet vid start
  }, [startTimer, duration, isIntervalMode, isPauseMode, pauseDuration]); 

  const handleContinue = useCallback(() => {
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    handleStart(); 
  }, [pauseDuration, handleStart]);

  const handleMenuChange = (view) => {
    setCurrentView(view);
  };

  const handleAbort = () => {
    stopTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    setIsIntervalMode(false);
    setIsPauseMode(false);
  };

  const handleResetAndGoBack = () => {
    resetTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    setIsIntervalMode(false);
    setIsPauseMode(false);
  };

  const increaseDuration = () => {
    setDuration(prevDuration => prevDuration + 1);
  };

  const decreaseDuration = () => {
    setDuration(prevDuration => Math.max(1, prevDuration - 1));
  };

  const renderCurrentTimer = () => {
    if (isRunning && secondsRemaining <= 0) {
      if (isPauseMode && isIntervalMode) {
        setShowIntervalView(true);
        setTimerStarted(false);
      } else if (isIntervalMode) {
        handleContinue(); // Fortsätt till nästa steg
      } else {
        return <AlarmView onResetAndGoBack={handleResetAndGoBack} />;
      }
    }

    switch (currentView) {
      case 'digital':
        return (
          <DigitalTimer
            secondsRemaining={secondsRemaining}
            onComplete={resetTimer}
            onBackToSetTimer={handleAbort}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onViewChange={handleMenuChange}
          />
        );
      case 'analog':
        return (
          <AnalogTimer
            secondsRemaining={secondsRemaining}
            onComplete={resetTimer}
            onBackToSetTimer={handleAbort}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onViewChange={handleMenuChange}
          />
        );
      case 'text':
        return (
          <TextTimer
            secondsRemaining={secondsRemaining}
            onComplete={resetTimer}
            onBackToSetTimer={handleAbort}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onViewChange={handleMenuChange}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    let interval = null;
    if (showIntervalView && isPauseMode && pauseSecondsRemaining > 0) {
      interval = setInterval(() => {
        setPauseSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (!showIntervalView || pauseSecondsRemaining <= 0) {
      clearInterval(interval);
      if (pauseSecondsRemaining <= 0) {
        setShowIntervalView(false); // Stänger pausvisningen
        handleContinue(); // Fortsätt till nästa steg
      }
    }
    return () => clearInterval(interval);
  }, [showIntervalView, isPauseMode, pauseSecondsRemaining, handleContinue]);

  return (
    <div className="set-timer-container">
      {!timerStarted && (
        <div className="set-timer-controls">
          <div className="duration-control">
            <button className="duration-button" onClick={decreaseDuration}>‹</button>
            <div className="duration-display">{duration}</div>
            <button className="duration-button" onClick={increaseDuration}>›</button>
          </div>
          <div className="duration-label">minutes</div>

          {/* Kryssrutor för intervall och pauser */}
          <div className="checkbox-container">
            <label>
              <motion.input 
                type="checkbox" 
                checked={isIntervalMode} 
                onChange={() => {
                  setIsIntervalMode(!isIntervalMode);
                  if (!isIntervalMode) {
                    setIsPauseMode(false); // Döljer pausläge när intervall är aktivt
                  }
                }} 
                whileTap={{ scale: 1.3 }} // Gör checkboxen större vid klick
                initial={{ scale: 1 }} // Standardstorlek
                animate={{ scale: isIntervalMode ? 1.3 : 1 }} // Animera storlek baserat på tillstånd
              />
              Intervals
            </label>

            {/* Använd motion.div för att animera den andra checkboxen */}
            <motion.label 
              initial={{ x: -100, opacity: 0 }} // Startposition
              animate={isIntervalMode ? { x: 0, opacity: 1 } : {}} // Animation när den andra checkboxen blir synlig
              transition={{ type: "spring", stiffness: 300 }} // Animeringsinställningar
              className={isIntervalMode ? "checkbox-visible" : "checkbox-hidden"}
            >
              <motion.input 
                type="checkbox" 
                checked={isPauseMode} 
                onChange={() => setIsPauseMode(!isPauseMode)} 
                whileTap={{ scale: 1.3 }} // Gör checkboxen större vid klick
                initial={{ scale: 1 }} // Standardstorlek
                animate={{ scale: isPauseMode ? 1.3 : 1 }} // Animera storlek baserat på tillstånd
              />
              5 min break / Interval
            </motion.label>
          </div>

          {/* Pulserande startknapp */}
          <motion.button 
            className="start-button" 
            onClick={handleStart}
            whileHover={{ scale: 1.1 }} // Liten förstoring vid hover
            whileTap={{ scale: 0.9 }} // Liten minskning vid tryck
            animate={{ 
              scale: [1, 1.1, 1], // Pulserande effekt
              transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            Start Timer
          </motion.button>
          <Menu onViewChange={handleMenuChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
      {timerStarted && renderCurrentTimer()}

      {showIntervalView && (
        <IntervalView 
          onContinue={handleContinue} 
          onAbort={handleAbort} 
          isBreak={isPauseMode} 
          secondsRemaining={pauseSecondsRemaining}
        />
      )}
    </div>
  );
};

export default SetTimer;
