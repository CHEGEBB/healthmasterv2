import React from 'react';
import styles from '../../sass/VisitsSchedule.module.scss';

const visits = [
  { date: '26 April \'23', type: 'Complete Blood Count (CBC)', doctor: 'Dr. Shannon Helmmyr', icon: '🩸' },
  { date: '31 May \'23', type: 'Clinic Visit Appointment', doctor: 'Dr. Shilpa Rao', icon: '📋' },
  { date: '02 June \'23', type: 'Video Consultation Chat', doctor: 'Dr. Kartik Aryan', icon: '💻' },
  { date: '15 June \'23', type: 'Magnetic Resonance', doctor: 'Dr. Emily Watson', icon: '🧲' },
];

const VisitsSchedule = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Visits</h2>
      <div className={styles.visits}>
        {visits.map((visit, index) => (
          <div key={index} className={styles.visit}>
            <div className={styles.icon}>{visit.icon}</div>
            <div className={styles.info}>
              <div className={styles.date}>{visit.date}</div>
              <div className={styles.type}>{visit.type}</div>
              <div className={styles.doctor}>{visit.doctor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitsSchedule;