"use client";
import React, { useState, useEffect } from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header";
import Cards from '../../components/cards/Cards';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const WelcomeModal = dynamic(() => import('../../components/cards/WelcomeModal'), { ssr: false });

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Show modal after 2 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {isMobile && (
        <button className="hamburger-menu" onClick={toggleSidebar}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className={`sidenav ${sidebarOpen ? 'open' : ''}`}>
          <Sidenav />
        </div>
        <div className="container-fluid">
          <Cards />
        </div>
      </div>
      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
    </div>
  );
}