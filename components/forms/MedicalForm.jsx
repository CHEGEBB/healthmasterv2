import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { User, FileText, AlertCircle, Pill, ChevronDown, Upload, X, Droplet } from 'lucide-react';

export default function MedicalForm() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Adam Smith", specialty: "General Practice", image: "/assets/images/admin.png" },
    { id: 2, name: "Dr. Emily Johnson", specialty: "Pediatrics", image: "/assets/images/1.png" },
  ]);

  const [formState, setFormState] = useState({
    primaryPhysician: null,
    insuranceProvider: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    familyHistory: '',
    pastMedicalHistory: ''
  });

  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    image: null,
    prescribedDate: '',
    doctor: '',
    status: 'pending',
    frequency: 1,
    disease: '',
    sideEffects: ''
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

  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMedicine(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addMedicine = () => {
    setMedicines(prev => [...prev, newMedicine]);
    setNewMedicine({
      name: '',
      dosage: '',
      image: null,
      prescribedDate: '',
      doctor: '',
      status: 'pending',
      frequency: 1,
      disease: '',
      sideEffects: ''
    });
  };

  const removeMedicine = (index) => {
    setMedicines(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-[#1a202c] text-white">
      <h2 className="mb-6 text-2xl font-bold text-white">Medical Information</h2>
      
      <form className="space-y-6">
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
            <label htmlFor="familyHistory" className="block mb-1 text-sm font-medium text-white">Family Medical History</label>
            <textarea
              id="familyHistory"
              value={formState.familyHistory}
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
          <h3 className="mb-2 text-lg font-semibold">Current Medications</h3>
          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <div key={index} className="relative p-4 rounded-lg bg-slate-800">
                <button 
                  onClick={() => removeMedicine(index)}
                  className="absolute text-red-500 top-2 right-2 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col mb-2 sm:flex-row sm:items-center">
                  {medicine.image && (
                    <Image src={medicine.image} alt={medicine.name} width={50} height={50} className="mb-2 rounded sm:mb-0 sm:mr-4" />
                  )}
                  <div>
                    <h4 className="font-semibold">{medicine.name}</h4>
                    <p className="text-sm text-gray-600">{medicine.dosage}</p>
                  </div>
                </div>
                <p className="text-sm"><span className="font-medium">Prescribed by:</span> {medicine.doctor}</p>
                <p className="text-sm"><span className="font-medium">Date:</span> {medicine.prescribedDate}</p>
                <p className="text-sm"><span className="font-medium">Frequency:</span> {medicine.frequency} times per day</p>
                <p className="text-sm"><span className="font-medium">Disease:</span> {medicine.disease}</p>
                <p className="text-sm"><span className="font-medium">Side Effects:</span> {medicine.sideEffects}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-green-400 rounded-xl bg-slate-700">
          <h4 className="mb-4 font-semibold">Add New Medicine</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              value={newMedicine.name}
              onChange={handleMedicineChange}
              placeholder="Medicine Name"
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <input
              type="text"
              name="dosage"
              value={newMedicine.dosage}
              onChange={handleMedicineChange}
              placeholder="Dosage"
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <input
              type="date"
              name="prescribedDate"
              value={newMedicine.prescribedDate}
              onChange={handleMedicineChange}
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <input
              type="text"
              name="doctor"
              value={newMedicine.doctor}
              onChange={handleMedicineChange}
              placeholder="Prescribing Doctor"
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <input
              type="number"
              name="frequency"
              value={newMedicine.frequency}
              onChange={handleMedicineChange}
              placeholder="Frequency per day"
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <input
              type="text"
              name="disease"
              value={newMedicine.disease}
              onChange={handleMedicineChange}
              placeholder="Disease"
              className="w-full p-2 border border-green-400 rounded-2xl bg-slate-800"
            />
            <textarea
              name="sideEffects"
              value={newMedicine.sideEffects}
              onChange={handleMedicineChange}
              placeholder="Side Effects"
              className="w-full col-span-1 p-2 border border-green-400 sm:col-span-2 rounded-2xl bg-slate-800"
              rows="2"
            ></textarea>
            <div className="col-span-1 sm:col-span-2">
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="medicine-image-upload"
              />
              <label 
                htmlFor="medicine-image-upload" 
                className="flex items-center justify-center p-2 border border-green-400 cursor-pointer hover:bg-gray-500 rounded-2xl bg-slate-800"
              >
                <Upload className="mr-2" />
                Upload Medicine Image
              </label>
            </div>
          </div>
          <button 
            type="button" 
            onClick={addMedicine} 
            className="px-4 py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Medicine
          </button>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
          >
            Save Medical Information
          </button>
        </div>
      </form>
    </div>
  );
}