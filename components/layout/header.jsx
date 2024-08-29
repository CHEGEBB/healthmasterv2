import React from 'react';
import { Search, Mic, ChevronDown, AudioLines, Calendar, Bell } from 'lucide-react';
import Image from 'next/image';
import "../../sass/header.scss";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const Header = () => {
  return (
    <div className="container-header">
      <header className="header">
        <div className="header-left">
          <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={100} height={100} />
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
          <div className="header-info">
            <div className="reminders">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="text-gray-600 transition-colors duration-300 calendar-icon hover:text-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent 
                    className="p-2 text-white transition-transform duration-300 bg-blue-500 rounded-lg shadow-lg animate-fadeInUp"
                  >
                    <p className="font-semibold">Reminders</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Notifications Tooltip */}
            <div className="ml-4 notifications">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Bell className="text-gray-600 transition-colors duration-300 bell-icon hover:text-blue-500" />
                  </TooltipTrigger>
                  <TooltipContent 
                    className="p-2 text-white transition-transform duration-300 bg-blue-500 rounded-lg shadow-lg animate-fadeInUp"
                  >
                    <p className="font-semibold">Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
          <ChevronDown className="down" size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;
