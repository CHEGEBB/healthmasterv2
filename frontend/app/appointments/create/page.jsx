"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../../sass/dashboard-doc.scss";

export default function AppointmentForm() {

    const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Set Up Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Schedule Appointment</button>
          <button type="button" className="respond-btn" onClick={() =>router.push('/doctor/')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
