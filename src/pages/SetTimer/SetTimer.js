import React, { useState, useEffect, useCallback } from 'react';
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
  const [duration, setDuration] = useState(1);
  const [currentView, setCurrentView] = useState('digital'); 
  const [timerStarted, setTimerStarted] = useState(false);
  const [isIntervalMode, setIsIntervalMode] = useState(false);
  const [isPauseMode, setIsPauseMode] = useState(false); 
  const [showIntervalView, setShowIntervalView] = useState(false); 
  const [pauseDuration] = useState(5 * 60); // 5 minuter i sekunder
  const [pauseSecondsRemaining, setPauseSecondsRemaining] = useState(pauseDuration); 

  // Memoisera handleStart innan det används
  const handleStart = useCallback(() => {
    startTimer(duration, isIntervalMode, isPauseMode); 
    setTimerStarted(true);
    setPauseSecondsRemaining(pauseDuration); // Återställ paustiden vid start
  }, [startTimer, duration, isIntervalMode, isPauseMode, pauseDuration]); // Inkludera alla beroenden

  // Memoisera handleContinue
  const handleContinue = useCallback(() => {
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    handleStart(); 
  }, [pauseDuration, handleStart]); // Inkludera pauseDuration och handleStart som beroenden

  const handleMenuChange = (view) => {
    setCurrentView(view);
  };

  const handleAbort = () => {
    stopTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
  };

  const handleResetAndGoBack = () => {
    resetTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
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
        handleContinue(); // Fortsätt timern
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
        setShowIntervalView(false); // Stäng intervalvyn
        handleContinue(); // Fortsätt till nästa steg
      }
    }
    return () => clearInterval(interval);
  }, [showIntervalView, isPauseMode, pauseSecondsRemaining, handleContinue]); // Inkludera handleContinue här

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

          {/* Checkboxar för intervall och paus */}
          <div className="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                checked={isIntervalMode} 
                onChange={() => {
                  setIsIntervalMode(!isIntervalMode);
                  if (!isIntervalMode) {
                    setIsPauseMode(false); // Döljer pausläget när intervallet aktiveras
                  }
                }} 
              />
              Intervals
            </label>

            <label className={isIntervalMode ? "checkbox-visible" : "checkbox-hidden"}>
              <input 
                type="checkbox" 
                checked={isPauseMode} 
                onChange={() => setIsPauseMode(!isPauseMode)} 
              />
              5 min break / Interval
            </label>
          </div>

          <button className="start-button" onClick={handleStart}>Start Timer</button>
          <Menu onViewChange={handleMenuChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
      {timerStarted && renderCurrentTimer()}

      {/* Visa IntervalView om paus-läget är aktiverat */}
      {showIntervalView && (
        <IntervalView 
          onContinue={handleContinue} 
          onAbort={handleAbort} 
          isBreak={isPauseMode} 
          secondsRemaining={pauseSecondsRemaining} // Skickar nedräkningen
        />
      )}
    </div>
  );
};

export default SetTimer;
