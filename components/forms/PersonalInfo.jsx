"use client";

import React, { useState } from "react";
import { Briefcase, CalendarDays, Cross, Home, Mail, Phone, User2, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import "../../sass/PersonalInfo.scss";

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

    if (isValid) {
      setTimeout(() => {
        setValidationState((prev) => ({ ...prev, [field]: null }));
      }, 3000);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg personal-info">
      <form className="space-y-6">
        <div className="form-group">
          <div className="form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className={`form-input ${validationState.name === false ? 'invalid' : ''} ${validationState.name === true ? 'valid' : ''}`}
                id="name"
                value={formState.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="name" className={formState.name ? 'active' : ''}>Full name</label>
              <User2 className="form-icon" />
            </div>
            {validationState.name === false && <p className="error-message">Please enter your full name.</p>}
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="email"
                className={`form-input ${validationState.email === false ? 'invalid' : ''} ${validationState.email === true ? 'valid' : ''}`}
                id="email"
                value={formState.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email" className={formState.email ? 'active' : ''}>Email address</label>
              <Mail className="form-icon" />
            </div>
            {validationState.email === false && <p className="error-message">Please enter a valid email address.</p>}
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="tel"
                className={`form-input ${validationState.phone === false ? 'invalid' : ''} ${validationState.phone === true ? 'valid' : ''}`}
                id="phone"
                value={formState.phone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phone" className={formState.phone ? 'active' : ''}>Phone number</label>
              <Phone className="form-icon" />
            </div>
            {validationState.phone === false && <p className="error-message">Please enter a valid phone number.</p>}
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="date"
                className={`form-input ${validationState.dob === false ? 'invalid' : ''} ${validationState.dob === true ? 'valid' : ''}`}
                id="dob"
                value={formState.dob}
                onChange={handleInputChange}
                required
              />
              <CalendarDays className="form-icon" />
            </div>
            {validationState.dob === false && <p className="error-message">Please enter a valid date of birth.</p>}
          </div>

          <div className="flex-1 border-gray-700 form-item select">
            <Select onValueChange={handleGenderChange} value={formState.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="options">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {validationState.gender === false && <p className="error-message">Please select your gender.</p>}
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className={`form-input ${validationState.address === false ? 'invalid' : ''} ${validationState.address === true ? 'valid' : ''}`}
                id="address"
                value={formState.address}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="address" className={formState.address ? 'active' : ''}>Address</label>
              <Home className="form-icon" />
            </div>
            {validationState.address === false && <p className="error-message">Please enter your address.</p>}
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className={`form-input ${validationState.occupation === false ? 'invalid' : ''} ${validationState.occupation === true ? 'valid' : ''}`}
                id="occupation"
                value={formState.occupation}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="occupation" className={formState.occupation ? 'active' : ''}>Occupation</label>
              <Briefcase className="form-icon" />
            </div>
            {validationState.occupation === false && <p className="error-message">Please enter your occupation.</p>}
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className={`form-input ${validationState.emergencyContact === false ? 'invalid' : ''} ${validationState.emergencyContact === true ? 'valid' : ''}`}
                id="emergencyContact"
                value={formState.emergencyContact}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="emergencyContact" className={formState.emergencyContact ? 'active' : ''}>Emergency contact</label>
              <AlertTriangle className="form-icon" />
            </div>
            {validationState.emergencyContact === false && <p className="error-message">Please enter your emergency contact name.</p>}
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="tel"
                className={`form-input ${validationState.emergencyPhone === false ? 'invalid' : ''} ${validationState.emergencyPhone === true ? 'valid' : ''}`}
                id="emergencyPhone"
                value={formState.emergencyPhone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="emergencyPhone" className={formState.emergencyPhone ? 'active' : ''}>Emergency phone number</label>
              <Phone className="form-icon" />
            </div>
            {validationState.emergencyPhone === false && <p className="error-message">Please enter a valid emergency contact phone number.</p>}
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#24AE7C] hover:bg-[#1e9d6f] text-white">Submit</Button>
      </form>
    </div>
  )
}