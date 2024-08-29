"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  NotepadText,
  Pill,
  ActivitySquare,
  Bell,
  FileText,
  Ambulance,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../../sass/sidebar.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/appointments", icon: NotepadText, label: "Appointments" },
  { href: "/medication", icon: Pill, label: "Medication" },
  { href: "/health-stats", icon: ActivitySquare, label: "My Health Stats" },
  { href: "/reminders", icon: Bell, label: "Reminders" },
  { href: "/prescriptions", icon: FileText, label: "Prescriptions" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"} bg-gray-900 text-white h-full`}
    >
      <div className="sidebar-header flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <Image
            src="/assets/icons/new.jpg"
            alt="HealthMaster logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          {isExpanded && (
            <h1 className="text-xl font-bold ml-3">Health master</h1>
          )}
        </div>
        <button
          className="toggle-btn text-gray-400"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="sidebar-nav mt-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`nav-item flex items-center p-3 my-2 rounded-lg cursor-pointer transition-all duration-300 ${
                pathname === item.href
                  ? "bg-gray-800 border-l-4 border-blue-500"
                  : "hover:bg-gray-700"
              }`}
            >
              <item.icon size={20} />
              {isExpanded && <span className="ml-3">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer mt-auto p-4">
        <Link href="/emergency">
          <div className="emergency-btn flex items-center p-3 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer transition-all duration-300">
            <Ambulance size={24} />
            {isExpanded && (
              <span className="ml-3 font-semibold text-white">Emergency</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
