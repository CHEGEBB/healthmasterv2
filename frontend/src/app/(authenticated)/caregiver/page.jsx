"use client";
import '@/sass/caregivers.scss';
import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaClock, FaHeartbeat, FaSearch, FaSort } from 'react-icons/fa';

// Sample schedule data
const schedules = [
  {
    id: 1,
    date: '2024-10-20',
    time: '10:00 AM',
    patient: 'John Doe',
    location: '123 Main St',
    avatar: './assets/images/3.jpg',
    condition: 'Hypertension',
    area: 'Cardiology',
    status: 'Scheduled',
    contact: '+1 234 567 890',
    duration: '1 hour'
  },
  {
    id: 2,
    date: '2024-10-21',
    time: '2:00 PM',
    patient: 'Jane Smith',
    location: '456 Oak Ave',
    avatar: './assets/images/2.png',
    condition: 'Diabetes',
    area: 'Endocrinology',
    status: 'Confirmed',
    contact: '+1 345 678 901',
    duration: '1.5 hours'
  },
  {
    id: 3,
    date: '2024-10-22',
    time: '11:00 AM',
    patient: 'Mike Johnson',
    location: '789 Pine Rd',
    avatar: './assets/images/1.png',
    condition: 'Heart Disease',
    area: 'Cardiology',
    status: 'Pending Confirmation',
    contact: '+1 456 789 012',
    duration: '2 hours'
  },
  {
    id: 4,
    date: '2024-10-23',
    time: '9:00 AM',
    patient: 'Emily Davis',
    location: '101 Elm St',
    avatar: './assets/images/4.jpg',
    condition: 'Asthma',
    area: 'Pulmonology',
    status: 'Scheduled',
    contact: '+1 567 890 123',
    duration: '1 hour'
  },
  {
    id: 5,
    date: '2024-10-24',
    time: '3:00 PM',
    patient: 'Robert Wilson',
    location: '234 Cedar Ln',
    avatar: './assets/images/5.png',
    condition: 'Arthritis',
    area: 'Rheumatology',
    status: 'Confirmed',
    contact: '+1 678 901 234',
    duration: '1.5 hours'
  },
  {
    id: 6,
    date: '2024-10-25',
    time: '8:00 AM',
    patient: 'Sarah Brown',
    location: '345 Maple St',
    avatar: './assets/images/6.jpg',
    condition: 'Diabetes',
    area: 'Endocrinology',
    status: 'Pending Confirmation',
    contact: '+1 789 012 345',
    duration: '2 hours'
  },
  {
    id: 7,
    date: '2024-10-26',
    time: '1:00 PM',
    patient: 'James Miller',
    location: '456 Spruce Blvd',
    avatar: './assets/images/7.png',
    condition: 'COPD',
    area: 'Pulmonology',
    status: 'Scheduled',
    contact: '+1 890 123 456',
    duration: '1 hour'
  },
  {
    id: 8,
    date: '2024-10-27',
    time: '10:30 AM',
    patient: 'Patricia Taylor',
    location: '567 Birch Rd',
    avatar: './assets/images/8.png',
    condition: 'Hypertension',
    area: 'Cardiology',
    status: 'Confirmed',
    contact: '+1 901 234 567',
    duration: '1.5 hours'
  },
  {
    id: 9,
    date: '2024-10-28',
    time: '4:00 PM',
    patient: 'David Anderson',
    location: '678 Willow Dr',
    avatar: './assets/images/9.png',
    condition: 'Heart Disease',
    area: 'Cardiology',
    status: 'Pending Confirmation',
    contact: '+1 012 345 678',
    duration: '2 hours'
  },
  {
    id: 10,
    date: '2024-10-29',
    time: '12:00 PM',
    patient: 'Lisa Martinez',
    location: '789 Cherry St',
    avatar: './assets/images/11.png',
    condition: 'Kidney Disease',
    area: 'Nephrology',
    status: 'Scheduled',
    contact: '+1 123 456 789',
    duration: '1 hour'
  }
];


const Schedule = () => {
  const [filteredSchedules, setFilteredSchedules] = useState(schedules);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    let updatedSchedules = schedules;

    // Filter by search term
    if (searchTerm) {
      updatedSchedules = updatedSchedules.filter((schedule) =>
        schedule.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort schedules by selected option
    if (sortOption === 'date') {
      updatedSchedules.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'status') {
      updatedSchedules.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredSchedules(updatedSchedules);
  }, [searchTerm, sortOption]);

  return (
    <div className="container">
      {/* Caregiver Profile */}
      <div className="profileSection">
        <img src="./assets/images/7.png" alt="Caregiver Avatar" className="caregiverAvatar" />
        <div className="profileDetails">
          <h2>Caregiver: Mary Johnson</h2>
          <p><FaPhoneAlt /> Contact: +1 123 456 7890</p>
        </div>
      </div>

      {/* Search and Sort Bar */}
      <div className="searchSortSection">
        <div className="searchBar">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search by patient name or condition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sortDropdown">
          <FaSort className="sortIcon" />
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Schedule List */}
      <div className="scheduleList">
        {filteredSchedules.map((schedule) => (
          <div key={schedule.id} className="scheduleItem">
            <div className="patientInfo">
              <img src={schedule.avatar} alt={schedule.patient} className="avatar" />
              <div className="details">
                <p><strong>Name:</strong> {schedule.patient}</p>
                <p><FaHeartbeat className="icon" /> <strong>Condition:</strong> {schedule.condition}</p>
                <p><strong>Area:</strong> {schedule.area}</p>
                <p><strong>Status:</strong> {schedule.status}</p>
              </div>
            </div>
            <div className="appointmentDetails">
              <p><strong>Date:</strong> {schedule.date}</p>
              <p><strong>Time:</strong> {schedule.time}</p>
              <p><strong>Location:</strong> {schedule.location}</p>
              <p><FaPhoneAlt className="icon" /> <strong>Contact:</strong> {schedule.contact}</p>
              <p><FaClock className="icon" /> <strong>Duration:</strong> {schedule.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
