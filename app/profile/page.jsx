'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Upload, Heart, Activity, Droplet, AlertTriangle, Calendar, Pill, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../sass/Profile.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfilePage = () => {
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    dob: '1988-05-15',
    bloodGroup: 'A+',
    height: '175 cm',
    weight: '70 kg',
    bmi: '22.9',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Peanuts', 'Penicillin'],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    ],
    doctor: 'Dr. Jane Smith',
    emergencyContact: 'Sarah Doe (Wife) - +1 234 567 8900',
    profileImage: '/assets/images/patient.jpg',
    doctorImage: '/assets/images/1.png',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-09-20', time: '10:00 AM', doctor: 'Dr. Jane Smith', purpose: 'Regular Checkup' },
    { id: 2, date: '2024-10-05', time: '2:30 PM', doctor: 'Dr. Mark Johnson', purpose: 'Diabetes Follow-up' },
  ]);

  const [medicalHistory, setMedicalHistory] = useState([
    { date: '2023-11-10', event: 'Appendectomy', details: 'Laparoscopic surgery performed by Dr. Sarah Lee' },
    { date: '2022-08-22', event: 'Fracture - Left Arm', details: 'Cast applied, physiotherapy recommended' },
    { date: '2021-03-15', event: 'Diagnosed with Type 2 Diabetes', details: 'Started on Metformin' },
  ]);

  useEffect(() => {
    // Simulate fetching patient data
    setTimeout(() => {
      console.log('Patient data loaded');
    }, 1000);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientData({ ...patientData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const bloodPressureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Systolic',
        data: [120, 118, 130, 125, 122, 128],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Diastolic',
        data: [80, 78, 82, 79, 81, 80],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const bloodSugarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fasting Blood Sugar',
        data: [95, 100, 92, 98, 103, 97],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 bg-zinc-950 text-gray-200 ${styles.profilePage}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Link href="/dashboard" className="inline-flex items-center mb-6 text-xl font-semibold hover:underline">
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Patient Profile</h1>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 ${styles.profileCard}`}
          >
            <div className="relative mb-4">
              <Image
                src={patientData.profileImage}
                alt="Patient"
                width={200}
                height={200}
                className="object-cover w-32 h-32 mx-auto rounded-full sm:w-48 sm:h-48"
              />
              <label htmlFor="imageUpload" className={`absolute bottom-0 right-1/4 bg-blue-600 p-2 rounded-full cursor-pointer ${styles.uploadBtn}`}>
                <Upload size={20} />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <h2 className="mb-4 text-xl font-semibold text-center sm:text-2xl">{patientData.name}</h2>
            <div className="space-y-2 text-sm text-center sm:text-base">
              <p>Age: {patientData.age}</p>
              <p>Gender: {patientData.gender}</p>
              <p>Date of Birth: {patientData.dob}</p>
              <p>Height: {patientData.height}</p>
              <p>Weight: {patientData.weight}</p>
              <p>BMI: {patientData.bmi}</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 md:col-span-2 ${styles.profileCard}`}
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Medical Information</h2>
            <div className="space-y-4 text-sm sm:text-base">
              <p className="flex items-center">
                <Droplet className="mr-2 text-red-500" /> Blood Group: {patientData.bloodGroup}
              </p>
              <div>
                <h3 className="flex items-center font-semibold">
                  <Activity className="mr-2 text-blue-500" /> Conditions:
                </h3>
                <ul className="ml-6 list-disc list-inside">
                  {patientData.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center font-semibold">
                  <AlertTriangle className="mr-2 text-yellow-500" /> Allergies:
                </h3>
                <ul className="ml-6 list-disc list-inside">
                  {patientData.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center font-semibold">
                  <Pill className="mr-2 text-green-500" /> Medications:
                </h3>
                <ul className="ml-6 list-disc list-inside">
                  {patientData.medications.map((medication, index) => (
                    <li key={index}>{medication.name} - {medication.dosage}, {medication.frequency}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 ${styles.profileCard}`}
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Primary Doctor</h2>
            <div className="flex items-center">
              <Image
                src={patientData.doctorImage}
                alt="Doctor"
                width={80}
                height={80}
                className="object-cover w-16 h-16 mr-4 rounded-full sm:w-20 sm:h-20"
              />
              <div>
                <h3 className="text-sm font-semibold sm:text-base">{patientData.doctor}</h3>
                <p className="text-sm">Specialization: Cardiology</p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 md:col-span-2 ${styles.profileCard}`}
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Upcoming Appointments</h2>
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="p-3 rounded-lg sm:p-4 bg-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm font-semibold sm:text-base">{appointment.date} at {appointment.time}</p>
                      <p className="text-sm">{appointment.doctor}</p>
                      <p className="text-xs text-gray-400 sm:text-sm">{appointment.purpose}</p>
                    </div>
                    <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded sm:px-4 sm:py-2 hover:bg-blue-700">
                      Reschedule
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 md:col-span-3 ${styles.profileCard}`}
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Health Metrics</h2>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">Blood Pressure</h3>
                <Line data={bloodPressureData} options={{ responsive: true }} />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold sm:text-xl">Blood Sugar</h3>
                <Line data={bloodSugarData} options={{ responsive: true }} />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 md:col-span-3 ${styles.profileCard}`}
          >
            <h2 className="flex items-center justify-between mb-4 text-xl font-semibold sm:text-2xl">
              Medical History
              <button onClick={() => toggleSection('medicalHistory')} className="text-blue-500 hover:text-blue-400">
                {expandedSections.medicalHistory ? <ChevronUp /> : <ChevronDown />}
              </button>
            </h2>
            {expandedSections.medicalHistory && (
              <ul className="space-y-4">
                {medicalHistory.map((event, index) => (
                  <li key={index} className="p-3 rounded-lg sm:p-4 bg-zinc-800">
                    <p className="text-sm font-semibold sm:text-base">{event.date}</p>
                    <p className="text-sm">{event.event}</p>
                    <p className="text-xs text-gray-400 sm:text-sm">{event.details}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={`p-4 sm:p-6 bg-zinc-900 rounded-lg shadow-md col-span-1 md:col-span-3 ${styles.profileCard}`}
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Edit Profile</h2>
            <button
              onClick={handleEditToggle}
              className={`px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${styles.editBtn}`}
            >
              <Edit className="inline mr-2" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            {isEditing && (
              <form className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={patientData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block mb-1 text-sm">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={patientData.age}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block mb-1 text-sm">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={patientData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dob" className="block mb-1 text-sm">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={patientData.dob}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block mb-1 text-sm">Height</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={patientData.height}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block mb-1 text-sm">Weight</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={patientData.weight}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="emergencyContact" className="block mb-1 text-sm">Emergency Contact</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={patientData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm rounded bg-zinc-800"
                  />
                </div>
              </form>
            )}
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;