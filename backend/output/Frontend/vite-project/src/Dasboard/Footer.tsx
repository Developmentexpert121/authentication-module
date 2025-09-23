import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 text-center py-4 text-sm border-t">
      © {new Date().getFullYear()} Your Company. All rights reserved.
    </footer>
  );
};

export default Footer;
