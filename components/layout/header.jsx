
import React from 'react';
import { Search, Bell, User, Settings, LogOut, MessageSquare, Mic } from 'lucide-react';
import '../../sass/header.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="container-header">
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Overview Conditions</h1>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="voice-search">
            <Mic className='mic-icon'/>
          </div>
          <Search className="search-icon" />
        </div>

        {/* Reminder icon */}
        <button className="icon-btn">
          <Bell />
        </button>

        <button className="icon-btn">
          <MessageSquare />
        </button>
      </div>
      <div className="profile-menu">
            <button className="icon-btn settings-btn">
              <Settings />
            </button>
            <button className="icon-btn logout-btn">
              <LogOut />
            </button>
          </div>
    </header>
    <div className="profile-section">
          <div className="profile-avatar">
          <Image
          src="/assets/images/3.jpg"
          alt="User Avatar"
          width={50}
          height={50}
          />
          </div>
          <div className="profile-details">
            <span className="profile-name">Sarah Ruth</span>
          </div>
        </div>
        </div>
  );
};

export default Header;
