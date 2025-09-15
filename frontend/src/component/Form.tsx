import React, { useState } from 'react';
function Form() {
  const [dbType, setDbType] = useState('mongodb');
  const [authType, setAuthType] = useState('password');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbType, authType }),
      });

      if (!response.ok) throw new Error('Error generating project');

      const blob = await response.blob();
      console.log("blob",blob);
      const url = window.URL.createObjectURL(blob);
      console.log("url",url);
      const link = document.createElement('a');
      console.log("link",link);
      link.href = url;
      console.log("link.href",link.href);
      link.setAttribute('download', 'generated-project.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert((error as Error).message || 'Error generating project');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl font-sans">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
    🚀 Project Generator
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Database Selection */}
    <div>
      <label
        htmlFor="dbType"
        className="block mb-2 font-semibold text-gray-700"
      >
        Select Backend Database
      </label>
      <select
        id="dbType"
        value={dbType}
        onChange={(e) => setDbType(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      >
        <option value="mongodb">MongoDB</option>
        <option value="sql">SQL</option>
      </select>
    </div>

    {/* Authentication Type */}
    <div>
      <label className="block mb-2 font-semibold text-gray-700">
        Authentication Type
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="authType"
            value="password"
            checked={authType === 'password'}
            onChange={() => setAuthType('password')}
            className="accent-blue-600"
          />
          Password-based Login
        </label>
        <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="authType"
            value="otp"
            checked={authType === 'otp'}
            onChange={() => setAuthType('otp')}
            className="accent-blue-600"
          />
          OTP-based Login
        </label>
      </div>
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
    >
      Generate Project
    </button>
  </form>
</div>

  );
}

export default Form;
