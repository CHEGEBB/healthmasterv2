import React from 'react';
import { Search, Mic, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import "../../sass/header.scss";

const VoiceWaveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Header = () => {
  return (
    <div className="container-header">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">CRM</h1>
        </div>
        
        <div className="header-right">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Voice Search" 
              className="search-input"
            />
            <VoiceWaveIcon />
            <Mic className="mic-icon" />
            <Search className="search-icon" />
          </div>
        </div>
      </header>
      
      <div className="profile-section">
        <div className="profile-avatar">
          <Image 
            src="/assets/images/3.jpg"
            alt="Sarah Ruth"
            width={40}
            height={40}
          />
        </div>
        <div className="profile-details">
          <span className="profile-name">Sarah Ruth</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;