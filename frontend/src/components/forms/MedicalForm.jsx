import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { User, FileText, AlertCircle, Pill, ChevronDown, Droplet } from 'lucide-react';

export default function MedicalForm() {
  const [doctors, setDoctors] = useState([
    { id: '60d5ecb74f421b2d803f7c55', name: "Dr. Adam Smith", specialty: "General Practice", image: "/assets/images/admin.png" },
    { id: '60d5ecb74f421b2d803f7c56', name: "Dr. Emily Johnson", specialty: "Pediatrics", image: "/assets/images/1.png" },
  ]);

  const [formState, setFormState] = useState({
    primaryPhysician: null,
    insuranceProvider: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    familyMedicalHistory: '',
    pastMedicalHistory: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const medicalInfo = {
        ...formState,
        primaryPhysician: formState.primaryPhysician ? formState.primaryPhysician.id : null,
      };

      const response = await axios.post('https://healthmasterv2-2.onrender.com/api/medical-info/save', medicalInfo);
      console.log('Medical information saved:', response.data);
      setIsLoading(false);
      alert('Medical information saved successfully!');
    } catch (error) {
      console.error('Error saving medical information:', error);
      setError('Failed to save medical information. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-[#1a202c] text-white">
      <h2 className="mb-6 text-2xl font-bold text-white">Medical Information</h2>
      
      {error && <div className="p-3 mb-4 text-red-500 bg-red-100 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative" ref={dropdownRef}>
          <label className="block mb-1 text-sm font-medium text-white">Primary Care Physician</label>
          <div 
            className="flex items-center justify-between w-full p-2 border border-green-400 pointer rounded-2xl bg-slate-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {formState.primaryPhysician ? (
              <div className="flex items-center">
                <Image
                  src={formState.primaryPhysician.image}
                  alt={formState.primaryPhysician.name}
                  width={40}
                  height={40}
                  className="mr-2 rounded-full"
                />
                <div>
                  <div className="font-medium">{formState.primaryPhysician.name}</div>
                  <div className="text-sm text-white">{formState.primaryPhysician.specialty}</div>
                </div>
              </div>
            ) : (
              <span className="p-3 text-white">Select primary care physician</span>
            )}
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 overflow-auto border border-green-400 shadow-lg rounded-2xl bg-slate-800 max-h-60">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={40}
                    height={40}
                    className="mr-2 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-white">{doctor.specialty}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="insuranceProvider" className="block mb-1 text-sm font-medium text-white">Insurance Provider</label>
            <div className="relative">
              <input
                type="text"
                id="insuranceProvider"
                value={formState.insuranceProvider}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-green-400 rounded-2xl bg-slate-800"
                placeholder="Enter insurance provider"
              />
              <FileText className="absolute text-white transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <div>
            <label htmlFor="bloodGroup" className="block mb-1 text-sm font-medium text-white">Blood Group</label>
            <div className="relative">
              <input
                type="text"
                id="bloodGroup"
                value={formState.bloodGroup}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-green-400 rounded-2xl bg-slate-800"
                placeholder="Enter blood group"
              />
              <Droplet className="absolute text-white transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="allergies" className="block mb-1 text-sm font-medium text-white">Allergies</label>
            <div className="relative">
              <input
                type="text"
                id="allergies"
                value={formState.allergies}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-green-400 rounded-2xl bg-slate-800"
                placeholder="Enter allergies (if any)"
              />
              <AlertCircle className="absolute text-white transform-translate-y-1/2 left-3 top-1/4" />
            </div>
          </div>
          <div>
            <label htmlFor="currentMedications" className="block mb-1 text-sm font-medium text-white">Current Medications</label>
            <div className="relative">
              <input
                type="text"
                id="currentMedications"
                value={formState.currentMedications}
                onChange={handleInputChange}
                className="w-full p-2 pl-10 border border-green-400 rounded-2xl bg-slate-800"
                placeholder="Enter current medications"
              />
              <Pill className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="familyMedicalHistory" className="block mb-1 text-sm font-medium text-white">Family Medical History</label>
            <textarea
              id="familyMedicalHistory"
              value={formState.familyMedicalHistory}
              onChange={handleInputChange}
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
              rows="3"
              placeholder="Enter family medical history"
            ></textarea>
          </div>
          <div>
            <label htmlFor="pastMedicalHistory" className="block mb-1 text-sm font-medium text-white">Past Medical History</label>
            <textarea
              id="pastMedicalHistory"
              value={formState.pastMedicalHistory}
              onChange={handleInputChange}
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
              rows="3"
              placeholder="Enter past medical history"
            ></textarea>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Medical Information'}
          </button>
        </div>
      </form>
    </div>
  );
}