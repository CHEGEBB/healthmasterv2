"use client";
import React, { useState, useEffect } from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Simulated patient data
const patientsData = [
  { id: 1, name: "John Doe", bp: 140, glucose: 180, alert: false, phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", bp: 120, glucose: 90, alert: true, phone: "123-456-7891" },
  { id: 3, name: "Alice Johnson", bp: 110, glucose: 100, alert: true, phone: "123-456-7892" },
];

const WelcomeModal = dynamic(() => import('../../components/cards/WelcomeModal'), { ssr: false });

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sortedPatients = patients.sort((a, b) => b.alert - a.alert);
  const filteredPatients = sortedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Header with search bar and buttons */}
      <div className="header">
        {/* Search bar on the left */}
        <input
          type="text"
          placeholder="Search for a patient..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Buttons in the center */}
        <div className="header-buttons">
          <button className="appointments-btn" onClick={() => router.push('/doctor/appointments')}>
            View Appointments
          </button>
          <button className="alerts-btn" onClick={() => router.push('/doctor/alerts')}>
            View Alerts
          </button>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Pressure</th>
                <th>Glucose</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className={patient.alert ? 'alert-row' : ''}>
                  <td>{patient.name}</td>
                  <td>{patient.bp} mmHg</td>
                  <td>{patient.glucose} mg/dL</td>
                  <td>
                    <button className="call-btn" onClick={() => alert(`Calling ${patient.phone}`)}>Call</button>
                    <button className="text-btn" onClick={() => alert(`Texting ${patient.phone}`)}>Text</button>
                    <button className="appointment-btn" onClick={() => alert('Set up appointment')}>Appointment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}