import React, { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase, CalendarDays, Home, Mail, Phone, User2, AlertTriangle, X } from "lucide-react";
import confetti from 'canvas-confetti';

const SuccessModal = ({ isOpen, onClose, name }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-xs p-8 m-4 bg-gray-800 rounded-lg md:max-w-sm">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-white"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              >
                <animate
                  attributeName="stroke-dasharray"
                  from="0, 150"
                  to="150, 150"
                  dur="1s"
                  begin="0s"
                  fill="freeze"
                />
              </path>
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Successful Submission!</h3>
          <p className="text-gray-300">Thank you, {name || 'valued customer'}!</p>
          <p className="mt-2 text-gray-300">Your form has been successfully submitted.Kindly fill the remaining forms below😊</p>
        </div>
      </div>
    </div>
  );
};

const PersonalInfo = () => {
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
    let isValid = false;
    switch (field) {
      case "name":
        isValid = value.trim().length > 0;
        break;
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "phone":
      case "emergencyPhone":
        isValid = /^\d{10}$/.test(value);
        break;
      case "dob":
        isValid = value !== "";
        break;
      case "gender":
        isValid = ["male", "female", "other"].includes(value);
        break;
      case "address":
      case "occupation":
      case "emergencyContact":
        isValid = value.trim().length > 0;
        break;
      default:
        break;
    }
    setValidationState((prev) => ({ ...prev, [field]: isValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(validationState).every((value) => value === true);
    if (isFormValid) {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await axios.post('http://localhost:5000/api/personal-info', formState);
        if (response.status === 201) {
          setShowSuccessModal(true);
          setFormState({
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
          setValidationState({
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
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('An error occurred while submitting the form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError("Please fill all fields correctly before submitting.");
    }
  };

  return (
    <div className="p-6 mx-auto text-white rounded-lg shadow-lg max-w-7xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
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
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
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
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500 transition-colors ${
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
              className={`w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-green-500transition-colors ${
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

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-3 text-white bg-green-500 rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={formState.name}
      />
    </div>
  );
};

export default PersonalInfo;