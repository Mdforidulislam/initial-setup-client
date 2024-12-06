import  { useState } from "react";
import { FiRefreshCw, FiTrash, FiCopy } from "react-icons/fi"; // Using icons for a more professional look

export default function TempMail() {
  const [tempEmail, setTempEmail] = useState("temp@example.com");
  const [mailContent, setMailContent] = useState("No mail content yet.");

  // Handlers for the buttons
  const generateMail = () => {
    setTempEmail("new_temp@example.com");
  };

  const refreshMail = () => {
    setMailContent("Updated mail content.");
  };

  const deleteMail = () => {
    setTempEmail("No temp mail available.");
    setMailContent("No mail content available.");
  };

  const copyMail = () => {
    navigator.clipboard.writeText(tempEmail);
    alert("Email copied to clipboard!");
  };

  return (
    <div className="p-10 bg-gray-100 h-full flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Temporary Mail Service</h1>

        {/* Buttons Row */}
        <div className="flex justify-between items-center mb-6 space-x-4">
          <button
            onClick={generateMail}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md text-lg"
          >
            Generate Mail
          </button>
          <button
            onClick={refreshMail}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md text-lg"
          >
            <FiRefreshCw className="mr-2" /> Refresh Mail
          </button>
          <button
            onClick={deleteMail}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-lg shadow-md text-lg"
          >
            <FiTrash className="mr-2" /> Delete Mail
          </button>
        </div>

        {/* Mail Display */}
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg mb-6 shadow-inner">
          <span className="text-gray-900 font-medium text-lg">{tempEmail}</span>
          <button
            onClick={copyMail}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg"
          >
            <FiCopy className="mr-1" /> Copy
          </button>
        </div>

        {/* Mail Content Display */}
        <div className="bg-gray-100 p-5 rounded-lg shadow-inner mb-6 h-64 overflow-y-auto">
          <h2 className="font-semibold text-xl mb-3 text-gray-800">Mail Content</h2>
          <p className="text-gray-700">{mailContent}</p>
        </div>
      </div>
    </div>
  );
}
