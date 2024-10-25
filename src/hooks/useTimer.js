import { useEffect, useState, useMemo } from 'react';
import { Timer } from 'easytimer.js';

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  
  const timer = useMemo(() => new Timer(), []);

  useEffect(() => {
    const handleTargetAchieved = () => {
      setIsRunning(false);
    };

    timer.addEventListener('targetAchieved', handleTargetAchieved);

    return () => {
      timer.stop();
      timer.removeEventListener('targetAchieved', handleTargetAchieved);
    };
  }, [timer]);

  const startTimer = (duration, isIntervalMode, isPauseMode) => {
    setSecondsRemaining(duration * 60); 
    timer.start({ countdown: true, target: { seconds: duration * 60 } });
    setIsRunning(true);
  };

  const stopTimer = () => {
    timer.stop();
    setIsRunning(false);
  };

  const resetTimer = () => {
    timer.reset();
    setSecondsRemaining(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning || secondsRemaining <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  return {
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
    secondsRemaining,
    timer,
  };
};

export default useTimer;