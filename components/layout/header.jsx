import React from 'react';
import { Search, Mic, ChevronDown, AudioLines } from 'lucide-react';
import Image from 'next/image';
import "../../sass/header.scss";


const Header = () => {
  return (
    <div className="container-header">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">Health master</h1>
        </div>
        
        <div className="header-right">
          <div className="search-bar">
          <Mic className="mic-icon" />
            <input 
              type="text" 
              placeholder="Voice Search" 
              className="search-input"
            />
            <AudioLines className="audio-icon" />
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