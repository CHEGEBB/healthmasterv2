"use client"
import React, { useState } from "react";
import { Briefcase, CalendarDays, Home, Mail, Phone, User2, AlertTriangle } from "lucide-react";

export default function PersonalInfo() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    occupation: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  const [validationState, setValidationState] = useState({
    name: null,
    email: null,
    phone: null,
    dob: null,
    gender: null,
    address: null,
    occupation: null,
    emergencyContact: null,
    emergencyPhone: null
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleGenderChange = (value) => {
    setFormState((prev) => ({ ...prev, gender: value }));
    validateField("gender", value);
  };

  const validateField = (field, value) => {
    // Validation logic (same as before)
  };

  return (
    <div className="p-6 mx-auto shadow-lg text-whiterounded-lg max-w-7xl">
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.name === false ? 'border-red-500' : ''
              } ${validationState.name === true ? 'border-green-500' : ''}`}
              id="name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-10 top-3 transition-all ${
                formState.name ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Full name
            </label>
            <User2 className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.name === false && <p className="mt-1 text-sm text-red-500">Please enter your full name.</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.email === false ? 'border-red-500' : ''
              } ${validationState.email === true ? 'border-green-500' : ''}`}
              id="email"
              value={formState.email}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="email"
              className={`absolute left-10 top-3 transition-all ${
                formState.email ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Email address
            </label>
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.email === false && <p className="mt-1 text-sm text-red-500">Please enter a valid email address.</p>}
          </div>

          <div className="relative">
            <input
              type="tel"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.phone === false ? 'border-red-500' : ''
              } ${validationState.phone === true ? 'border-green-500' : ''}`}
              id="phone"
              value={formState.phone}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="phone"
              className={`absolute left-10 top-3 transition-all ${
                formState.phone ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Phone number
            </label>
            <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.phone === false && <p className="mt-1 text-sm text-red-500">Please enter a valid phone number.</p>}
          </div>

          <div className="relative">
            <input
              type="date"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.dob === false ? 'border-red-500' : ''
              } ${validationState.dob === true ? 'border-green-500' : ''}`}
              id="dob"
              value={formState.dob}
              onChange={handleInputChange}
              required
            />
            <CalendarDays className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.dob === false && <p className="mt-1 text-sm text-red-500">Please enter a valid date of birth.</p>}
          </div>

          <div className="relative">
            <select
              className="w-full px-4 py-3 pl-10 transition-colors bg-gray-800 border-2 border-gray-700 appearance-none rounded-xl focus:outline-none focus:border-green-500"
              onChange={(e) => handleGenderChange(e.target.value)}
              value={formState.gender}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <User2 className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.gender === false && <p className="mt-1 text-sm text-red-500">Please select your gender.</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-md py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.address === false ? 'border-red-500' : ''
              } ${validationState.address === true ? 'border-green-500' : ''}`}
              id="address"
              value={formState.address}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="address"
              className={`absolute left-10 top-3 transition-all ${
                formState.address ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Address
            </label>
            <Home className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.address === false && <p className="mt-1 text-sm text-red-500">Please enter your address.</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-md py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.occupation === false ? 'border-red-500' : ''
              } ${validationState.occupation === true ? 'border-green-500' : ''}`}
              id="occupation"
              value={formState.occupation}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="occupation"
              className={`absolute left-10 top-3 transition-all ${
                formState.occupation ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Occupation
            </label>
            <Briefcase className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.occupation === false && <p className="mt-1 text-sm text-red-500">Please enter your occupation.</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-md py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.emergencyContact === false ? 'border-red-500' : ''
              } ${validationState.emergencyContact === true ? 'border-green-500' : ''}`}
              id="emergencyContact"
              value={formState.emergencyContact}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="emergencyContact"
              className={`absolute left-10 top-3 transition-all ${
                formState.emergencyContact ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Emergency contact
            </label>
            <AlertTriangle className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.emergencyContact === false && <p className="mt-1 text-sm text-red-500">Please enter your emergency contact name.</p>}
          </div>

          <div className="relative">
            <input
              type="tel"
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
                validationState.emergencyPhone === false ? 'border-red-500' : ''
              } ${validationState.emergencyPhone === true ? 'border-green-500' : ''}`}
              id="emergencyPhone"
              value={formState.emergencyPhone}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="emergencyPhone"
              className={`absolute left-10 top-3 transition-all ${
                formState.emergencyPhone ? 'text-xs -top-0.5 bg-gray-900 px-1' : ''
              }`}
            >
              Emergency phone number
            </label>
            <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            {validationState.emergencyPhone === false && <p className="mt-1 text-sm text-red-500">Please enter a valid emergency contact phone number.</p>}
          </div>
        </div>
      </form>
    </div>
  );
}