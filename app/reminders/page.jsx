'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Bell, Calendar, Clock, Pill, CheckCircle, XCircle, AlertCircle, Edit, Trash2, Volume2, VolumeX, Heart, Zap, Sun, Moon, Activity, Coffee, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';
import "../../sass/reminders.scss";

const medicines = [
  { id: 1, name: "Aspirin", image: "/assets/images/med2.jpg", description: "Pain reliever and blood thinner" },
  { id: 2, name: "Lisinopril", image: "/assets/images/med2.png", description: "ACE inhibitor for high blood pressure" },
  { id: 3, name: "Metformin", image: "/assets/images/med4.png", description: "Oral medication for type 2 diabetes" },
  { id: 4, name: "Simvastatin", image: "/assets/images/simvastatin.png", description: "Statin medication for high cholesterol" },
  { id: 5, name: "Ibuprofen", image: "/assets/images/ibuprofen.png", description: "Anti-inflammatory pain reliever" },
  { id: 6, name: "Omeprazole", image: "/assets/images/omeprazole.png", description: "Proton pump inhibitor for acid reflux" },
];

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Johnson", specialty: "Endocrinologist" },
  { id: 3, name: "Dr. Williams", specialty: "General Practitioner" },
  { id: 4, name: "Dr. Brown", specialty: "Neurologist" },
  { id: 5, name: "Dr. Davis", specialty: "Gastroenterologist" },
];

const reminderSounds = [
  { id: 1, name: "Chime", file: "/assets/sounds/chime.mp3" },
  { id: 2, name: "Nature", file: "/assets/sounds/nature.mp3" },
  { id: 3, name: "Digital", file: "/assets/sounds/digital.mp3" },
  { id: 4, name: "Gentle Bell", file: "/assets/sounds/gentle-bell.mp3" },
  { id: 5, name: "Soft Melody", file: "/assets/sounds/soft-melody.mp3" },
];

const defaultReminders = [
  {
    id: 1,
    medicineId: 1,
    dosage: "100mg",
    frequency: "Once daily",
    time: "08:00",
    doctorId: 1,
    soundId: 1,
    active: true,
    notes: "Take with food",
  },
  {
    id: 2,
    medicineId: 2,
    dosage: "10mg",
    frequency: "Twice daily",
    time: "09:00,21:00",
    doctorId: 2,
    soundId: 2,
    active: true,
    notes: "Monitor blood pressure",
  },
  {
    id: 3,
    medicineId: 3,
    dosage: "500mg",
    frequency: "With meals",
    time: "08:00,13:00,19:00",
    doctorId: 3,
    soundId: 3,
    active: false,
    notes: "Check blood sugar levels",
  },
];

function EnhancedRemindersPage() {
  const [reminders, setReminders] = useState(defaultReminders);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlarms, setActiveAlarms] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, streak: 0 });
  const [theme, setTheme] = useState('light');
  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedReminder, setSelectedReminder] = useState(null);

  const [newReminder, setNewReminder] = useState({
    medicineId: '',
    dosage: '',
    frequency: '',
    time: '',
    doctorId: '',
    soundId: '',
    notes: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkReminders();
    }, 60000);

    updateStats();

    return () => clearInterval(timer);
  }, [reminders]);

  const updateStats = () => {
    const total = reminders.length;
    const active = reminders.filter(r => r.active).length;
    const completed = total - active;
    const streak = Math.floor(Math.random() * 10);
    setStats({ total, active, completed, streak });
  };

  const checkReminders = () => {
    const now = new Date();
    const currentHoursMinutes = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    reminders.forEach(reminder => {
      if (reminder.active && reminder.time.split(',').includes(currentHoursMinutes)) {
        triggerAlarm(reminder);
      }
    });
  };

  const triggerAlarm = (reminder) => {
    setActiveAlarms(prevAlarms => [...prevAlarms, reminder]);
    const sound = reminderSounds.find(s => s.id === reminder.soundId);
    if (sound) {
      const audio = new Audio(sound.file);
      audio.play();
    }
  };

  const dismissAlarm = (reminderId) => {
    setActiveAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== reminderId));
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
    updateStats();
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    updateStats();
  };

  const handleAddReminder = () => {
    const id = reminders.length + 1;
    const newReminderWithId = { ...newReminder, id, active: true };
    setReminders([...reminders, newReminderWithId]);
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    updateStats();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReminder({ ...newReminder, [name]: value });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark');
  };

  const incrementWaterIntake = () => {
    setWaterIntake(prevIntake => prevIntake + 1);
  };

  const ReminderCard = ({ reminder }) => {
    const { id, medicineId, dosage, frequency, time, doctorId, soundId, active, notes } = reminder;
    const medicine = medicines.find(m => m.id === medicineId);
    const doctor = doctors.find(d => d.id === doctorId);
    const sound = reminderSounds.find(s => s.id === soundId);

    return (
      <motion.div 
        className={`reminder-card ${active ? 'active' : 'inactive'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="medication-info">
          <Image src={medicine.image} alt={medicine.name} width={60} height={60} className="medication-image" />
          <div>
            <h3>{medicine.name}</h3>
            <p>{dosage}</p>
          </div>
        </div>
        <div className="reminder-details">
          <p><Pill size={16} /> {frequency}</p>
          <p><Clock size={16} /> {time}</p>
          <p><Heart size={16} /> {doctor.name} ({doctor.specialty})</p>
          <p><Volume2 size={16} /> {sound.name}</p>
          {notes && <p><AlertCircle size={16} /> {notes}</p>}
        </div>
        <div className={`status ${active ? 'active' : 'inactive'}`}>
          {active ? <Bell size={20} /> : <VolumeX size={20} />}
          {active ? 'Active' : 'Inactive'}
        </div>
        <div className="reminder-actions">
          <button onClick={() => toggleReminder(id)}>
            {active ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button onClick={() => setSelectedReminder(reminder)}>
            <Edit size={16} />
          </button>
          <button onClick={() => handleDelete(id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`reminders-page ${theme}`}>
      <div className="header-cont">
        <Header />
      </div>
      <div className="content-wrapper">
        <div className="sidebar-cont">
          <Sidebar />
        </div>
        <div className="main-content">
          <motion.div 
            className="reminders-dashboard"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="dashboard-header">
              <h1>Your Health Companion</h1>
              <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              </button>
            </div>
            <div className="stats-container">
              <div className="stat-card">
                <Zap size={24} />
                <h3>Total Reminders</h3>
                <p>{stats.total}</p>
              </div>
              <div className="stat-card">
                <Bell size={24} />
                <h3>Active Reminders</h3>
                <p>{stats.active}</p>
              </div>
              <div className="stat-card">
                <CheckCircle size={24} />
                <h3>Completed Today</h3>
                <p>{stats.completed}</p>
              </div>
              <div className="stat-card">
                <Activity size={24} />
                <h3>Streak</h3>
                <p>{stats.streak} days</p>
              </div>
            </div>
            <div className="current-time">
              <Clock size={20} />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="water-tracker">
              <Droplet size={20} />
              <span>Water Intake: {waterIntake} glasses</span>
              <button onClick={incrementWaterIntake}>+</button>
            </div>
          </motion.div>

          <motion.div 
            className="reminders-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {reminders.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </motion.div>

          <motion.div 
            className="add-reminder-button"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button onClick={() => setShowAddModal(true)}>Add New Reminder</button>
          </motion.div>

          <AnimatePresence>
            {showAddModal && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="add-reminder-modal"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <h2>Add New Reminder</h2>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddReminder(); }}>
                    <select name="medicineId" value={newReminder.medicineId} onChange={handleInputChange} required>
                      <option value="">Select Medicine</option>
                      {medicines.map(med => (
                        <option key={med.id} value={med.id}>{med.name}</option>
                      ))}
                    </select>
                    <input type="text" name="dosage" placeholder="Dosage" value={newReminder.dosage} onChange={handleInputChange} required />
                    <input type="text" name="frequency" placeholder="Frequency" value={newReminder.frequency} onChange={handleInputChange} required />
                    <input type="text" name="time" placeholder="Time (HH:MM)" value={newReminder.time} onChange={handleInputChange} required />
                    <select name="doctorId" value={newReminder.doctorId} onChange={handleInputChange} required>
                      <option value="">Select Doctor</option>
                      {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                      ))}
                    </select>
                    <select name="soundId" value={newReminder.soundId} onChange={handleInputChange} required>
                      <option value="">Select Reminder Sound</option>
                      {reminderSounds.map(sound => (
                        <option key={sound.id} value={sound.id}>{sound.name}</option>
                      ))}
                    </select>
                    <textarea name="notes" placeholder="Additional Notes" value={newReminder.notes} onChange={handleInputChange}></textarea>
                    <div className="modal-actions">
                      <button type="submit">Add Reminder</button>
                      <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <h2>Reminder Added Successfully!</h2>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeAlarms.map((alarm) => (
              <motion.div 
                key={alarm.id}
                className="alarm-modal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <h2>Time to take your medication!</h2>
                <p>{medicines.find(m => m.id === alarm.medicineId).name} - {alarm.dosage}</p>
                <button onClick={() => dismissAlarm(alarm.id)}>Dismiss</button>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {selectedReminder && (
              <motion.div 
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="edit-reminder-modal"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <h2>Edit Reminder</h2>
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    setReminders(reminders.map(r => r.id === selectedReminder.id ? selectedReminder : r));
                    setSelectedReminder(null);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                  }}>
                    <select 
                      name="medicineId" 
                      value={selectedReminder.medicineId} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, medicineId: parseInt(e.target.value)})}
                      required
                    >
                      {medicines.map(med => (
                        <option key={med.id} value={med.id}>{med.name}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      name="dosage" 
                      placeholder="Dosage" 
                      value={selectedReminder.dosage} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, dosage: e.target.value})}
                      required 
                    />
                    <input 
                      type="text" 
                      name="frequency" 
                      placeholder="Frequency" 
                      value={selectedReminder.frequency} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, frequency: e.target.value})}
                      required 
                    />
                    <input 
                      type="text" 
                      name="time" 
                      placeholder="Time (HH:MM)" 
                      value={selectedReminder.time} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, time: e.target.value})}
                      required 
                    />
                    <select 
                      name="doctorId" 
                      value={selectedReminder.doctorId} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, doctorId: parseInt(e.target.value)})}
                      required
                    >
                      {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                      ))}
                    </select>
                    <select 
                      name="soundId" 
                      value={selectedReminder.soundId} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, soundId: parseInt(e.target.value)})}
                      required
                    >
                      {reminderSounds.map(sound => (
                        <option key={sound.id} value={sound.id}>{sound.name}</option>
                      ))}
                    </select>
                    <textarea 
                      name="notes" 
                      placeholder="Additional Notes" 
                      value={selectedReminder.notes} 
                      onChange={(e) => setSelectedReminder({...selectedReminder, notes: e.target.value})}
                    ></textarea>
                    <div className="modal-actions">
                      <button type="submit">Update Reminder</button>
                      <button type="button" onClick={() => setSelectedReminder(null)}>Cancel</button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default EnhancedRemindersPage;