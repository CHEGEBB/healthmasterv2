import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Mic, ChevronDown, Calendar, Bell } from 'lucide-react';
import Image from 'next/image';
import '../../sass/header.scss';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [showAppointments, setShowAppointments] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const appointmentsRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('https://healthmasterv2-2.onrender.com/api/personal-info');
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('Guest User');
      }
    };

    fetchUserName();

    const handleClickOutside = (event) => {
      if (appointmentsRef.current && !appointmentsRef.current.contains(event.target)) {
        setShowAppointments(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const appointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2023-06-15', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', date: '2023-06-18', time: '2:30 PM' },
    { id: 3, doctor: 'Dr. Williams', date: '2023-06-20', time: '11:15 AM' },
  ];

  const notifications = [
    { id: 1, message: 'Take Aspirin', time: '8:00 AM' },
    { id: 2, message: 'Blood pressure check', time: '12:00 PM' },
    { id: 3, message: 'Drink water', time: '2:00 PM' },
    { id: 4, message: 'Take Insulin', time: '6:00 PM' },
    { id: 5, message: 'Evening walk', time: '7:00 PM' },
  ];

  const toggleAppointments = (e) => {
    e.stopPropagation();
    setShowAppointments(!showAppointments);
    setShowNotifications(false);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowAppointments(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__left">
            <div className="header__logo">
              <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={40} height={40} />
            </div>
            <div className="header__icons">
              <div ref={appointmentsRef} className="header__icon-wrapper">
                <button className="header__icon-button" onClick={toggleAppointments}>
                  <Calendar />
                  <span className="header__badge">3</span>
                </button>
                {showAppointments && (
                  <div className="header__popup">
                    <h3>Upcoming Appointments</h3>
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="header__popup-item">
                        <p>{appointment.doctor}</p>
                        <p>{appointment.date} at {appointment.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div ref={notificationsRef} className="header__icon-wrapper">
                <button className="header__icon-button" onClick={toggleNotifications}>
                  <Bell />
                  <span className="header__badge">5</span>
                </button>
                {showNotifications && (
                  <div className="header__popup">
                    <h3>Notifications</h3>
                    {notifications.map(notification => (
                      <div key={notification.id} className="header__popup-item">
                        <p>{notification.message}</p>
                        <p>{notification.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="header__right">
            <div className="header__search">
              <input type="text" placeholder="Search" className="header__search-input" />
              <Search className="header__search-icon" />
              <Mic className="header__mic-icon" />
            </div>

            <div className="header__profile">
              <Image src="/assets/images/3.jpg" alt={userName} width={32} height={32} className="header__avatar" />
              <span className="header__name">{userName || 'Loading...'}</span>
              <ChevronDown className="header__chevron" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;