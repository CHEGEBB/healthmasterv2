
import React from 'react';
import { Search, Bell, User, Settings, LogOut, MessageSquare } from 'lucide-react';
import '../../sass/header.scss';

const Header = () => {
  return (
    <div className="container">
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Overview Conditions</h1>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <Search className="search-icon" />
        </div>

        <button className="icon-btn">
          <Bell />
        </button>

        {/* Reminder icon */}
        <button className="icon-btn">
          <Bell />
        </button>

        <button className="icon-btn">
          <MessageSquare />
        </button>
    
      </div>
    </header>
    <div className="profile-section">
          <div className="profile-avatar">
            <User />
          </div>
          <div className="profile-details">
            <span className="profile-name">Sarah Ruth</span>
          </div>
          <div className="profile-menu">
            <button className="icon-btn settings-btn">
              <Settings />
            </button>
            <button className="icon-btn logout-btn">
              <LogOut />
            </button>
          </div>
        </div>
        </div>
  );
};

export default Header;
