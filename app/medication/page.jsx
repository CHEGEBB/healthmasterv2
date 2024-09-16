"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../components/layout/header';
import Sidebar from '../../components/layout/sidebar';
import { Trash2, CheckCircle, Sun, Bell, Menu, X } from 'lucide-react';
import Modal from '../../components/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../sass/medications.scss";

const MedicationTimeline = ({ medications }) => (
  <div className="medication-timeline">
    <h2>My Medication Journey</h2>
    <div className="timeline">
      {medications.map((med, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-bubble">
            <Image src={med.doctorImage} alt={med.doctor} width={40} height={40} />
          </div>
          <div className="timeline-content">
            <h3>{med.name}</h3>
            <p>Prescribed by {med.doctor}</p>
            <p>{med.prescribedDate}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SideEffectsCarousel = ({ medications }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % medications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [medications]);

  return (
    <div className="side-effects-carousel">
      <h2>Medication Information</h2>
      <div className="carousel-content">
        <h3>{medications[currentIndex].name}</h3>
        <p>Treats: {medications[currentIndex].disease}</p>
        <p>Side Effects: {medications[currentIndex].sideEffects}</p>
      </div>
    </div>
  );
};

export default function Page() {
  const [medications, setMedications] = useState([
    {
      name: 'Atorvastatin',
      dosage: '10mg',
      image: '/assets/images/medicine1.png',
      prescribedDate: '2024-09-01',
      doctor: 'Dr. Smith',
      doctorImage: '/assets/images/1.png',
      status: 'pending',
      frequency: 1,
      disease: 'Cholesterol',
      sideEffects: 'Muscle pain, digestive problems'
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      image: '/assets/images/medicine2.png',
      prescribedDate: '2024-08-21',
      doctor: 'Dr. Wilson',
      doctorImage: '/assets/images/2.png',
      status: 'pending',
      frequency: 2,
      disease: 'Diabetes',
      sideEffects: 'Nausea, diarrhea, stomach discomfort'
    },
    {
      name: 'Losartan',
      dosage: '50mg',
      image: '/assets/images/medicine3.png',
      prescribedDate: '2024-07-15',
      doctor: 'Dr. Johnson',
      doctorImage: '/assets/images/3.png',
      status: 'pending',
      frequency: 1,
      disease: 'Hypertension',
      sideEffects: 'Dizziness, headache, fatigue'
    },
    {
      name: 'Valsartan',
      dosage: '40mg',
      image: '/assets/images/med.webp',
      prescribedDate: '2024-06-30',
      doctor: 'Dr. Davis',
      doctorImage: '/assets/images/4.png',
      status: 'not-taken',
      frequency: 1,
      disease: 'Hypertension',
      sideEffects: 'Headache, dizziness, stomach pain'
    }
  ]);

  const [history, setHistory] = useState([
    {
      name: 'Amlodipine',
      dosage: '5mg',
      prescribedDate: '2023-11-10',
      doctor: 'Dr. Kumar',
      doctorImage: '/assets/images/3.png',
      image: '/assets/images/medicine5.png',
      status: 'completed',
      frequency: 1,
      disease: 'Hypertension',
      sideEffects: 'Swelling, dizziness, flushing'
    },
    {
      name: 'Metoprolol',
      dosage: '25mg',
      prescribedDate: '2023-10-05',
      doctor: 'Dr. Patel',
      doctorImage: '/assets/images/4.png',
      image: '/assets/images/med7.jpg',
      status: 'completed',
      frequency: 1,
      disease: 'Hypertension',
      sideEffects: 'Fatigue, dizziness, cold hands and feet'
    },
    {
      name: 'Simvastatin',
      dosage: '20mg',
      prescribedDate: '2023-09-15',
      doctor: 'Dr. Gupta',
      doctorImage: '/assets/images/1.png',
      image: '/assets/images/med6.jpg',
      status: 'completed',
      frequency: 1,
      disease: 'Cholesterol',
      sideEffects: 'Muscle pain, liver problems, digestive issues'
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      prescribedDate: '2023-08-30',
      doctor: 'Dr. Patel',
      doctorImage: '/assets/images/2.png',
      image: '/assets/images/med2.png',
      status: 'completed',
      frequency: 1,
      disease: 'Hypertension',
      sideEffects: 'Dizziness, headache, dry cough'
    }
  ]);

  const [showDiseasePopup, setShowDiseasePopup] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarms, setAlarms] = useState({});
  const [currentAlarmMed, setCurrentAlarmMed] = useState(null);

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

  const addMedication = (newMed) => {
    setMedications([...medications, newMed]);
    setShowSuccessModal(true);
  };

  const markAsCompleted = (index) => {
    const completedMed = medications[index];
    setHistory([...history, { ...completedMed, status: 'completed' }]);
    setMedications(medications.filter((_, i) => i !== index));
  };

  const deleteMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const renderFrequencyIcon = (frequency) => {
    const icons = [];
    for (let i = 0; i < frequency; i++) {
      icons.push(<Sun key={i} className="frequency-icon" />);
    }
    return icons;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'amber';
      case 'not-taken':
        return 'red';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const setAlarm = (medName) => {
    setCurrentAlarmMed(medName);
    setShowAlarmModal(true);
  };

  const handleSetAlarm = (time) => {
    setAlarms({ ...alarms, [currentAlarmMed]: time });
    setShowAlarmModal(false);
    setCurrentAlarmMed(null);
  };

  const handleDiseaseSelection = (disease) => {
    setSelectedDisease(disease);
    setShowDiseasePopup(false);
    setShowForm(true);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const medForDate = medications.find(med => new Date(med.prescribedDate).toDateString() === date.toDateString());
      if (medForDate) {
        return <div className="medication-dot"></div>;
      }
    }
  };

  return (
    <div className={`medications-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="header-cont-med">
        <Header />
      </div>
      <div className="content-wrapper-med">
        <div className={`sidenav ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>
        <div className="main-content-med">
          <h1>My Medications</h1>

          <div className="info-cards">
            <MedicationTimeline medications={medications} />
            <SideEffectsCarousel medications={medications} />
          </div>

          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
              className="dark-theme-calendar"
            />
          </div>

          <div className="medications-grid">
            {medications.map((med, index) => (
              <div key={index} className={`med-card ${getStatusColor(med.status)}`}>
                <div className="med-image">
                  <Image src={med.image} alt={med.name} width={500} height={500} quality={100} />
                </div>
                <div className="med-details">
                  <h3>{med.name}</h3>
                  <p className="dosage">Dosage: {med.dosage}</p>
                  <p className="frequency">
                    Frequency: {renderFrequencyIcon(med.frequency)}
                  </p>
                  <p className="disease">Treating: {med.disease}</p>
                  <div className="doctor-info">
                    <Image src={med.doctorImage} alt={med.doctor} width={30} height={30} className="doctor-image" />
                    <p>{med.doctor}</p>
                  </div>
                  <p className="date">Prescribed: {med.prescribedDate}</p>
                  {alarms[med.name] && (
                    <p className="alarm">Alarm set for: {alarms[med.name]}</p>
                  )}
                </div>
                <div className="med-actions">
                  <button onClick={() => markAsCompleted(index)} className="complete-btn">
                    <CheckCircle /> Mark as Taken
                  </button>
                  <button onClick={() => deleteMedication(index)} className="delete-btn">
                    <Trash2 /> Remove
                  </button>
                  <button onClick={() => setAlarm(med.name)} className="alarm-btn">
                    <Bell /> Set Alarm
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="history-section">
            <h2>Medical History</h2>
            <div className="medications-grid">
              {history.map((med, index) => (
                <div key={index} className={`med-card ${getStatusColor(med.status)}`}>
                  <div className="med-image">
                    <Image src={med.image} alt={med.name} width={500} height={500} quality={100} />
                  </div>
                  <div className="med-details">
                    <h3>{med.name}</h3>
                    <p className="dosage">Dosage: {med.dosage}</p>
                    <p className="frequency">
                      Frequency: {renderFrequencyIcon(med.frequency)}
                    </p>
                    <p className="disease">Treated: {med.disease}</p>
                    <div className="doctor-info">
                      <Image src={med.doctorImage} alt={med.doctor} width={30} height={30} className="doctor-image" />
                      <p>{med.doctor}</p>
                    </div>
                    <p className="date">Prescribed: {med.prescribedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showDiseasePopup && (
            <Modal onClose={() => setShowDiseasePopup(false)}>
              <div className="disease-selection">
                <h2>Are you diagnosed with any of these diseases?</h2>
                <div className="illness-options">
                  <button onClick={() => handleDiseaseSelection('HIV')}>HIV</button>
                  <button onClick={() => handleDiseaseSelection('Diabetes')}>Diabetes</button>
                  <button onClick={() => handleDiseaseSelection('Hypertension')}>Hypertension</button>
                  <button onClick={() => handleDiseaseSelection('Asthma')}>Asthma</button>
                </div>
              </div>
            </Modal>
          )}

          {showForm && (
            <form className="add-medication-form" onSubmit={(e) => {
              e.preventDefault();
              addMedication({
                name: e.target.name.value,
                dosage: e.target.dosage.value,
                image: '/assets/images/default-med.png',
                prescribedDate: e.target.prescribedDate.value,
                doctor: e.target.doctor.value,
                doctorImage: '/assets/images/default-doctor.png',
                status: 'pending',
                frequency: parseInt(e.target.frequency.value),
                disease: selectedDisease || e.target.disease.value,
                sideEffects: e.target.sideEffects.value,
              });
            }}>
              <h2>Add New Medication</h2>
              <div className="form-group">
                <input type="text" id="name" name="name" required />
                <label htmlFor="name">Medication Name</label>
                </div>
              <div className="form-group">
                <input type="text" id="dosage" name="dosage" required />
                <label htmlFor="dosage">Dosage</label>
              </div>
              <div className="form-group">
                <input type="date" id="prescribedDate" name="prescribedDate" required />
                <label htmlFor="prescribedDate">Prescribed Date</label>
              </div>
              <div className="form-group">
                <input type="text" id="doctor" name="doctor" required />
                <label htmlFor="doctor">Doctor Name</label>
              </div>
              <div className="form-group">
                <input type="number" id="frequency" name="frequency" min="1" max="4" required />
                <label htmlFor="frequency">Frequency (times per day)</label>
              </div>
              {!selectedDisease && (
                <div className="form-group">
                  <input type="text" id="disease" name="disease" required />
                  <label htmlFor="disease">Disease/Condition</label>
                </div>
              )}
              <div className="form-group">
                <input type="text" id="sideEffects" name="sideEffects" required />
                <label htmlFor="sideEffects">Side Effects</label>
              </div>
              {selectedDisease === 'HIV' && (
                <>
                  <div className="form-group">
                    <input type="text" id="cd4Count" name="cd4Count" />
                    <label htmlFor="cd4Count">CD4 Count</label>
                  </div>
                  <div className="form-group">
                    <input type="text" id="viralLoad" name="viralLoad" />
                    <label htmlFor="viralLoad">Viral Load</label>
                  </div>
                </>
              )}
              <button type="submit" className="submit-btn">Add Medication</button>
            </form>
          )}

          {showSuccessModal && (
            <Modal onClose={() => setShowSuccessModal(false)}>
              <div className="success-message">
                <h2>Medication Added Successfully!</h2>
                <div className="balloons">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="balloon" style={{animationDelay: `${i * 0.2}s`}}></div>
                  ))}
                </div>
              </div>
            </Modal>
          )}

          {showAlarmModal && (
            <Modal onClose={() => setShowAlarmModal(false)}>
              <div className="alarm-setting">
                <h2>Set Alarm for {currentAlarmMed}</h2>
                <input 
                  type="time" 
                  onChange={(e) => handleSetAlarm(e.target.value)}
                  className="alarm-input"
                />
                <button onClick={() => setShowAlarmModal(false)} className="set-alarm-btn">Set Alarm</button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}