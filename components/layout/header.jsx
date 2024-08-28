import React from 'react';
import { Search, Bell, User, Calendar, Heart, HelpCircle } from 'lucide-react';
import "../../sass/header.scss";

const HealthMasterHeader = () => {
  return (
    <header className="healthMaster-header">
      <div className="healthMaster-header__left">
        <div className="healthMaster-header__logo">
          <Heart className="healthMaster-header__logo-icon" />
          <h1 className="healthMaster-header__title">HealthMaster</h1>
        </div>
        <div className="healthMaster-header__search">
          <input type="text" placeholder="Search patients, records..." className="healthMaster-header__search-input" />
          <Search className="healthMaster-header__search-icon" />
        </div>
      </div>
      <div className="healthMaster-header__center">
        <button className="healthMaster-header__tab">Dashboard</button>
        <button className="healthMaster-header__tab healthMaster-header__tab--active">Patients</button>
        <button className="healthMaster-header__tab">Appointments</button>
        <button className="healthMaster-header__tab">Reports</button>
      </div>
      <div className="healthMaster-header__right">
        <button className="healthMaster-header__icon-btn">
          <Calendar />
        </button>
        <button className="healthMaster-header__icon-btn">
          <HelpCircle />
        </button>
        <button className="healthMaster-header__icon-btn">
          <Bell />
        </button>
        <div className="healthMaster-header__profile">
          <button className="healthMaster-header__icon-btn healthMaster-header__user-btn">
            <User />
          </button>
          <div className="healthMaster-header__profile-dropdown">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HealthMasterHeader;
