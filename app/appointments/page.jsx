'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { User, Calendar, Clock, Pill, CheckCircle, XCircle, AlertCircle, Heart, Edit, Trash2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';
import "../../sass/Appointments.scss";

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiologist", image: "/assets/images/1.png" },
  { id: 2, name: "Dr. Johnson", specialty: "Pediatrician", image: "/assets/images/2.png" },
  { id: 3, name: "Dr. Williams", specialty: "Dermatologist", image: "/assets/images/3.png" },
];

const defaultAppointments = [
  {
    id: 1,
    status: "pending",
    doctor: doctors[0],
    profession: "Cardiologist",
    date: "2024-09-15",
    time: "10:00 AM",
    medications: ["Aspirin", "Lisinopril"],
    conditions: ["Hypertension", "High cholesterol"],
  },
  {
    id: 2,
    status: "approved",
    doctor: doctors[1],
    profession: "Pediatrician",
    date: "2024-09-16",
    time: "2:30 PM",
    medications: ["Amoxicillin"],
    conditions: ["Ear infection"],
  },
  {
    id: 3,
    status: "cancelled",
    doctor: doctors[2],
    profession: "Dermatologist",
    date: "2024-09-17",
    time: "11:15 AM",
    medications: ["Tretinoin cream"],
    conditions: ["Acne"],
  },
];

const pastVisits = [
  { id: 1, date: "2024-08-01", doctor: "Dr. Smith", reason: "Annual checkup" },
  { id: 2, date: "2024-07-15", doctor: "Dr. Johnson", reason: "Flu symptoms" },
  { id: 3, date: "2024-06-20", doctor: "Dr. Williams", reason: "Skin rash" },
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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      status: "pending",
      doctor: doctors.find(d => d.id === parseInt(selectedDoctor)),
      profession: doctors.find(d => d.id === parseInt(selectedDoctor)).specialty,
      date,
      time,
      medications: medications.split(',').map(med => med.trim()),
      conditions: conditions.split(',').map(condition => condition.trim()),
    };
    if (isEditing) {
      setAppointments(appointments.map(app => app.id === selectedAppointment.id ? { ...newAppointment, id: app.id } : app));
      setIsEditing(false);
    } else {
      setAppointments([newAppointment, ...appointments]);
    }
    setShowSuccess(true);
    resetForm();
    setTimeout(() => setShowSuccess(false), 8000);
  };

  const resetForm = () => {
    setSelectedDoctor('');
    setDate('');
    setTime('');
    setReason('');
    setConditions('');
    setMedications('');
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDoctor(appointment.doctor.id.toString());
    setDate(appointment.date);
    setTime(appointment.time);
    setReason('');
    setConditions(appointment.conditions.join(', '));
    setMedications(appointment.medications.join(', '));
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const AppointmentCard = ({ id, status, doctor, profession, date, time, medications, conditions }) => (
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
      <div className="appointment-actions">
        <button onClick={() => handleEdit({ id, status, doctor, profession, date, time, medications, conditions })}><Edit size={16} /></button>
        <button onClick={() => handleDelete(id)}><Trash2 size={16} /></button>
      </div>
    </motion.div>
  );

  return (
    <div className={`appointments-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="header-cont">
        <Header />
      </div>
      <div className="content-wrapper">
        <div className={`sidenav ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>
        <div className="main-content">
          <motion.div 
            className="welcome-app"
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
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </motion.div>

          <motion.div 
            className="form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <form className="form-cont" onSubmit={handleSubmit}>
              <h2>{isEditing ? 'Edit Appointment' : 'Book an Appointment'}</h2>
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
              <button type="submit">{isEditing ? 'Update Appointment' : 'Book Appointment'}</button>
            </form>
          </motion.div>

          <motion.div 
            className="past-visits-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2>Past Hospital Visits</h2>
            <table className="past-visits-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {pastVisits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{visit.date}</td>
                    <td>{visit.doctor}</td>
                    <td>{visit.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

     <AnimatePresence>
  {showSuccess && (
    <motion.div 
      className="success-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="success-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle size={64} color="green" />
        <h2>Appointment {isEditing ? 'Updated' : 'Booked'} Successfully!</h2>
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
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              initial={{ 
                y: '-10vh', 
                x: '50%' 
              }}
              animate={{
                y: '100vh',
                x: ['0%', `${(i % 2 === 0 ? 100 : -100) * Math.random()}%`],
                rotate: Math.random() * 360,
              }}
              transition={{ 
                duration: Math.random() * 2 + 2, 
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

export default AppointmentsPage;