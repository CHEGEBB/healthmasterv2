'use client'
import "../../sass/Appointments.scss";
import Sidebar from "../../components/layout/sidebar";
import Header from '../../components/layout/header';

function AppointmentsPage() {
  return (
    <div className="appointments-page">
    <div className="header-cont">
    <Header />
    </div>
      <div className="content-wrapper">
      <div className="sidebar-cont">
      <Sidebar />
      </div>
      <div className="main-content">
        <h1>main</h1>
      </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;