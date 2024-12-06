import  { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import { FiPhone, FiVideo, FiMic, FiVolume2, FiUser } from "react-icons/fi";

export default function Screenshot() {
  const [title, setTitle] = useState("John Doe");
  const [time, setTime] = useState("9:41 AM");
  const [color,setColor] = useState("#dddddd")
  const mobileRef = useRef(null);
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  console.log(durationInSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setDurationInSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // const formatDuration = (seconds) => {
  //   const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  //   const secs = String(seconds % 60).padStart(2, "0");
  //   return `${mins}:${secs}`;
  // };

  const handleDownload = () => {
    if (mobileRef.current === null) return;
    toPng(mobileRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "mobile-call-screen.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image", err);
      });
  };

  return (
    <div className="h-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side Form */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Customize Call Screen</h1>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Caller Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter caller name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Color Selete</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Download Call Screen
          </button>
        </div>

        {/* Right Side Mobile Screen Preview */}
        <div
          ref={mobileRef}
          className="w-full max-w-xs mx-auto bg-[color] rounded-3xl overflow-hidden shadow-md p-4 relative"
          style={{ aspectRatio: "9 / 16" }}
        >
          {/* Top Status Bar */}
          <div className="flex justify-between items-center text-white text-xs px-4 py-2 bg-gray-800 rounded-t-lg">
            <span>{time}</span>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-2 bg-white rounded-sm"></span> {/* Signal */}
              <span className="w-2 h-2 bg-white rounded-full"></span> {/* Wi-Fi */}
              <span className="w-4 h-2 bg-green-500 rounded-sm"></span> {/* Battery */}
            </div>
          </div>

          {/* Middle Logo and Call Details */}
          <div className="flex flex-col items-center justify-center text-white p-6 space-y-4 mt-8">
            <div className="flex flex-col items-center">
              <FiUser className="text-5xl text-gray-300 mb-2" />
              <h2 className="text-2xl font-bold">{title}</h2>
              <h3 className="text-lg text-gray-400">45.23</h3>
            </div>
          </div>

          {/* Talk With Person */}
          <div className=" flex justify-end  w-full h-full mt-20 ">
             <div className="w-[150px] h-[150px] bg-slate-800 rounded-lg"></div>
          </div>

          {/* Bottom Action Icons */}
          <div className="flex justify-around items-center mt-12 px-4 text-white absolute bottom-4 w-full">
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <FiVideo className="text-2xl" />
            </button>
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <FiMic className="text-2xl" />
            </button>
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <FiVolume2 className="text-2xl" />
            </button>
            <button className="p-3 rounded-full bg-red-500 hover:bg-red-600">
              <FiPhone className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
