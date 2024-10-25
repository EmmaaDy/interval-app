import React from 'react';
import { useLocation } from 'react-router-dom';
import DigitalTimer from '../components/DigitalTimer/DigitalTimer';
import AnalogTimer from '../components/AnalogTimer/AnalogTimer';
import TextTimer from '../components/TextTimer/TextTimer';
import Menu from '../components/Menu/Menu';
import useTimer from '../hooks/useTimer';

const TimerView = () => {
  const location = useLocation();
  const { state } = location;
  const { duration } = state || { duration: 1 }; // Standardvärde om ingen duration anges
  const { secondsRemaining, startTimer, isRunning } = useTimer();

  const currentView = location.pathname.split('/')[2]; // Hämta den valda vyn från URL

  // Starta timern med den angivna varaktigheten om den inte redan är igång
  if (!isRunning) {
    startTimer(duration);
  }

  const renderCurrentTimer = () => {
    switch (currentView) {
      case 'digital':
        return <DigitalTimer secondsRemaining={secondsRemaining} onComplete={() => {}} onBackToSetTimer={() => {}} />;
      case 'analog':
        return <AnalogTimer secondsRemaining={secondsRemaining} onComplete={() => {}} onBackToSetTimer={() => {}} />;
      case 'text':
        return <TextTimer secondsRemaining={secondsRemaining} onComplete={() => {}} onBackToSetTimer={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Menu onViewChange={() => {}} isMenuOpen={true} setIsMenuOpen={() => {}} />
      {renderCurrentTimer()}
    </div>
  );
};

export default TimerView;
