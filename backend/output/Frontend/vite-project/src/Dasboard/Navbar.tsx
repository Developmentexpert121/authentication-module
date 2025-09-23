import React from "react";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 h-16">
      <div className="text-xl font-semibold text-gray-800">Dashboard Navbar</div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">Notifications</button>
        <button className="text-gray-600 hover:text-gray-800">Profile</button>
      </div>
    </header>
  );
};

export default Navbar;
