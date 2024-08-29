import React from 'react';
import "../../sass/dashboard.scss";
import Sidenav from '../../components/layout/sidebar';
import Header from "../../components/layout/header";
import MedicationCard from '../../components/cards/MedicationSchedule';
import HeartRateCard from '../../components/cards/HeartRateMonitor';
import VisitsCard from '../../components/cards/VisitsSchedule'
export default function DashboardPage() {
  return (
    <div className="container bg-[#083A3C] !important">
      <div className="w-20 sidenav">
        <Sidenav />
      </div>
      <div className="content">
        <div className="header">
          <Header />
        </div>
        <div className="min-h-screen container-fluid">
          <h1 className="text-2xl font-bold mb-4">Health Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
            <HeartRateCard />
            </div>
            <MedicationCard />
            <div className="space-y-4">
              <VisitsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}