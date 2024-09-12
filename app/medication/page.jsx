"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../components/layout/header';
import Sidebar from '../../components/layout/sidebar';
import { Trash2, CheckCircle, Sun, CloudMoon, Coffee, AlertCircle ,Menu, XCircleIcon, X} from 'lucide-react';
import Modal from '../../components/Modal';
import "../../sass/medications.scss";

export default function Page() {
  const [medications, setMedications] = useState([
    {
      name: 'Atorvastatin',
      dosage: '10mg',
      image: '/assets/images/medicine1.png',
      prescribedDate: '2024-09-01',
      doctor: 'Dr. Smith',
      doctorImage: '/assets/images/1.png',
      status: 'pending', // Status: pending (yellow), completed (green), or not taken (red)
      frequency: 1, // 1 means once a day
      disease: 'Cholesterol',
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      image: '/assets/images/medicine2.png',
      prescribedDate: '2024-08-21',
      doctor: 'Dr. Wilson',
      doctorImage: '/assets/images/2.png',
      status: 'pending', // Adjust the status as needed
      frequency: 2, // Twice a day
      disease: 'Diabetes',
    },
    {
      name: 'Losartan',
      dosage: '50mg',
      image: '/assets/images/medicine3.png',
      prescribedDate: '2024-07-15',
      doctor: 'Dr. Johnson',
      doctorImage: '/assets/images/3.png',
      status: 'pending',
      frequency: 1, // Once a day
      disease: 'Hypertension',
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
    }
  ]);

  const [showPopup, setShowPopup] = useState(true);
  const [selectedIllness, setSelectedIllness] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
      setShowForm(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
                </div>
                <div className="med-actions">
                  <button onClick={() => markAsCompleted(index)} className="complete-btn">
                    <CheckCircle /> Mark as Taken
                  </button>
                  <button onClick={() => deleteMedication(index)} className="delete-btn">
                    <Trash2 /> Remove
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

          {showPopup && (
            <Modal onClose={() => setShowPopup(false)}>
              <h2>Select Your Condition</h2>
              <div className="illness-options">
                <button onClick={() => setSelectedIllness('HIV')}>HIV</button>
                <button onClick={() => setSelectedIllness('Diabetes')}>Diabetes</button>
                <button onClick={() => setSelectedIllness('Hypertension')}>Hypertension</button>
                <button onClick={() => setSelectedIllness('Asthma')}>Asthma</button>
              </div>
            </Modal>
          )}

          {showForm && (
            <form className="add-medication-form" onSubmit={(e) => {
              e.preventDefault();
              addMedication({
                name: e.target.name.value,
                dosage: e.target.dosage.value,
                image: e.target.image.files[0],
                prescribedDate: e.target.prescribedDate.value,
                doctor: e.target.doctor.value,
                status: 'pending',
                frequency: parseInt(e.target.frequency.value),
                disease: e.target.disease.value,
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
                <input type="file" id="image" name="image" accept="image/*" required />
                <label htmlFor="image">Upload Image</label>
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
              <div className="form-group">
                <input type="text" id="disease" name="disease" required />
                <label htmlFor="disease">Disease/Condition</label>
              </div>
              {selectedIllness === 'HIV' && (
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
        </div>
      </div>
    </div>
  );
}