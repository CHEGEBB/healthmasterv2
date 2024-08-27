import { LayoutDashboard } from "lucide-react";
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
    </div>
  );
}
