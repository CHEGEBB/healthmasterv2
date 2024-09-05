import React, { useState } from 'react';
import Image from 'next/image';
import "../../sass/healthprofile.scss"

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const OrganCard = ({ organ, status, imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="organ-card">
      <div className="organ-title">
        <h3>{organ}</h3>
        <button onClick={() => setIsOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="organ-content">
        <div className="organ-image">
          <Image src={imageSrc} width={80} height={80} alt={organ} />
        </div>
        <div className="organ-status">
          <p>Status: <span className={`status ${status.toLowerCase()}`}>{status}</span></p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`${organ} Health Information`}>
        <div className="organ-details">
          <p>Status: {status}</p>
          <p>Doctor Visits: 3</p>
          <p>Underlying Conditions: None</p>
        </div>
      </Modal>
    </div>
  );
};

function HealthProfile() {
  const organs = [
    { name: 'Heart', status: 'Good', image: '/assets/images/heart2.png' },
    { name: 'Kidney', status: 'Good', image: '/assets/images/kidney.png' },
    { name: 'Liver', status: 'Good', image: '/assets/images/liver.jpeg' },
    { name: 'Brain', status: 'Good', image: '/assets/images/brain.jpeg' },
  ];

  return (
    <div className="health-container">
      <div className="user">
        <div className="profile-image">
          <Image src="/assets/images/3.jpg" width={100} height={100} alt="User Avatar" className="avatar" />
        </div>
        <div className="personal-details">
          <div className="name">
            <h2>Sarah Ruth</h2>
          </div>
          <div className="dob">
            23 May, 1990
          </div>
          <div className="blood-group">
            <h2>Blood Group</h2>
            <p>O+</p>
          </div>
        </div>
      </div>
      <div className="health-stats">
        {organs.map((organ, index) => (
          <OrganCard key={index} organ={organ.name} status={organ.status} imageSrc={organ.image} />
        ))}
      </div>
    </div>
  );
}

export default HealthProfile;