'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Watch, Bell, Lock, Globe, Palette, Volume2, Heart, Activity } from 'lucide-react';
import Link from 'next/link';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('medium');
  const [volume, setVolume] = useState(50);
  const [heartRateAlerts, setHeartRateAlerts] = useState(true);
  const [stepGoal, setStepGoal] = useState(10000);

  useEffect(() => {
    // Simulate fetching user settings
    setTimeout(() => {
      setNotifications(JSON.parse(localStorage.getItem('notifications') || 'true'));
      setConnectedDevices(JSON.parse(localStorage.getItem('connectedDevices') || '[]'));
      setLanguage(localStorage.getItem('language') || 'en');
      setFontSize(localStorage.getItem('fontSize') || 'medium');
      setVolume(parseInt(localStorage.getItem('volume') || '50'));
      setHeartRateAlerts(JSON.parse(localStorage.getItem('heartRateAlerts') || 'true'));
      setStepGoal(parseInt(localStorage.getItem('stepGoal') || '10000'));
    }, 1000);
  }, []);

  const toggleNotifications = () => {
    setNotifications(!notifications);
    localStorage.setItem('notifications', JSON.stringify(!notifications));
  };

  const connectDevice = () => {
    const newDevice = { id: Date.now(), name: `Smart Watch ${connectedDevices.length + 1}` };
    setConnectedDevices([...connectedDevices, newDevice]);
    localStorage.setItem('connectedDevices', JSON.stringify([...connectedDevices, newDevice]));
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  const changeFontSize = (e) => {
    setFontSize(e.target.value);
    localStorage.setItem('fontSize', e.target.value);
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
    }[e.target.value];
  };

  const changeVolume = (e) => {
    setVolume(e.target.value);
    localStorage.setItem('volume', e.target.value);
  };

  const toggleHeartRateAlerts = () => {
    setHeartRateAlerts(!heartRateAlerts);
    localStorage.setItem('heartRateAlerts', JSON.stringify(!heartRateAlerts));
  };

  const changeStepGoal = (e) => {
    setStepGoal(e.target.value);
    localStorage.setItem('stepGoal', e.target.value);
  };

  return (
    <div className="min-h-screen p-6 text-gray-200 settings-page bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/dashboard" className="inline-flex items-center mb-6 text-xl font-semibold hover:underline">
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <h1 className="mb-8 text-4xl font-bold">Settings</h1>

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Appearance</h2>
            <div className="mt-4">
              <label htmlFor="fontSize" className="block mb-2">Font Size</label>
              <select
                id="fontSize"
                value={fontSize}
                onChange={changeFontSize}
                className="w-full p-2 text-gray-200 rounded bg-zinc-800"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Notifications</h2>
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={notifications} onChange={toggleNotifications} />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Connected Devices</h2>
            <ul className="mb-4 space-y-2">
              {connectedDevices.map(device => (
                <li key={device.id} className="flex items-center">
                  <Watch className="mr-2" /> {device.name}
                </li>
              ))}
            </ul>
            <button
              onClick={connectDevice}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 connect-device-btn"
            >
              Connect New Device
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Language & Region</h2>
            <div>
              <label htmlFor="language" className="block mb-2">Language</label>
              <select
                id="language"
                value={language}
                onChange={changeLanguage}
                className="w-full p-2 text-gray-200 rounded bg-zinc-800"
              >
                <option value="en">English</option>
                <option value="es">Swahili</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Accessibility</h2>
            <div>
              <label htmlFor="volume" className="block mb-2">Voice Assistant Volume</label>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={volume}
                onChange={changeVolume}
                className="w-full"
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Privacy & Security</h2>
            <button className="flex items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
              <Lock className="mr-2" /> Change Password
            </button>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="p-6 rounded-lg shadow-md bg-zinc-900"
          >
            <h2 className="mb-4 text-2xl font-semibold">Health Settings</h2>
            <div className="flex items-center justify-between mb-4">
              <span>Heart Rate Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={heartRateAlerts} onChange={toggleHeartRateAlerts} />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label htmlFor="stepGoal" className="block mb-2">Daily Step Goal</label>
              <input
                type="number"
                id="stepGoal"
                value={stepGoal}
                onChange={changeStepGoal}
                className="w-full p-2 text-gray-200 rounded bg-zinc-800"
              />
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;