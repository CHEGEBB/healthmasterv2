import React from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header";
import Cards from '../../components/cards/Cards';
export default function DashboardPage() {
  return (
    <div className="container">
      <div className="w-20 sidenav">
        <Sidenav />
      </div>
      <div className="content">
        <div className="header">
          <Header />
        </div>
        <div className="min-h-screen container-fluid">
          <Cards/>
          </div>
        </div>
      </div>
  );
}