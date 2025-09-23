import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* Your main dashboard content */}
          <h1 className="text-3xl font-bold mb-4">Welcome to your dashboard</h1>
          <p>Here’s where your main content will go.</p>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
