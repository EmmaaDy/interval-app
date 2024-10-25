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
  const [duration, setDuration] = useState(1); // Startlängd i minuter
  const [currentView, setCurrentView] = useState('digital'); // Standardvisning av timer
  const [timerStarted, setTimerStarted] = useState(false); // Kontroll av om timern är igång
  const [isIntervalMode, setIsIntervalMode] = useState(false); // Om intervalläge är aktivt
  const [isPauseMode, setIsPauseMode] = useState(false); // Om pausläge är aktivt
  const [showIntervalView, setShowIntervalView] = useState(false); // Om pausen ska visas
  const [pauseDuration] = useState(5 * 60); // 5 minuter (i sekunder) för pauser
  const [pauseSecondsRemaining, setPauseSecondsRemaining] = useState(pauseDuration); // Räknare för kvarvarande paus

  // Startar timern och initierar pausvärden om intervall- och pauslägen är aktiva
  const handleStart = useCallback(() => {
    startTimer(duration, isIntervalMode, isPauseMode); 
    setTimerStarted(true);
    setPauseSecondsRemaining(pauseDuration); // Återställer pausvärdet vid start
  }, [startTimer, duration, isIntervalMode, isPauseMode, pauseDuration]); 

  // Startar om timern efter en paus
  const handleContinue = useCallback(() => {
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    handleStart(); 
  }, [pauseDuration, handleStart]);

  // Hanterar vybyten i menyn
  const handleMenuChange = (view) => {
    setCurrentView(view);
  };

  // Avbryter och återställer timern
  const handleAbort = () => {
    stopTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    // Återställer kryssrutor
    setIsIntervalMode(false);
    setIsPauseMode(false);
  };

  // Nollställer och återgår till startläget
  const handleResetAndGoBack = () => {
    resetTimer();
    setTimerStarted(false);
    setShowIntervalView(false); 
    setPauseSecondsRemaining(pauseDuration); 
    setIsIntervalMode(false);
    setIsPauseMode(false);
  };

  // Ökar tidslängden med 1 minut
  const increaseDuration = () => {
    setDuration(prevDuration => prevDuration + 1);
  };

  // Minskar tidslängden med 1 minut (minsta värdet är 1)
  const decreaseDuration = () => {
    setDuration(prevDuration => Math.max(1, prevDuration - 1));
  };

  // Hanterar visning av rätt timerbaserat på valt läge
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

  // Hanterar nedräkning av pausvisningen om pausläge är aktivt
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
              <input 
                type="checkbox" 
                checked={isIntervalMode} 
                onChange={() => {
                  setIsIntervalMode(!isIntervalMode);
                  if (!isIntervalMode) {
                    setIsPauseMode(false); // Döljer pausläge när intervall är aktivt
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

      {/* Visar IntervalView om pausläge är aktivt */}
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
