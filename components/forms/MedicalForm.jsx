import React, { useState } from 'react';
import Image from 'next/image';
import { User, FileText, AlertCircle, Pill } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import "../../sass/MedicalInfo.scss";

const doctors = [
  { id: 1, name: "Dr. Adam Smith", specialty: "General Practice", image: "/images/doctors/adam-smith.jpg" },
  { id: 2, name: "Dr. Emily Johnson", specialty: "Pediatrics", image: "/images/doctors/emily-johnson.jpg" },
  { id: 3, name: "Dr. Michael Chen", specialty: "Cardiology", image: "/images/doctors/michael-chen.jpg" },
  { id: 4, name: "Dr. Sarah Patel", specialty: "Neurology", image: "/images/doctors/sarah-patel.jpg" },
  { id: 5, name: "Dr. David Kim", specialty: "Orthopedics", image: "/images/doctors/david-kim.jpg" },
  { id: 6, name: "Dr. Lisa Rodriguez", specialty: "Dermatology", image: "/images/doctors/lisa-rodriguez.jpg" },
  { id: 7, name: "Dr. James Wilson", specialty: "Oncology", image: "/images/doctors/james-wilson.jpg" },
  { id: 8, name: "Dr. Anna Novak", specialty: "Gynecology", image: "/images/doctors/anna-novak.jpg" },
  { id: 9, name: "Dr. Robert Lee", specialty: "Psychiatry", image: "/images/doctors/robert-lee.jpg" },
  { id: 10, name: "Dr. Olivia Brown", specialty: "Endocrinology", image: "/images/doctors/olivia-brown.jpg" },
];

export default function MedicalForm() {
  const [formState, setFormState] = useState({
    primaryPhysician: '',
    insuranceProvider: '',
    policyNumber: '',
    allergies: '',
    currentMedications: '',
    familyHistory: '',
    pastMedicalHistory: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handlePhysicianChange = (value) => {
    setFormState(prev => ({ ...prev, primaryPhysician: value }));
  };

  return (
    <div className="medical-info">
      <form className="space-y-6">
        <div className="form-group">
          <div className="form-item select">
            <Select onValueChange={handlePhysicianChange} value={formState.primaryPhysician}>
              <SelectTrigger>
                <SelectValue placeholder="Primary care physician" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    <div className="doctor-option">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={40}
                        height={40}
                        className="mr-3 rounded-full"
                      />
                      <div>
                        <div>{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <User className="form-icon" />
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