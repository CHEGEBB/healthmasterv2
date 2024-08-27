import { LayoutDashboard, NotepadText, Pill } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function sidebar() {
  return (
    <div className="sidebar-container">
      <div className="side-item">
        <Link href="/dashboard">
          <div className="side-con">
            <LayoutDashboard className="sidebar-icon" size={32} />
          </div>
          <div className="side-info">
            <h1>Dashboard</h1>
          </div>
        </Link>
      </div>
      <div className="side-item">
        {/* appointments */}
        <Link href="/appointments">
            <div className="side-con">
              <NotepadText className="sidebar-icon" size={32} />
            </div>
            <div className="side-info">
              <h1>Appointments</h1>
            </div>
        </Link>
      </div>
      <div className="side-item">
        {/* medication management */}
        <Link href="/medication">
        <div className="side-con">
            <Pill className="sidebar-icon" size={32} />
        </div>
        <div className="side-info">
            <h1>Medication</h1>
        </div>
        </Link>
      </div>
    </div>
  );
}
