import React from "react";
import DarkModeToggle from "../../component/molecule/DarkModeToggle";

const Settings = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

      {/* Profile Settings */}
      <section className="bg-white shadow-md rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-[#206577]">Profile</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-lg px-3 py-2"
          />
          <button className="bg-[#206577] text-white px-4 py-2 rounded-lg hover:bg-[#184f5f]">
            Update Profile
          </button>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white shadow-md rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-[#206577]">Security</h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="password"
            placeholder="New Password"
            className="border rounded-lg px-3 py-2"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Change Password
          </button>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white shadow-md rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-[#206577]">Preferences</h2>
        <div className="flex items-center gap-3">
          <DarkModeToggle/>
        </div>
        <div className="flex items-center gap-3">
          <label className="font-medium">Email Notifications</label>
          <input type="checkbox" className="w-5 h-5" />
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white shadow-md rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
          Logout
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default Settings;
