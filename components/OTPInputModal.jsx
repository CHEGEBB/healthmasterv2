import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const OTPInputModal = ({ isOpen, onClose, phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", otp.join(""));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
        <h3 className="mb-4 text-lg font-medium text-white">Verify OTP</h3>
        <p className="mb-6 text-sm text-gray-300">
          Please enter the OTP sent to {phoneNumber}. It will expire in {timer} seconds.
        </p>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-2xl text-center text-green-500 bg-gray-900 border border-gray-700 rounded-md focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>
        <Button
          onClick={handleVerify}
          className="w-full text-white bg-green-600 hover:bg-green-700"
          disabled={otp.some(digit => digit === "")}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OTPInputModal;