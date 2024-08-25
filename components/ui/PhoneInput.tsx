"use client";
import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ value, onChange, className }) => {
  return (
    <PhoneInput
      country={'us'}
      value={value}
      onChange={onChange}
      inputProps={{
        name: 'phone',
        required: true,
        className: `w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`
      }}
      containerClass="phone-input-container"
      buttonClass="bg-gray-700 border-gray-600 hover:bg-gray-600"
      dropdownClass="bg-gray-800 text-white"
    />
  );
};

export default CustomPhoneInput;
