"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { UserPlus, CheckCircle2 } from 'lucide-react';

const WelcomeModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset modal view count on login
    const resetModalViewCount = () => {
      localStorage.setItem('modalViewCount', '0'); // Reset count to 0 upon login
    };

    // Call reset on the first mount (login)
    resetModalViewCount();

    // Show modal if view count is less than 2
    const modalViewCount = parseInt(localStorage.getItem('modalViewCount') || '0');
    if (modalViewCount < 2) {
      setTimeout(() => {
        setIsVisible(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 500);
      
      // Increment modal view count
      localStorage.setItem('modalViewCount', modalViewCount + 1);
    }
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
      <div className="absolute inset-0 bg-black bg-opacity-80" onClick={handleClose}></div>

      <div className={`relative bg-[#1e293b] text-white p-6 rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-12'} mt-12 sm:mt-0`}>
        <div className="flex justify-center mb-4">
          <Image 
            src="/assets/images/sv.svg"
            alt="Doctors Welcoming"
            width={150} 
            height={150}
            className="rounded-lg"
          />
        </div>

        <h2 className="mb-4 text-3xl font-bold text-center">🎉 Congratulations!</h2>
        <p className="mb-6 text-lg text-center">Welcome to the HealthMaster family! We are excited to have you on board. 🎊</p>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleNewUser}
            className="flex items-center justify-center w-full px-6 py-3 font-bold text-white transition-all duration-300 transform bg-blue-500 rounded-full hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none"
          >
            <UserPlus className="mr-2" />
            I am a New User (Fill Your Details)
          </button>
          
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-full px-6 py-3 font-bold text-white transition-all duration-300 transform bg-green-500 rounded-full hover:bg-green-600 hover:scale-105 hover:shadow-lg focus:outline-none"
          >
            <CheckCircle2 className="mr-2" />
            I am a Returning User (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
