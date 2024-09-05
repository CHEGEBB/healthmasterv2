import React, { useState, useEffect } from 'react';
import '../../sass/DynamicGreeting.scss';

const DynamicGreeting = ({ userName }) => {
  const [greeting, setGreeting] = useState('');
  const [timePhase, setTimePhase] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
        setTimePhase('morning');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good afternoon');
        setTimePhase('afternoon');
      } else {
        setGreeting('Good evening');
        setTimePhase('evening');
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`greeting-container ${timePhase}`}>
      <div className="greeting-content">
        <h1 className="greeting-text">{greeting}, {userName}!</h1>
        <p className="welcome-message">Welcome to your health dashboard. Let us make today a great day for your well-being!</p>
      </div>
      <div className="illustration">
        <div className="circle"></div>
        <div className="wave"></div>
        <div className="sun-moon"></div>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="star"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGreeting;