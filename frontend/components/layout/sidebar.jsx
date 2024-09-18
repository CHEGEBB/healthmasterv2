"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, NotepadText, Pill, ActivitySquare,
  Bell, Settings, User, ChevronLeft, ChevronRight,
  HeartPulse, LogOut
} from "lucide-react";
import "../../sass/sidebar.scss";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/appointments", icon: NotepadText, label: "Appointments" },
  { href: "/medication", icon: Pill, label: "My Medication" },
  { href: "/health-stats", icon: ActivitySquare, label: "My Health Stats" },
  { href: "/reminders", icon: Bell, label: "Reminders" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/profile", icon: User, label: "Profile" }
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Simplified logout function
  const handleLogout = () => {
    // Redirect to login page directly
    router.push('/login');
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={50} height={50} />
        <h1 className="header-title">Health master</h1>
        <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
              <item.icon size={35} />
              <span className="nav-text">{item.label}</span>
            </div>
          </Link>
        ))}
        <div className="nav-item" onClick={handleLogout}>
          <LogOut size={35} />
          <span className="nav-text">Logout</span>
        </div>
      </nav>
      <div className="special-link">
        <Link href="/pharmasense">
          <div className="ai-cont">
            <HeartPulse size={25} />
            <span className="ai-text">Pharmasense Ai</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
