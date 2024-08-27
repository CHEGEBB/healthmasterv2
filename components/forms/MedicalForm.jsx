"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { User, FileText, AlertCircle, Pill, ChevronDown } from 'lucide-react';
import "../../sass/MedicalInfo.scss";

export default function MedicalForm() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Adam Smith", specialty: "General Practice", image: "/assets/images/admin.png" },
    { id: 2, name: "Dr. Emily Johnson", specialty: "Pediatrics", image: "/assets/images/1.png" },
    { id: 3, name: "Dr. Michael Chen", specialty: "Cardiology", image: "/assets/images/8.png" },
    { id: 4, name: "Dr. Sarah Patel", specialty: "Neurology", image: "/assets/images/7.png" },
    { id: 5, name: "Dr. David Kim", specialty: "Orthopedics", image: "/assets/images/9.png" },
    { id: 6, name: "Dr. Lisa Rodriguez", specialty: "Dermatology", image: "/assets/images/2.png" },
    { id: 7, name: "Dr. James Wilson", specialty: "Oncology", image: "/assets/images/3.png" },
    { id: 8, name: "Dr. Anna Novak", specialty: "Gynecology", image: "/assets/images/4.png" },
    { id: 9, name: "Dr. Robert Lee", specialty: "Psychiatry", image: "/assets/images/6.png" },
    { id: 10, name: "Dr. Olivia Brown", specialty: "Endocrinology", image: "/assets/images/2.png" },
  ]);

  const [formState, setFormState] = useState({
    primaryPhysician: null,
    insuranceProvider: '',
    policyNumber: '',
    allergies: '',
    currentMedications: '',
    familyHistory: '',
    pastMedicalHistory: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleDoctorSelect = (doctor) => {
    setFormState(prev => ({ ...prev, primaryPhysician: doctor }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="medical-info">
      <form className="space-y-6">
        <div className="form-group">
          <div className="form-item doctor-select" ref={dropdownRef}>
            <div 
              className="doctor-select-trigger" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {formState.primaryPhysician ? (
                <div className="selected-doctor">
                  <Image
                    src={formState.primaryPhysician.image}
                    alt={formState.primaryPhysician.name}
                    width={40}
                    height={40}
                    className="doctor-image"
                  />
                  <div className="doctor-info">
                    <div className="doctor-name">{formState.primaryPhysician.name}</div>
                    <div className="doctor-specialty">{formState.primaryPhysician.specialty}</div>
                  </div>
                </div>
              ) : (
                <span className="placeholder">Select primary care physician</span>
              )}
              <ChevronDown className="dropdown-icon" />
            </div>
            {isDropdownOpen && (
              <div className="doctor-select-dropdown">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className="doctor-option" 
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={40}
                      height={40}
                      className="doctor-image"
                    />
                    <div className="doctor-info">
                      <div className="doctor-name">{doctor.name}</div>
                      <div className="doctor-specialty">{doctor.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="insuranceProvider"
                value={formState.insuranceProvider}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="insuranceProvider" className={formState.insuranceProvider ? 'active' : ''}>Insurance provider</label>
              <FileText className="form-icon" />
            </div>
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="policyNumber"
                value={formState.policyNumber}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="policyNumber" className={formState.policyNumber ? 'active' : ''}>Insurance policy number</label>
              <AlertCircle className="form-icon" />
            </div>
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="allergies"
                value={formState.allergies}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="allergies" className={formState.allergies ? 'active' : ''}>Allergies (if any)</label>
              <AlertCircle className="form-icon" />
            </div>
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="currentMedications"
                value={formState.currentMedications}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="currentMedications" className={formState.currentMedications ? 'active' : ''}>Current medications</label>
              <Pill className="form-icon" />
            </div>
          </div>
        </div>

        <div className="form-group md:flex md:space-x-4">
          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="familyHistory"
                value={formState.familyHistory}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="familyHistory" className={formState.familyHistory ? 'active' : ''}>Family medical history (if relevant)</label>
              <FileText className="form-icon" />
            </div>
          </div>

          <div className="flex-1 form-item">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                id="pastMedicalHistory"
                value={formState.pastMedicalHistory}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="pastMedicalHistory" className={formState.pastMedicalHistory ? 'active' : ''}>Past medical history</label>
              <FileText className="form-icon" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}