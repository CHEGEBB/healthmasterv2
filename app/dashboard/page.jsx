"use client"
import React, { useState } from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header";
import Cards from '../../components/cards/Cards';
import { Menu } from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidenav ${sidebarOpen ? 'open' : ''}`}>
        <Sidenav />
      </div>
      <div className="content">
        <div className="header">
          <button className="hamburger-menu" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Header />
        </div>
        <div className="container-fluid">
          <Cards />
        </div>
      </div>
    </div>
  );
}