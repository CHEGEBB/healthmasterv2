'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { User, Calendar, Activity, Heart, Pill, CheckCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../../sass/stats.scss"

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
  const [overallHealth, setOverallHealth] = useState(0);

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

    const timer = setTimeout(() => {
      setOverallHealth(80);
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`health-stats-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="fixed z-50 p-2 text-white bg-green-700 rounded-full top-4 left-4 md:hidden" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="header-cont">
        <Header />
      </div>
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-40 w-64 h-full sidenav"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-grow min-h-screen p-6 bg-zinc-950 md:p-10">
          <motion.div 
            className="p-8 mb-10 text-white welcome-stats bg-gradient-to-r from-stone-800 to-stone-950 rounded-3xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between ">
              <div>
                <h1 className="mb-4 text-4xl font-bold">Your Health Dashboard</h1>
                <p className="text-xl">Track your progress and stay healthy!</p>
              </div>
              <Image
                src="/assets/images/health-stats.png"
                alt="Health Stats Illustration"
                width={200}
                height={200}
                className="hidden md:block"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="p-6 shadow-lg bg-gradient-to-r from-zinc-800 to-slate-800 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src="/assets/images/3.jpg"
                  alt="User Avatar"
                  width={80}
                  height={80}
                  className="mr-4 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-white">User</h2>
                  <p className="text-gray-400">Age: 35 | Height: 180cm | Weight: 75kg</p>
                </div>
              </div>
              <div className="w-48 h-48 mx-auto">
                <CircularProgressbar
                  value={overallHealth}
                  text={`${overallHealth}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#4ade80",
                    trailColor: "#374151"
                  })}
                />
              </div>
              <p className="mt-4 text-center text-white">Overall Health</p>
            </motion.div>

            <div className="p-6 bg-gray-800 shadow-lg rounded-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">Health Activities</h2>
              <div className="grid grid-cols-2 gap-4">
                {healthActivities.map((activity, index) => (
                  <motion.div 
                    key={activity.name}
                    className="p-4 bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <activity.icon size={24} className="mb-2 text-green-400" />
                    <h3 className="text-lg font-medium text-white">{activity.name}</h3>
                    <p className="text-2xl font-bold text-white">{activity.value}{activity.unit}</p>
                    {activity.goal && (
                      <p className="text-sm text-gray-400">Goal: {activity.goal}</p>
                    )}
                    {activity.status && (
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        activity.status === 'normal' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-800 shadow-lg rounded-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">Organ Health</h2>
              <div className="grid grid-cols-2 gap-4">
                {organs.map((organ, index) => (
                  <motion.div 
                    key={organ.name}
                    className="flex flex-col items-center p-4 bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image
                      src={organ.image}
                      alt={organ.name}
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <h3 className="text-lg font-medium text-white">{organ.name}</h3>
                    <div className="w-20 h-20">
                      <CircularProgressbar
                        value={organ.health}
                        text={`${organ.health}%`}
                        styles={buildStyles({
                          textColor: "#fff",
                          pathColor: "#4ade80",
                          trailColor: "#374151"
                        })}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="p-6 bg-gray-800 shadow-lg rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Suggested Foods</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {suggestedFoods.map((food, index) => (
                  <div key={food.name} className="flex flex-col items-center">
                    <Image
                      src={food.image}
                      alt={food.name}
                      width={60}
                      height={60}
                      className="mb-2 rounded-full"
                    />
                    <p className="text-center text-white">{food.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="p-6 bg-gray-800 shadow-lg rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">My Doctors</h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={60}
                      height={60}
                      className="mr-4 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white">{doctor.name}</h3>
                      <p className="text-gray-400">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="p-6 bg-gray-800 shadow-lg rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Scheduled Checkups</h2>
              <ul className="space-y-4">
                {scheduledCheckups.map((checkup, index) => (
                  <li key={index} className="flex items-center">
                    <Calendar size={20} className="mr-4 text-green-400" />
                    <div>
                      <p className="font-medium text-white">{checkup.date}</p>
                      <p className="text-gray-400">{checkup.type} with {checkup.doctor}</p>
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