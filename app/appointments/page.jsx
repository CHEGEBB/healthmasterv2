'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../sass/Appointments.scss";
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';

function AppointmentsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    doctor: '',
    reason: '',
    notes: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // For now, we'll just navigate to the success page
    router.push({
      pathname: '/appointments/appointment-success',
      query: { appointmentData: JSON.stringify(formData) }
    });
  };

  return (
    <div className="appointments-page">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1>Schedule an Appointment</h1>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="doctor">Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select a doctor</option>
                <option value="Dr. Adam Smith">Dr. Adam Smith</option>
                <option value="Dr. Jane Doe">Dr. Jane Doe</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for appointment</label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="e.g. Annual check-up"
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Additional comments/notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Prefer afternoon appointments, if possible"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="date">Appointment date and time</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Submit and continue</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AppointmentsPage;