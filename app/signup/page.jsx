'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PhoneInput from "react-phone-input-2";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from 'react-hot-toast';
import Confetti from 'react-confetti';

import "react-phone-input-2/lib/style.css";
import "../../sass/auth.scss";

function SignupSuccessModal({ isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Confetti />
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
          Success!
        </h2>
        <p className="text-lg text-center mb-6">
          You have successfully signed up with HealthMaster. You can now log in to your account.
        </p>
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ isVisible, onClose, message }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="text-red-500 w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
        </div>
        <p className="text-lg text-center mb-6 text-white">{message}</p>
        <div className="text-center">
          <Button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">Close</Button>
        </div>
      </div>
    </div>
  );
}

export default function SignUp() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [phone, setPhone] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    if (id === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        ...formData,
        phoneNumber: phone
      });
      setShowSuccessModal(true);
      toast.success('Signup successful. You can now log in to your account.');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred during signup');
      setShowErrorModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-logo">
          <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={100} height={100} />
          <h2>Health master</h2>
        </div>
        <div className="form-title">
          <h1>Hello there👋</h1>
          <p>Welcome to HealthMaster, the all-in-one platform to help you stay healthy.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${focusedInput === 'name' ? 'focused' : ''}`}>
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <Input
                type="text"
                id="fullName"
                required
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                onChange={handleInputChange}
                value={formData.fullName}
                style={{
                  backgroundColor: focusedInput === 'name' ? '#444' : 'transparent',
                  color: focusedInput === 'name' ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'email' ? 'focused' : ''}`}>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <Input
                type="email"
                id="email"
                required
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                onChange={handleInputChange}
                value={formData.email}
                style={{
                  backgroundColor: focusedInput === 'email' ? '#444' : 'transparent',
                  color: focusedInput === 'email' ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'phone' ? 'focused' : ''}`}>
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-input-wrapper">
              <PhoneInput
                country="us"
                value={phone}
                required
                onChange={(value) => setPhone(value)}
                inputStyle={{
                  width: "100%",
                  padding: "25px",
                  marginLeft: "30px",
                  borderRadius: "0.25rem",
                  border: "1px solid #444",
                  backgroundColor: focusedInput === 'phone' ? '#444' : '#333',
                  color: focusedInput === 'phone' ? '#fff' : 'inherit',
                  fontFamily: "Jost, sans-serif",
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                buttonStyle={{
                  backgroundColor: "#333",
                  border: "1px solid #444",
                }}
                containerStyle={{
                  width: "100%",
                }}
                inputClass="phone-input"
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'password' ? 'focused' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <Input
                type="password"
                id="password"
                required
                onChange={handleInputChange}
                value={formData.password}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                style={{
                  backgroundColor: focusedInput === 'password' ? '#444' : 'transparent',
                  color: focusedInput === 'password' ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
            {formData.password && (
              <div className="password-strength mt-2">
                <div className="strength-bar">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`strength-segment ${index < passwordStrength ? 'active' : ''}`}
                      style={{
                        backgroundColor: index < passwordStrength
                          ? ['#ff4d4d', '#ffa500', '#ffff00', '#00ff00'][passwordStrength - 1]
                          : '#444'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm mt-1">
                  {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Too weak'}
                </p>
              </div>
            )}
          </div>
          <div className="flex-row form-group custom-checkbox-container">
            <input type="checkbox" name='terms' id='terms' required className="custom-checkbox" />
            <label htmlFor="terms">
              By signing up, you agree to our <a href="/terms">Terms and Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </label>
          </div>
          <div className="form-group">
            <Button type="submit">Get Started</Button>
          </div>
        </form>
        <div className="form-group">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
        <div className="form-group">
          <p className="copyright">© 2024 HealthMaster. All rights reserved.</p>
        </div>
      </div>
      <SignupSuccessModal isVisible={showSuccessModal} onClose={handleSuccessModalClose} />
      <ErrorModal isVisible={showErrorModal} onClose={handleErrorModalClose} message={errorMessage} />
      <div className="w-full container-image">
        <Image src="/assets/images/background-1.webp" width={1000} height={1000} alt="Background" />
      </div>
    </div>
  );
}