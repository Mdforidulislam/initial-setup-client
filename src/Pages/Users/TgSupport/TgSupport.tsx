import { useState, useEffect } from 'react';
import { FaFileUpload, FaMoneyBillWave, FaClock } from 'react-icons/fa';

export default function TgSupport() {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [countdown, setCountdown] = useState(60); // Countdown timer starting at 60 seconds

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <div className="h-full bg-gray-100 p-8">
      {/* Top Bar with Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        {['Tab1', 'Tab2', 'Tab3'].map((tab) => (
          <button
            key={tab}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Tab1' && <FaMoneyBillWave className="mr-2" />}
            {tab === 'Tab2' && <FaFileUpload className="mr-2" />}
            {tab === 'Tab3' && <FaClock className="mr-2" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Withdrawal and Balance Display */}
      <div className="flex justify-between mb-4 p-4 bg-white shadow-md rounded-lg">
        <div className="text-lg font-semibold">
          Total Withdrawal Amount: <span className="text-blue-600">$0.00</span>
        </div>
        <div className="text-lg font-semibold">
          Total Balance: <span className="text-blue-600">$0.00</span>
        </div>
      </div>

      {/* Top Up Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          {activeTab} Form
        </h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Name:</label>
            <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Enter your name" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Cash Tag:</label>
            <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Enter your cash tag" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Link:</label>
            <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Enter a link" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Number Rules:</label>
            <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Enter number rules" />
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Countdown Timer */}
        <div className="mt-4 text-lg font-semibold flex items-center">
          <FaClock className="mr-2 text-blue-600" />
          Time Remaining: <span className="text-blue-600">{countdown} seconds</span>
        </div>
      </div>
    </div>
  );
}
