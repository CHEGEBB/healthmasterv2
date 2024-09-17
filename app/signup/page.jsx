'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PhoneInput from "react-phone-input-2";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import OTPInputModal from "../../components/OTPInputModal";
import { toast } from 'react-hot-toast';

import "react-phone-input-2/lib/style.css";
import "../../sass/auth.scss";

export default function SignUp() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [phone, setPhone] = useState("");
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [userId, setUserId] = useState(null);
  const [testOTP, setTestOTP] = useState(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        ...formData,
        phoneNumber: phone
      });
      setUserId(response.data.userId);
      setTestOTP(response.data.otp);
      setIsOTPModalOpen(true);
      toast.success('Signup successful. Please verify your phone number.');
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const handleVerifyOTP = async (enteredOTP) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        userId,
        otp: enteredOTP
      });
      localStorage.setItem('token', response.data.token);
      toast.success('Phone number verified successfully');
      router.push('/data');
    } catch (error) {
      console.error('OTP verification error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Error verifying OTP');
    }
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
                placeholder="John Doe"
                id="fullName"
                required
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                onChange={handleInputChange}
                value={formData.fullName}
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
                placeholder="johndoe@gmail.com"
                onChange={handleInputChange}
                value={formData.email}
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
                  backgroundColor: "#333",
                  color: "white",
                  fontFamily: "Jost, sans-serif",
                }}
                buttonStyle={{
                  backgroundColor: "#333",
                  border: "1px solid #444",
                }}
                containerStyle={{
                  width: "100%",
                }}
                inputClass="phone-input"
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
                placeholder="Create your password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
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
      {isOTPModalOpen && (
        <OTPInputModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          phoneNumber={phone}
          onVerify={handleVerifyOTP}
          testOTP={testOTP}
        />
      )}
      <div className="w-full container-image">
        <Image src="/assets/images/background-1.webp" width={1000} height={1000} alt="Background" />
      </div>
    </div>
  );
}