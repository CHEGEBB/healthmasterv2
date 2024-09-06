'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import "../../../sass/Success.scss"

function AppointmentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appointmentData, setAppointmentData] = useState({});

  useEffect(() => {
    const appointmentDataStr = searchParams.get('appointmentData');
    if (appointmentDataStr) {
      setAppointmentData(JSON.parse(appointmentDataStr));
    }
  }, [searchParams]);

  return (
    <div className="success-page">
      <div className="success-content">
        <div className="logo">Healthmaster</div>
        <Image 
          src="/assets/images/success.svg" 
          alt="Success Illustration" 
          width={200} 
          height={200} 
          className="success-illustration"
        />
        <div className="success-message">
          <div className="checkmark">✓</div>
          <h1>Your appointment request has been successfully submitted!</h1>
          <p>We will be in touch shortly to confirm.</p>
        </div>
        <div className="appointment-details">
          <h2>Requested appointment details:</h2>
          <p>
            <span className="doctor-icon">👨‍⚕️</span> {appointmentData.doctor}
            <span className="date-icon">🗓️</span> {appointmentData.date ? new Date(appointmentData.date).toLocaleString() : ''}
          </p>
        </div>
        <Link href="/appointments" className="back-link">Back to Appointments</Link>
      </div>
    </div>
  );
}

export default AppointmentSuccessPage;