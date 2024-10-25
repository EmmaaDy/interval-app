import React, { useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import './TextTimer.css'; 

const TextTimer = ({ secondsRemaining, onComplete, onBackToSetTimer, isMenuOpen, setIsMenuOpen, onViewChange }) => {
  const numberToWords = (num) => {
    const words = ["noll", "ett", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio",
                   "elva", "tolv", "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton"];
    const tens = ["", "", "tjugo", "trettio", "fyrtio", "femtio"];

    if (num < 20) return words[num];
    const tensPart = tens[Math.floor(num / 10)];
    const unitsPart = num % 10 === 0 ? '' : '' + words[num % 10];
    return tensPart + unitsPart;
  };

  const formatTextTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    
    const minutesText = mins === 1 ? "en minut" : `${numberToWords(mins)} minuter`;
    const secondsText = secs === 1 ? "en sekund" : `${numberToWords(secs)} sekunder`;
    
    return `${minutesText} och ${secondsText} kvar`;
  };

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onComplete();
    }
  }, [secondsRemaining, onComplete]);

  const handleAbort = () => {
    onBackToSetTimer();
  };

  return (
    <div className="text-timer">
      <h2 className="time-display">{formatTextTime(secondsRemaining)}</h2>
      <button className="text-button" onClick={handleAbort}>Abort Timer</button>
      <Menu 
        onViewChange={onViewChange} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </div>
  );
};

export default TextTimer;