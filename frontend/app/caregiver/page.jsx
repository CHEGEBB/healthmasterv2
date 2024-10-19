"use client";
import '../../sass/caregivers.scss';
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
    avatar: '/avatars/john.png',
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
    avatar: '/avatars/jane.png',
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
    avatar: '/avatars/mike.png',
    condition: 'Heart Disease',
    area: 'Cardiology',
    status: 'Pending Confirmation',
    contact: '+1 456 789 012',
    duration: '2 hours'
  },
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
        <img src="/avatars/caregiver.png" alt="Caregiver Avatar" className="caregiverAvatar" />
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
