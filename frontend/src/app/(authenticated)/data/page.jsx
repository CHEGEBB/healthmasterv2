"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Import the router
import PersonalInfo from '@/components/forms/PersonalInfo';
import "@/sass/data.scss";
import Image from 'next/image';
import MedicalForm from '@/components/forms/MedicalForm';
import IdentificationForm from '@/components/forms/IdentityForm';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import ReactConfetti from 'react-confetti';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setShowConfetti(true);

    // Redirect to /dashboard after a delay to show the confetti/modal
    setTimeout(() => {
      router.push('/dashboard'); // Redirect to the dashboard
    }, 6000); // Adjust the delay as per your preference
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        setShowConfetti(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div className="container">
      <div className="info-container">
        <div className="flex-row form-logo">
          <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={100} height={100} />
          <h2 className="items-center text-xl font-bold">Health master</h2>
        </div>
        <h2>Welcome 👋</h2>
        <p>Help us know about you by filling out the form below</p>
        <div className="personal-info">
          <h2>Personal Information</h2>
          <p>Please fill out your personal information below</p>
          <PersonalInfo />
        </div>
        <div className="medical-info">
          <h2>Medical Information</h2>
          <p>
            Please provide your medical information so we can tailor your experience to your needs.
            This information will be used to help you find the best healthcare providers and resources.
          </p>
          <MedicalForm />
        </div>
        <div className="identification-form">
          <h2>Identification</h2>
          <p>
            Please provide your identification so we can verify your identity and access your healthcare records.
            This information will be used to help you find the best healthcare providers and resources.
          </p>
          <IdentificationForm/>
        </div>
        <div className="terms-and-conditions">
          <h2>Consent and Privacy</h2>
          <div className="consent-form">
            <div className="consent-item">
              <input type="checkbox" name='terms' id='terms' required />
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
            <div className="consent-item">
              <input type="checkbox" name='privacy' id='privacy' required />
              <label htmlFor="privacy">I agree to the Privacy Policy</label>
            </div>
            <div className="consent-item">
              <input type="checkbox" name='data-collection' id='data-collection' required />
              <label htmlFor="data-collection">I consent to data collection and use</label>
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <p>By submitting this form, you agree to the HealthMaster Terms and Conditions and Privacy Policy.</p>
          <p className="text-[#3db7e3] copyright">
            © 2024 HealthMaster. All rights reserved.
          </p>
        </div>
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/register.png"
          alt="Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md p-8 m-4 text-center text-white bg-gray-800 rounded-lg">
            {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 bg-opacity-25 rounded-full">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Thank you for submitting the form!</h2>
            <p className="mb-4 text-gray-300">Your data is saved and safe with us.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-bold text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
