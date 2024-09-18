import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faSun, faMoon, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../../sass/Mymedicine.scss";

const medicinesData = [
  { 
    id: 1, 
    name: "Verapamil", 
    dose: "1x1", 
    time: "8:00 AM", 
    image: "/assets/images/med1.png", 
    dayDose: 1, 
    nightDose: 0,
    sideEffects: [
      "Constipation",
      "Dizziness",
      "Headache",
      "Nausea"
    ],
    treats: [
      "High blood pressure",
      "Chest pain (angina)",
      "Irregular heartbeats"
    ]
  },
  { 
    id: 2, 
    name: "Aspirin", 
    dose: "1x2", 
    time: "12:00 PM", 
    image: "/assets/images/med3.png", 
    dayDose: 1, 
    nightDose: 1,
    sideEffects: [
      "Stomach irritation",
      "Nausea",
      "Heartburn",
      "Increased risk of bleeding"
    ],
    treats: [
      "Pain",
      "Fever",
      "Inflammation",
      "Prevention of heart attacks and strokes"
    ]
  },
  { 
    id: 3, 
    name: "Lisinopril", 
    dose: "1x1", 
    time: "9:00 PM", 
    image: "/assets/images/med2.png", 
    dayDose: 0, 
    nightDose: 1,
    sideEffects: [
      "Dizziness",
      "Headache",
      "Dry cough",
      "Fatigue"
    ],
    treats: [
      "High blood pressure",
      "Heart failure",
      "Prevention of kidney problems in diabetics"
    ]
  },
  { 
    id: 4, 
    name: "Metformin", 
    dose: "2x2", 
    time: "8:00 AM, 8:00 PM", 
    image: "/assets/images/med4.png", 
    dayDose: 2, 
    nightDose: 2,
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Stomach upset",
      "Metallic taste in mouth"
    ],
    treats: [
      "Type 2 diabetes",
      "Insulin resistance",
      "Polycystic ovary syndrome (PCOS)"
    ]
  },
  { 
    id: 5, 
    name: "Simvastatin", 
    dose: "1x1", 
    time: "10:00 PM", 
    image: "/assets/images/med5.png", 
    dayDose: 0, 
    nightDose: 1,
    sideEffects: [
      "Muscle pain",
      "Liver problems",
      "Digestive issues",
      "Increased blood sugar"
    ],
    treats: [
      "High cholesterol",
      "Prevention of heart disease",
      "Reduction of heart attack and stroke risk"
    ]
  },
  { 
    id: 6, 
    name: "Levothyroxine", 
    dose: "1x1", 
    time: "7:00 AM", 
    image: "/assets/images/med6.png", 
    dayDose: 1, 
    nightDose: 0,
    sideEffects: [
      "Weight loss",
      "Increased appetite",
      "Tremors",
      "Insomnia"
    ],
    treats: [
      "Hypothyroidism",
      "Enlarged thyroid gland",
      "Thyroid cancer (as part of treatment)"
    ]
  }
];

const doctorsData = [1, 2, 3, 4, 5];

function Mymedicine() {
  const [medicines, setMedicines] = useState(medicinesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dose: '',
    time: '',
    image: '',
    dayDose: 0,
    nightDose: 0,
    sideEffects: '',
    treats: ''
  });

  const MedicineCard = ({ medicine }) => (
    <div className="med-card">
      <div className="med-image">
        <Image
          src={medicine.image}
          width={150}
          height={150}
          alt={medicine.name}
        />
      </div>
      <div className="med-details">
        <div className="med-det1">
          <div className="med-name">
            <h2>{medicine.name}</h2>
          </div>
          <div className="med-dose">
            <h3>{medicine.dose}</h3>
          </div>
        </div>
        <div className="med-det2">
          <div className="med-time">
            <h3>{medicine.time}</h3>
          </div>
          <div className="med-notes" onClick={() => openViewModal(medicine)}>
            <FontAwesomeIcon icon={faEye} />
            <h3>View</h3>
          </div>
        </div>
        <div className="med-icons">
          <div className="day-dose">
            <FontAwesomeIcon icon={faSun} />
            <span>{medicine.dayDose}</span>
          </div>
          <div className="night-dose">
            <FontAwesomeIcon icon={faMoon} />
            <span>{medicine.nightDose}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const openViewModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowViewModal(true);
  };

  const ViewModal = ({ medicine }) => (
    <div className="modal-overlay">
      <div className="modal-content view-modal">
        <button className="close-btn" onClick={() => setShowViewModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>{medicine.name}</h2>
        <div className="modal-image">
          <Image
            src={medicine.image}
            width={200}
            height={200}
            alt={medicine.name}
          />
        </div>
        <div className="modal-info">
          <h3>Side Effects:</h3>
          <ul>
            {medicine.sideEffects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
          <h3>Treats:</h3>
          <ul>
            {medicine.treats.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicineData = {
      ...newMedicine,
      id: medicines.length + 1,
      sideEffects: newMedicine.sideEffects.split(',').map(item => item.trim()),
      treats: newMedicine.treats.split(',').map(item => item.trim()),
      dayDose: parseInt(newMedicine.dayDose),
      nightDose: parseInt(newMedicine.nightDose)
    };
    setMedicines([...medicines, newMedicineData]);
    setShowAddModal(false);
    setNewMedicine({
      name: '',
      dose: '',
      time: '',
      image: '',
      dayDose: 0,
      nightDose: 0,
      sideEffects: '',
      treats: ''
    });
  };

  const AddModal = () => (
    <div className="modal-overlay">
      <div className="modal-content add-modal">
        <button className="close-btn" onClick={() => setShowAddModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Add New Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Medicine Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMedicine.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dose">Dose:</label>
            <input
              type="text"
              id="dose"
              name="dose"
              value={newMedicine.dose}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              name="time"
              value={newMedicine.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={newMedicine.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dayDose">Day Dose:</label>
            <input
              type="number"
              id="dayDose"
              name="dayDose"
              value={newMedicine.dayDose}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nightDose">Night Dose:</label>
            <input
              type="number"
              id="nightDose"
              name="nightDose"
              value={newMedicine.nightDose}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sideEffects">Side Effects (comma-separated):</label>
            <textarea
              id="sideEffects"
              name="sideEffects"
              value={newMedicine.sideEffects}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="treats">Treats (comma-separated):</label>
            <textarea
              id="treats"
              name="treats"
              value={newMedicine.treats}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Add Medicine</button>
        </form>
        <div className="heart-image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 88.9L42.8 82.1C22.4 63.5 9.1 51.3 9.1 36.6C9.1 24.4 18.7 14.8 30.9 14.8C37.9 14.8 44.5 18.2 50 23.4C55.5 18.2 62.1 14.8 69.1 14.8C81.3 14.8 90.9 24.4 90.9 36.6C90.9 51.3 77.6 63.5 57.2 82.1L50 88.9Z" fill="#00ff00" stroke="#00cc00" strokeWidth="3"/>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="medicine-container">
      <h1 className="medicine-title">My Medicine</h1>
      <div className="doctors-row">
        {doctorsData.map((doctor) => (
          <div key={doctor} className="doctor-bubble">
            <Image
              src={`/assets/images/${doctor}.png`}
              width={60}
              height={60}
              alt={`Doctor ${doctor}`}
            />
          </div>
        ))}
      </div>
      <div className="medications-grid">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
        <div className="add-medicine" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {showAddModal && <AddModal />}
      {showViewModal && selectedMedicine && (
        <ViewModal medicine={selectedMedicine} />
      )}
    </div>
  );
}

export default Mymedicine;