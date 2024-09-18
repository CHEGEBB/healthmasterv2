"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const WelcomeModal = ({ onClose }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    setIsNewUser(!hasSeenModal);
    
    setTimeout(() => {
      setIsVisible(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  }, []);

  const handleNewUser = () => {
    router.push('/data');
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('hasSeenWelcomeModal', 'true');
      onClose();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      <div className={`relative bg-gray-900 text-white p-8 rounded-lg shadow-xl transform transition-all duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
        <h2 className="mb-4 text-3xl font-bold text-center">Congratulations!</h2>
        <p className="mb-6 text-center">Welcome to the HealthMaster family!</p>
        {isNewUser ? (
          <>
            <p className="mb-4 text-center">As a new user, we'd love to personalize your experience.</p>
            <button
              onClick={handleNewUser}
              className="w-full px-6 py-3 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
            >
              Fill Your Details
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-center">Welcome back! We're glad to see you again.</p>
            <button
              onClick={handleClose}
              className="w-full px-6 py-3 font-bold text-white transition-all duration-300 transform bg-green-500 rounded-full hover:bg-green-600 hover:scale-105 hover:shadow-lg"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;