import React from 'react';
import styles from '../../sass/MedicationSchedule.module.scss';

const medications = [
  { name: 'Albufin', dose: '20mg', frequency: 'x 1' },
  { name: 'Vitamin D', dose: '100mg', frequency: 'x 2' },
  { name: 'Omega 3', dose: '500mg', frequency: 'x 2' },
  { name: 'Ibuprofen', dose: '5mg', frequency: 'x 1' },
  { name: 'Aspirin', dose: '100mg', frequency: 'x 2' },
];

const MedicationSchedule = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Medication</h2>
      <div className={styles.schedule}>
        <div className={styles.days}>
          <span>Mon 20</span>
          <span>Tue 21</span>
          <span>Wed 22</span>
          <span>Thu 23</span>
          <span>Fri 24</span>
          <span>Sat 25</span>
        </div>
        {medications.map((med, index) => (
          <div key={index} className={styles.medication}>
            <div className={styles.info}>
              <span className={styles.name}>{med.name}</span>
              <span className={styles.dose}>{med.dose}</span>
            </div>
            <span className={styles.frequency}>{med.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationSchedule;