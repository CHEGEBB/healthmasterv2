import React, { useState, useEffect } from "react";
import "../sass/otpInput.scss";

const OTPInputModal = ({ isOpen, onClose, phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setCanResend(true);
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen) {
      document.getElementById('otp-input-0')?.focus();
    }
  }, [isOpen]);

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

  const handleResend = () => {
    console.log("Resending OTP");
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Verify OTP</h3>
        <p>Please enter the OTP sent to your registered mobile number.</p>
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-input"
            />
          ))}
        </div>
        <div className="timer-container">
          {canResend ? (
            <button className="resend-button" onClick={handleResend}>Resend OTP</button>
          ) : (
            <p>Resend OTP in {timer} seconds</p>
          )}
        </div>
        <button 
          className="verify-button" 
          onClick={handleVerify}
          disabled={otp.some(digit => digit === "")}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPInputModal;