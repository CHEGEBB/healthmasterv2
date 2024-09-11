import React from 'react';
import { Search, Mic, ChevronDown, Calendar, Bell } from 'lucide-react';
import Image from 'next/image';
import '../../sass/header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__left">
            <div className="header__logo">
              <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={40} height={40} />
            </div>
            <div className="header__icons">
              <button className="header__icon-button">
                <Calendar />
                <span className="header__badge">3</span>
              </button>
              <button className="header__icon-button">
                <Bell />
                <span className="header__badge">5</span>
              </button>
            </div>
          </div>

          <div className="header__right">
            <div className="header__search">
              <input type="text" placeholder="Search" className="header__search-input" />
              <Search className="header__search-icon" />
              <Mic className="header__mic-icon" />
            </div>

            <div className="header__profile">
              <Image src="/assets/images/3.jpg" alt="Sarah Ruth" width={32} height={32} className="header__avatar" />
              <span className="header__name">Sarah Ruth</span>
              <ChevronDown className="header__chevron" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;