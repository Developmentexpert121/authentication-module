import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-gray-200 h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        My Dashboard
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a>
        <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Profile</a>
        <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Settings</a>
        <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Logout</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
