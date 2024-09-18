import React, { useState } from 'react';
import Image from 'next/image';
import "../../sass/healthprofile.scss"

const BioModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto transition-opacity duration-300 bg-black bg-opacity-50 outline-none focus:outline-none" onClick={onClose}>
      <div className="relative w-full max-w-md mx-auto my-6 md:max-w-lg lg:max-w-xl" onClick={e => e.stopPropagation()}>
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-blue-200 border-solid rounded-t">
            <h3 className="text-2xl font-semibold text-blue-800">{title}</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-gray-600 transition-colors duration-200 bg-transparent border-0 outline-none focus:outline-none hover:text-red-500"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl bg-transparent outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto overflow-y-auto max-h-[70vh]">
            <div className="text-lg leading-relaxed text-gray-700">
              {children}
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-blue-200 border-solid rounded-b">
            <button
              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none hover:bg-blue-600 hover:shadow-lg focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
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
      <BioModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`${organ} Health Information`}>
        <div className="organ-details">
          <p className="mb-2">Status: <span className={`font-semibold ${status.toLowerCase() === 'good' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</span></p>
          <p className="mb-2">Doctor Visits: <span className="font-semibold">3</span></p>
          <p className="mb-2">Underlying Conditions: <span className="font-semibold">None</span></p>
        </div>
      </BioModal>
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