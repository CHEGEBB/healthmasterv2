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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Confetti />
      <div className="w-full max-w-md p-8 mx-4 transition-all duration-300 ease-in-out transform scale-100 rounded-lg opacity-100 bg-slate-800">
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">
          Success!
        </h2>
        <p className="mb-6 text-lg text-center">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 mx-4 transition-all duration-300 ease-in-out transform scale-100 rounded-lg opacity-100 bg-slate-800">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 mr-2 text-red-500" />
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
        </div>
        <p className="mb-6 text-lg text-center text-white">{message}</p>
        <div className="text-center">
          <Button onClick={onClose} className="text-white bg-red-500 hover:bg-red-600">Close</Button>
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
      const response = await axios.post('https://healthmasterv2-2.onrender.com/api/auth/signup', {
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
          <div className={`form-group ${focusedInput === 'name' || formData.fullName ? 'focused' : ''}`}>
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
                  backgroundColor: focusedInput === 'name' || formData.fullName ? '#444' : 'transparent',
                  color: focusedInput === 'name' || formData.fullName ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'email' || formData.email ? 'focused' : ''}`}>
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
                  backgroundColor: focusedInput === 'email' || formData.email ? '#444' : 'transparent',
                  color: focusedInput === 'email' || formData.email ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'phone' || phone ? 'focused' : ''}`}>
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
                  backgroundColor: focusedInput === 'phone' || phone ? '#444' : '#333',
                  color: focusedInput === 'phone' || phone ? '#fff' : 'inherit',
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
          <div className={`form-group ${focusedInput === 'password' || formData.password ? 'focused' : ''}`}>
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
                  backgroundColor: focusedInput === 'password' || formData.password ? '#444' : 'transparent',
                  color: focusedInput === 'password' || formData.password ? '#fff' : 'inherit',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              />
            </div>
            {formData.password && (
              <div className="mt-2 password-strength">
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
                <p className="mt-1 text-sm">
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