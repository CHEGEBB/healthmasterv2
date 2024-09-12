'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { User, Calendar, Activity, Heart, Pill, CheckCircle, ArrowUp, ArrowDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../../sass/stats.scss";

const organs = [
  { name: 'Heart', health: 85, image: '/assets/images/heart.png' },
  { name: 'Lungs', health: 90, image: '/assets/images/lungs.png' },
  { name: 'Liver', health: 75, image: '/assets/images/liver.png' },
  { name: 'Kidneys', health: 80, image: '/assets/images/kidneys.png' },
];

const healthActivities = [
  { name: 'Steps', value: 8500, goal: 10000, icon: Activity },
  { name: 'BP', value: '120/80', status: 'normal', icon: Heart },
  { name: 'Sugar Level', value: 95, unit: 'mg/dL', status: 'normal', icon: Pill },
  { name: 'Medication Adherence', value: 90, unit: '%', icon: CheckCircle },
];

const suggestedFoods = [
  { name: 'Blueberries', image: '/assets/images/blueberries.png' },
  { name: 'Salmon', image: '/assets/images/salmon.png' },
  { name: 'Spinach', image: '/assets/images/spinach.png' },
  { name: 'Almonds', image: '/assets/images/almonds.png' },
];

const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiologist", image: "/assets/images/1.png" },
  { id: 2, name: "Dr. Johnson", specialty: "Pediatrician", image: "/assets/images/2.png" },
  { id: 3, name: "Dr. Williams", specialty: "Dermatologist", image: "/assets/images/3.png" },
];

const scheduledCheckups = [
  { date: '2024-10-15', doctor: 'Dr. Smith', type: 'Annual Physical' },
  { date: '2024-11-02', doctor: 'Dr. Johnson', type: 'Dental Checkup' },
];

function HealthStatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`health-stats-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="header-cont">
        <Header />
      </div>
      <div className="content-wrapper">
        <div className={`sidenav ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>
        <div className="main-content">
          <motion.div 
            className="welcome-stats"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome-svg">
              <Image
                src="/assets/images/health-stats.png"
                alt="Health Stats Illustration"
                width={300}
                height={300}
                quality={100}
              />
            </div>
            <div className="welcome-message-stats">
              <h1>Your Health Dashboard</h1>
              <p>Track your progress and stay healthy!</p>
            </div>
          </motion.div>

          <div className="stats-grid">
            <motion.div 
              className="user-stats-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/assets/images/user-avatar.png"
                alt="User Avatar"
                width={100}
                height={100}
                className="user-avatar"
              />
              <h2>John Doe</h2>
              <p>Age: 35 | Height: 180cm | Weight: 75kg</p>
              <div className="overall-health">
                <CircularProgressbar
                  value={80}
                  text={`${80}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#4ade80",
                    trailColor: "#374151"
                  })}
                />
                <p>Overall Health</p>
              </div>
            </motion.div>

            <div className="health-activities-grid">
              {healthActivities.map((activity, index) => (
                <motion.div 
                  key={activity.name}
                  className="health-activity-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <activity.icon size={24} className="activity-icon" />
                  <h3>{activity.name}</h3>
                  <p className="activity-value">{activity.value}{activity.unit}</p>
                  {activity.goal && (
                    <p className="activity-goal">Goal: {activity.goal}</p>
                  )}
                  {activity.status && (
                    <p className={`activity-status ${activity.status}`}>{activity.status}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="organs-grid">
              {organs.map((organ, index) => (
                <motion.div 
                  key={organ.name}
                  className="organ-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={organ.image}
                    alt={organ.name}
                    width={80}
                    height={80}
                  />
                  <h3>{organ.name}</h3>
                  <CircularProgressbar
                    value={organ.health}
                    text={`${organ.health}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#4ade80",
                      trailColor: "#374151"
                    })}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="suggested-foods-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Suggested Foods</h2>
              <div className="foods-grid">
                {suggestedFoods.map((food, index) => (
                  <div key={food.name} className="food-item">
                    <Image
                      src={food.image}
                      alt={food.name}
                      width={60}
                      height={60}
                    />
                    <p>{food.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="my-doctors-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>My Doctors</h2>
              <div className="doctors-grid">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="doctor-item">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={60}
                      height={60}
                      className="doctor-avatar"
                    />
                    <div>
                      <h3>{doctor.name}</h3>
                      <p>{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="scheduled-checkups-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Scheduled Checkups</h2>
              <ul className="checkups-list">
                {scheduledCheckups.map((checkup, index) => (
                  <li key={index} className="checkup-item">
                    <Calendar size={20} />
                    <div>
                      <p className="checkup-date">{checkup.date}</p>
                      <p className="checkup-details">{checkup.type} with {checkup.doctor}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthStatsPage;