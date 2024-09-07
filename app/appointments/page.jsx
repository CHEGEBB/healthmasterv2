'use client'

import React, { useState } from 'react';
import Image from "next/image";
import { User, Calendar, Clock, Pill, CheckCircle, XCircle, AlertCircle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';
import "../../sass/Appointments.scss";

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiologist", image: "/assets/images/1.png" },
  { id: 2, name: "Dr. Johnson", specialty: "Pediatrician", image: "/assets/images/2.png" },
  { id: 3, name: "Dr. Williams", specialty: "Dermatologist", image: "/assets/images/3.png" },
];

// Default appointments for showcasing the design
const defaultAppointments = [
  {
    status: "pending",
    doctor: doctors[0],
    profession: "Cardiologist",
    date: "2024-09-15",
    time: "10:00 AM",
    medications: ["Aspirin", "Lisinopril"],
    conditions: ["Hypertension", "High cholesterol"],
  },
  {
    status: "approved",
    doctor: doctors[1],
    profession: "Pediatrician",
    date: "2024-09-16",
    time: "2:30 PM",
    medications: ["Amoxicillin"],
    conditions: ["Ear infection"],
  },
  {
    status: "cancelled",
    doctor: doctors[2],
    profession: "Dermatologist",
    date: "2024-09-17",
    time: "11:15 AM",
    medications: ["Tretinoin cream"],
    conditions: ["Acne"],
  },
];

function AppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [conditions, setConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointments, setAppointments] = useState(defaultAppointments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      status: "pending",
      doctor: doctors.find(d => d.id === parseInt(selectedDoctor)),
      profession: doctors.find(d => d.id === parseInt(selectedDoctor)).specialty,
      date,
      time,
      medications: medications.split(',').map(med => med.trim()),
      conditions: conditions.split(',').map(condition => condition.trim()),
    };
    setAppointments([newAppointment, ...appointments]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 8000);
  };

  const AppointmentCard = ({ status, doctor, profession, date, time, medications, conditions }) => (
    <motion.div 
      className={`appointment-card ${status}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="doctor-info">
        <Image src={doctor.image} alt={doctor.name} width={60} height={60} className="doctor-image" />
        <div>
          <h3>{doctor.name}</h3>
          <p>{profession}</p>
        </div>
      </div>
      <div className="appointment-details">
        <p><Calendar size={16} /> {date}</p>
        <p><Clock size={16} /> {time}</p>
      </div>
      <div className="medications">
        <h4><Pill size={16} /> Medications:</h4>
        {medications.map((med, index) => (
          <span key={index} className="medication-bubble">{med}</span>
        ))}
      </div>
      <div className="conditions">
        <h4><Heart size={16} /> Conditions:</h4>
        <p>{conditions.join(', ')}</p>
      </div>
      <div className={`status ${status}`}>
        {status === 'pending' && <AlertCircle size={20} />}
        {status === 'approved' && <CheckCircle size={20} />}
        {status === 'cancelled' && <XCircle size={20} />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </motion.div>
  );

  return (
    <div className="appointments-page">
      <div className="header-cont">
        <Header />
      </div>
      <div className="content-wrapper">
        <div className="sidebar-cont">
          <Sidebar />
        </div>
        <div className="main-content">
          <motion.div 
            className="welcome"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome-svg">
              <Image
                src="/assets/images/appointm.png"
                alt="Welcome Illustration"
                width={300}
                height={300}
                quality={100}
              />
            </div>
            <div className="welcome-message-app">
              <h1>Welcome to HealthMaster!👋</h1>
              <p>Book, manage, and track your appointments</p>
            </div>
          </motion.div>

          <motion.div 
            className="appointments-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {appointments.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </motion.div>

          <motion.div 
            className="form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <form className="form-cont" onSubmit={handleSubmit}>
              <div className="form-group">
                <select 
                  value={selectedDoctor} 
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
                <label>Doctor</label>
                {selectedDoctor && (
                  <Image 
                    src={doctors.find(d => d.id === parseInt(selectedDoctor)).image} 
                    alt="Doctor" 
                    width={40}
                    height={40}
                    className="selected-doctor-image" 
                  />
                )}
              </div>
              <div className="form-group">
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-group">
                <input 
                  type="time" 
                  id="time"
                  name="time"
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  required 
                />
                <label htmlFor="time">Time</label>
              </div>
              <div className="form-group">
                <textarea 
                  id="reason"
                  name="reason"
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  required
                ></textarea>
                <label htmlFor="reason">Reason for Visit</label>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  id="conditions"
                  name="conditions"
                  value={conditions} 
                  onChange={(e) => setConditions(e.target.value)} 
                  required 
                />
                <label htmlFor="conditions">Conditions (comma-separated)</label>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  id="medications"
                  name="medications"
                  value={medications} 
                  onChange={(e) => setMedications(e.target.value)} 
                  required 
                />
                <label htmlFor="medications">Medications (comma-separated)</label>
              </div>
              <button type="submit">Book Appointment</button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="success-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle size={64} color="green" />
            <h2>Appointment Booked Successfully!</h2>
            <p>We will get back to you shortly with the appointment details.</p>
            <motion.div 
              className="celebration"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppointmentsPage;