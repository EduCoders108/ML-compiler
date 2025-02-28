"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { User, Code, Palette, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [activeTab]);

  const tabs = [
    { id: "account", label: "Account", icon: <User className="size-5" /> },
    { id: "editor", label: "Editor", icon: <Code className="size-5" /> },
    { id: "theme", label: "Theme", icon: <Palette className="size-5" /> },
    { id: "security", label: "Security", icon: <Shield className="size-5" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="size-5" />,
    },
  ];

  return (
    <div className="min-h-screen p-6 sm:p-12">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="mt-6">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "editor" && <EditorSettings />}
        {activeTab === "theme" && <ThemeSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "notifications" && <NotificationsSettings />}
      </div>
    </div>
  );
}

// Account Settings Component
function AccountSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      <label className="block">
        Name:
        <input
          type="text"
          className="mt-1 w-full rounded border p-2"
          placeholder="Your Name"
        />
      </label>
      <label className="block">
        Email:
        <input
          type="email"
          className="mt-1 w-full rounded border p-2"
          placeholder="Your Email"
        />
      </label>
      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        Save Changes
      </button>
    </div>
  );
}

// Editor Settings Component
function EditorSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Editor Preferences</h2>
      <label className="block">
        Default Language:
        <select className="mt-1 w-full rounded border p-2">
          <option>Python</option>
          <option>JavaScript</option>
          <option>C++</option>
        </select>
      </label>
      <label className="block">
        Code Indentation:
        <select className="mt-1 w-full rounded border p-2">
          <option>Spaces</option>
          <option>Tabs</option>
        </select>
      </label>
    </div>
  );
}

// Theme Settings Component
function ThemeSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Theme Preferences</h2>
      <p>Toggle dark/light mode in the navbar.</p>
      <label className="block">
        Code Theme:
        <select className="mt-1 w-full rounded border p-2">
          <option>Monokai</option>
          <option>Dracula</option>
          <option>Solarized Dark</option>
        </select>
      </label>
    </div>
  );
}

// Security Settings Component
function SecuritySettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Security</h2>
      <label className="block">
        Change Password:
        <input type="password" className="mt-1 w-full rounded border p-2" />
      </label>
      <button className="mt-4 rounded bg-red-600 px-4 py-2 text-white">
        Update Password
      </button>
    </div>
  );
}

// Notifications Settings Component
function NotificationsSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Enable Email Notifications
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Enable Push Notifications
      </label>
    </div>
  );
}
