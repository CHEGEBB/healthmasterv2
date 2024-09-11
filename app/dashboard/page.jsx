"use client";
import React, { useState, useEffect } from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header";
import Cards from '../../components/cards/Cards';
import { Menu, X } from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
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
    </div>
  );
}