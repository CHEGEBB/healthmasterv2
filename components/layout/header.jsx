import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import "../../sass/header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Overview Conditions</h1>
      </div>
      <div className="header__right">
        <div className="header__search">
          <input type="text" placeholder="Search..." className="header__search-input" />
          <Search className="header__search-icon" />
        </div>
        <button className="header__icon-btn">
          <Bell />
        </button>
        <div className="header__profile">
          <button className="header__icon-btn header__user-btn">
            <User />
          </button>
          <div className="header__profile-dropdown">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
